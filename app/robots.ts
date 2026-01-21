import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/debug-email'],
    },
    sitemap: 'https://runespoke.ai/sitemap.xml',
  };
}