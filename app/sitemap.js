import { UI_URL } from "@/utils/constants";

export default function sitemap() {
    // generate dyanmic url
  return [
    {
      url: `${UI_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${UI_URL}/contactus`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
       url: `${UI_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}