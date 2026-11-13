import { useEffect, useState } from 'react'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function usePublishedPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return
    }

    let cancelled = false

    async function loadPosts() {
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
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(500)

      if (cancelled) return

      if (queryError) {
        setError(queryError.message)
        setPosts([])
      } else {
        setPosts(data ?? [])
      }

      setLoading(false)
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  return { posts, loading, error }
}
