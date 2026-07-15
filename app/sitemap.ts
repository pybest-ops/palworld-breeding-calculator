import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://palworldbreedingcalculator.wiki';
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/combos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];
}
