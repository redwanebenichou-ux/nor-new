import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
}

const SEO = ({ title, description, image, url }: SEOProps) => {
  useEffect(() => {
    document.title = `${title} | من نور إلى نور`
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'منصة تعليم القرآن الكريم أونلاين مع أفضل المعلمين')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description || 'منصة تعليم القرآن الكريم أونلاين مع أفضل المعلمين'
      document.head.appendChild(meta)
    }

    // Open Graph tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    setOgTag('og:title', title)
    setOgTag('og:description', description || 'منصة تعليم القرآن الكريم أونلاين مع أفضل المعلمين')
    setOgTag('og:type', 'website')
    if (url) setOgTag('og:url', url)
    if (image) setOgTag('og:image', image)
  }, [title, description, image, url])

  return null
}

export default SEO
