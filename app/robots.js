import { UI_URL } from '@/utils/constants'
 
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${UI_URL}/sitemap.xml`,
  }
}