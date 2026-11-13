export default function BlogStatus({ message, isError = false }) {
  return (
    <div className={isError ? 'blog-status is-error' : 'blog-status'} role={isError ? 'alert' : 'status'}>
      <span className="empty-writing-mark" aria-hidden="true">{isError ? '!' : '✳'}</span>
      <p>{message}</p>
    </div>
  )
}
