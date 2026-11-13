import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageMetadata from './PageMetadata.jsx'
import BlogStatus from './BlogStatus.jsx'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

const initialForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '',
  cover_image_url: '',
  status: 'draft',
  seo_title: '',
  seo_description: '',
  author_name: 'Itunuoluwa Adejimi',
}

const coverBucket = 'blog-covers'
const maxCoverImageSize = 5 * 1024 * 1024
const coverImageExtensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function AdminPostFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editing = Boolean(id)
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured) && editing)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [coverSource, setCoverSource] = useState('url')
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState('')

  useEffect(() => {
    if (!editing || !isSupabaseConfigured) {
      return
    }

    let cancelled = false

    async function loadPost() {
      setLoading(true)
      const supabase = await getSupabaseClient()

      if (!supabase || cancelled) {
        setLoading(false)
        return
      }

      const { data, error: queryError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (cancelled) return

      if (queryError) {
        setError(queryError.message)
        setLoading(false)
        return
      }

      if (data) {
        setForm({
          title: data.title ?? '',
          slug: data.slug ?? '',
          excerpt: data.excerpt ?? '',
          content: data.content ?? '',
          category: data.category ?? '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
          cover_image_url: data.cover_image_url ?? '',
          status: data.status ?? 'draft',
          seo_title: data.seo_title ?? '',
          seo_description: data.seo_description ?? '',
          author_name: data.author_name ?? 'Itunuoluwa Adejimi',
        })
      }

      setLoading(false)
    }

    loadPost()

    return () => {
      cancelled = true
    }
  }, [editing, id])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (dirty) {
        event.preventDefault()
        event.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [dirty])

  const wordCount = useMemo(() => {
    const text = form.content ?? ''
    return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0
  }, [form.content])

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setDirty(true)
    setSuccess('')
    setError('')
  }

  function handleCoverSourceChange(source) {
    setCoverSource(source)
    setError('')
    setDirty(true)

    if (source === 'url') {
      setCoverFile(null)
      setCoverPreview('')
    }
  }

  function handleCoverFileChange(event) {
    const file = event.currentTarget.files?.[0]
    if (!file) return

    if (!coverImageExtensions[file.type]) {
      setCoverFile(null)
      setCoverPreview('')
      setError('Choose a JPEG, PNG, WebP, or GIF image.')
      event.currentTarget.value = ''
      return
    }

    if (file.size > maxCoverImageSize) {
      setCoverFile(null)
      setCoverPreview('')
      setError('The featured image must be 5 MB or smaller.')
      event.currentTarget.value = ''
      return
    }

    setCoverFile(file)
    setCoverPreview('')
    setDirty(true)
    setError('')

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCoverPreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!isSupabaseConfigured) {
      setError('Add the Supabase project URL and anon key before creating or editing blog posts.')
      return
    }

    const title = form.title.trim()
    const slug = (form.slug || slugify(title || form.title)).trim()
    const content = form.content.trim()

    if (!title || !slug || !content) {
      setError('Title, slug, and content are required before saving.')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    const supabase = await getSupabaseClient()
    if (!supabase) {
      setError('The blog database is currently unavailable.')
      setSaving(false)
      return
    }

    const duplicateCheck = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()

    if (duplicateCheck.error) {
      setError(duplicateCheck.error.message)
      setSaving(false)
      return
    }

    if (duplicateCheck.data && duplicateCheck.data.id !== id) {
      setError('That slug is already in use. Choose a unique URL for this post.')
      setSaving(false)
      return
    }

    let coverImageUrl = form.cover_image_url.trim()

    if (coverSource === 'upload' && coverFile) {
      const imagePath = `${crypto.randomUUID()}.${coverImageExtensions[coverFile.type]}`
      const storage = supabase.storage.from(coverBucket)

      try {
        const { error: uploadError } = await storage.upload(imagePath, coverFile, {
          cacheControl: '3600',
          contentType: coverFile.type,
          upsert: false,
        })

        if (uploadError) {
          throw uploadError
        }

        coverImageUrl = storage.getPublicUrl(imagePath).data.publicUrl
      } catch (uploadError) {
        setError(`Image upload failed: ${uploadError.message}`)
        setSaving(false)
        return
      }
    }

    const tags = form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    const payload = {
      title,
      slug,
      excerpt: form.excerpt.trim(),
      content,
      category: form.category.trim(),
      tags,
      cover_image_url: coverImageUrl,
      status: form.status,
      seo_title: form.seo_title.trim(),
      seo_description: form.seo_description.trim(),
      author_name: form.author_name.trim() || 'Itunuoluwa Adejimi',
      updated_at: new Date().toISOString(),
      published_at: form.status === 'published' && !form.published_at ? new Date().toISOString() : form.published_at,
    }

    let result

    if (editing) {
      result = await supabase.from('posts').update(payload).eq('id', id)
    } else {
      result = await supabase.from('posts').insert([{ ...payload, created_at: new Date().toISOString() }])
    }

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    setDirty(false)
    setSuccess(editing ? 'The post was updated successfully.' : 'The post was created successfully.')
    navigate('/admin/posts', { replace: true })
    setSaving(false)
  }

  if (!isSupabaseConfigured) {
    return (
      <>
        <PageMetadata title="Create post | Itunuoluwa Adejimi" description="Create a draft or published blog post when Supabase is configured." />
        <section className="route-page section-wrap admin-page" aria-labelledby="admin-post-form-config-title">
          <div className="route-heading admin-intro">
            <p className="eyebrow">ADMIN / POST</p>
            <h1 id="admin-post-form-config-title">Supabase is required for post management.</h1>
            <p className="route-lede">Add the project URL and anon key to create, edit, and publish blog posts from the dashboard.</p>
          </div>
          <div className="admin-panel">
            <BlogStatus message="The content editor is disabled until the blog database is configured." />
            <Link className="button button-primary" to="/admin">Return to dashboard</Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageMetadata title={editing ? 'Edit post | Itunuoluwa Adejimi' : 'New post | Itunuoluwa Adejimi'} description="Write and publish an article for the portfolio blog." />
      <section className="route-page section-wrap admin-page" aria-labelledby="admin-post-form-title">
        <div className="admin-shell">
          <header className="admin-header admin-header-compact">
            <div>
              <p className="eyebrow">ADMIN / POST</p>
              <h1 id="admin-post-form-title">{editing ? 'Edit post' : 'New post'}</h1>
            </div>
            <div className="admin-actions">
              <Link className="button admin-button-secondary" to="/admin/posts">Back to posts</Link>
            </div>
          </header>

          {editing && loading ? (
            <BlogStatus message="Loading post details…" />
          ) : (
            <form className="admin-panel admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <label className="form-field form-field-wide">
                  <span>Title</span>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) => handleChange('title', event.target.value)}
                    placeholder="Article title"
                    required
                  />
                </label>

                <label className="form-field">
                  <span>Slug</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(event) => handleChange('slug', event.target.value)}
                    placeholder="my-article-slug"
                  />
                </label>

                <label className="form-field">
                  <span>Status</span>
                  <select value={form.status} onChange={(event) => handleChange('status', event.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>

                <label className="form-field form-field-wide">
                  <span>Excerpt</span>
                  <textarea value={form.excerpt} onChange={(event) => handleChange('excerpt', event.target.value)} rows="3" placeholder="A short summary for the blog page and previews." />
                </label>

                <label className="form-field form-field-wide">
                  <span>Content</span>
                  <textarea value={form.content} onChange={(event) => handleChange('content', event.target.value)} rows="16" placeholder="Write your article here. Use blank lines between paragraphs for readable formatting." required />
                </label>

                <label className="form-field">
                  <span>Category</span>
                  <input type="text" value={form.category} onChange={(event) => handleChange('category', event.target.value)} placeholder="Learning" />
                </label>

                <label className="form-field">
                  <span>Tags</span>
                  <input type="text" value={form.tags} onChange={(event) => handleChange('tags', event.target.value)} placeholder="frontend, react, learning" />
                </label>

                <fieldset className="form-field form-field-wide cover-image-field">
                  <legend>Featured image</legend>
                  <div className="cover-source-toggle">
                    <label>
                      <input
                        type="radio"
                        name="cover-source"
                        value="url"
                        checked={coverSource === 'url'}
                        onChange={() => handleCoverSourceChange('url')}
                      />
                      <span>Image URL</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="cover-source"
                        value="upload"
                        checked={coverSource === 'upload'}
                        onChange={() => handleCoverSourceChange('upload')}
                      />
                      <span>Upload file</span>
                    </label>
                  </div>
                  {coverSource === 'url' ? (
                    <label className="form-field">
                      <span>Image URL</span>
                      <input type="url" value={form.cover_image_url} onChange={(event) => handleChange('cover_image_url', event.target.value)} placeholder="https://example.com/image.jpg" />
                    </label>
                  ) : (
                    <label className="form-field">
                      <span>Choose an image</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleCoverFileChange} />
                      <small className="cover-image-help">JPEG, PNG, WebP, or GIF. Maximum size: 5 MB.</small>
                    </label>
                  )}
                  {(coverPreview || form.cover_image_url) && (
                    <img className="cover-image-preview" src={coverPreview || form.cover_image_url} alt="Featured image preview" />
                  )}
                </fieldset>

                <label className="form-field">
                  <span>SEO title</span>
                  <input type="text" value={form.seo_title} onChange={(event) => handleChange('seo_title', event.target.value)} placeholder="Optional custom title" />
                </label>

                <label className="form-field">
                  <span>SEO description</span>
                  <input type="text" value={form.seo_description} onChange={(event) => handleChange('seo_description', event.target.value)} placeholder="Optional page summary" />
                </label>

                <label className="form-field form-field-wide">
                  <span>Author name</span>
                  <input type="text" value={form.author_name} onChange={(event) => handleChange('author_name', event.target.value)} placeholder="Itunuoluwa Adejimi" />
                </label>
              </div>

              <div className="admin-form-footer">
                <div className="admin-word-count">
                  <span>Word count</span>
                  <strong>{wordCount}</strong>
                </div>
                <div className="form-submit-row admin-submit-row">
                  <button className="button button-primary" type="submit" disabled={saving}>
                    {saving ? 'Saving…' : (editing ? 'Update post' : 'Create post')}
                  </button>
                  <button className="button admin-button-secondary" type="button" onClick={() => navigate('/admin/posts')}>
                    Cancel
                  </button>
                </div>
              </div>

              {error && <p className="form-feedback is-error">{error}</p>}
              {success && <p className="form-feedback">{success}</p>}

              <div className="admin-panel preview-panel">
                <p className="eyebrow">PREVIEW</p>
                <h2>{form.title || 'Untitled post'}</h2>
                {form.excerpt && <p className="route-lede">{form.excerpt}</p>}
                <div className="admin-preview-body">
                  {(form.content || 'Start writing an article to preview it here.').split(/\n\s*\n/).filter(Boolean).slice(0, 3).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
