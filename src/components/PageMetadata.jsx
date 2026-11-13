import { useEffect } from 'react'

function ensureMetaTag(attributes, selector) {
  const existingTag = document.head.querySelector(selector)

  if (existingTag) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value) {
        existingTag.setAttribute(key, value)
      }
    })

    return existingTag
  }

  const tag = document.createElement('meta')

  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      tag.setAttribute(key, value)
    }
  })

  document.head.append(tag)
  return tag
}

export default function PageMetadata({
  title,
  description,
  image = '/og-default.svg',
  type = 'website',
  canonical = '',
}) {
  useEffect(() => {
    document.title = title

    const safeDescription = description || 'Itunuoluwa Adejimi is a Computer Science student and frontend developer building practical digital products.'
    const safeTitle = title || 'Itunuoluwa Adejimi'

    ensureMetaTag({ name: 'description', content: safeDescription }, 'meta[name="description"]')
    ensureMetaTag({ property: 'og:title', content: safeTitle }, 'meta[property="og:title"]')
    ensureMetaTag({ property: 'og:description', content: safeDescription }, 'meta[property="og:description"]')
    ensureMetaTag({ property: 'og:type', content: type }, 'meta[property="og:type"]')
    ensureMetaTag({ property: 'og:image', content: image }, 'meta[property="og:image"]')
    ensureMetaTag({ name: 'twitter:card', content: 'summary_large_image' }, 'meta[name="twitter:card"]')
    ensureMetaTag({ name: 'twitter:title', content: safeTitle }, 'meta[name="twitter:title"]')
    ensureMetaTag({ name: 'twitter:description', content: safeDescription }, 'meta[name="twitter:description"]')
    ensureMetaTag({ name: 'twitter:image', content: image }, 'meta[name="twitter:image"]')

    let canonicalTag = document.head.querySelector('link[rel="canonical"]')

    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.rel = 'canonical'
      document.head.append(canonicalTag)
    }

    canonicalTag.href = canonical || window.location.href
  }, [title, description, image, type, canonical])

  return null
}