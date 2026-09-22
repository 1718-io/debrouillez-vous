// SEO CENTRALISÉ : modifiez ici le titre, la description et les mots-clés du site.
// Les pages peuvent surcharger ces valeurs via leur frontmatter typé.
export const seoConfig = {
  siteName: 'Gilets Jaunes 2026',
  title: 'Gilets Jaunes 2026 — Le peuple reprend la parole',
  description: 'Rejoignez le mouvement citoyen Gilets Jaunes 2026. Découvrez notre manifeste et soutenez nos revendications.',
  keywords: ['Gilets Jaunes 2026', 'mouvement citoyen', 'manifeste', 'revendications', 'RIC', 'démocratie'],
  locale: 'fr_FR',
  image: '/og-image.svg',
} as const;

export type PageFrontmatter = {
  title: string;
  description: string;
  keywords?: readonly string[];
  section?: string;
};
