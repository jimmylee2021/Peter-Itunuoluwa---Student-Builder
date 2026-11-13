import { Link } from 'react-router-dom'
import BlogStatus from './BlogStatus.jsx'
import PostCard from './PostCard.jsx'
import usePublishedPosts from '../hooks/usePublishedPosts.js'
import { isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function WritingSection() {
  const { posts, loading, error } = usePublishedPosts()

  return (
    <section className="writing-section section-wrap" id="writing" aria-labelledby="writing-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow section-index">04 / NOTES FROM THE JOURNEY</p>
          <h2 id="writing-title">Writing, eventually.</h2>
        </div>
        <p className="section-aside">
          Ideas are being gathered. When there's something useful to share, it will find a home here.
        </p>
      </div>
      {!isSupabaseConfigured ? (
        <BlogStatus message="Writing will appear here once the blog database is connected." />
      ) : loading ? (
        <BlogStatus message="Loading published writing…" />
      ) : error ? (
        <BlogStatus message="Published writing couldn't be loaded right now." isError />
      ) : posts.length === 0 ? (
        <BlogStatus message="No articles published yet. The first note is taking shape." />
      ) : (
        <div className="latest-posts">
          {posts.slice(0, 3).map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
      {isSupabaseConfigured && posts.length > 0 && (
        <Link className="text-link latest-posts-link" to="/blog">All writing <span aria-hidden="true">↗</span></Link>
      )}
    </section>
  )
}
