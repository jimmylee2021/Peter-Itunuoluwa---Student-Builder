import { useEffect, useState } from 'react'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function usePublishedPost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return
    }

    let cancelled = false

    async function loadPost() {
      setLoading(true)
      setError('')

      const supabase = await getSupabaseClient()

      if (!supabase || cancelled) {
        setLoading(false)
        return
      }

      const { data, error: queryError } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, content, cover_image_url, category, tags, author_name, published_at, updated_at, status')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

      if (cancelled) return

      if (queryError) {
        setError(queryError.message)
        setPost(null)
      } else {
        setPost(data)
      }

      setLoading(false)
    }

    loadPost()

    return () => {
      cancelled = true
    }
  }, [slug])

  return { post, loading, error }
}
