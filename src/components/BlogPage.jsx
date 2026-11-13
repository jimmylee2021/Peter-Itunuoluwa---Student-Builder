import { useMemo, useState } from 'react'
import PageMetadata from './PageMetadata.jsx'
import BlogStatus from './BlogStatus.jsx'
import PostCard from './PostCard.jsx'
import usePublishedPosts from '../hooks/usePublishedPosts.js'
import { isSupabaseConfigured } from '../lib/supabaseClient.js'

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const { posts, loading, error } = usePublishedPosts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category).filter(Boolean))].sort(),
    [posts],
  )
  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()

    return posts.filter((post) => {
      const matchesCategory = category === 'all' || post.category === category
      const searchText = `${post.title} ${post.excerpt ?? ''} ${post.content ?? ''}`.toLocaleLowerCase()
      return matchesCategory && (!normalizedSearch || searchText.includes(normalizedSearch))
    })
  }, [posts, search, category])

  function updateSearch(value) {
    setSearch(value)
    setVisibleCount(POSTS_PER_PAGE)
  }

  function updateCategory(value) {
    setCategory(value)
    setVisibleCount(POSTS_PER_PAGE)
  }

  return (
    <>
      <PageMetadata
        title="Blog | Itunuoluwa Adejimi"
        description="Published notes on building, learning, technology, and practical problem-solving."
      />
      <section className="route-page section-wrap blog-page" aria-labelledby="blog-page-title">
        <div className="route-heading">
          <p className="eyebrow">FIELD NOTES / WRITING</p>
          <h1 id="blog-page-title">Learning in public.</h1>
          <p className="route-lede">Notes on projects, technology, and things I'm learning along the way.</p>
        </div>
        {!isSupabaseConfigured ? (
          <BlogStatus message="The blog database isn't configured yet. Add the Supabase project URL and anon key to load published writing." />
        ) : loading ? (
          <BlogStatus message="Loading published writing…" />
        ) : error ? (
          <BlogStatus message="Published writing couldn't be loaded. Check the database connection and try again." isError />
        ) : posts.length === 0 ? (
          <BlogStatus message="No articles published yet. Check back when the first note is ready." />
        ) : (
          <>
            <div className="blog-filters">
              <label className="blog-search">
                <span>Search writing</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder="Search titles and articles"
                />
              </label>
              <label className="blog-category">
                <span>Category</span>
                <select value={category} onChange={(event) => updateCategory(event.target.value)}>
                  <option value="all">All categories</option>
                  {categories.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
              </label>
            </div>
            {filteredPosts.length === 0 ? (
              <BlogStatus message="No published articles match those filters." />
            ) : (
              <>
                <p className="blog-result-count" aria-live="polite">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                </p>
                <div className="blog-grid">
                  {filteredPosts.slice(0, visibleCount).map((post) => <PostCard key={post.id} post={post} />)}
                </div>
                {visibleCount < filteredPosts.length && (
                  <button className="button button-primary load-more" type="button" onClick={() => setVisibleCount((count) => count + POSTS_PER_PAGE)}>
                    Load more articles
                  </button>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  )
}
