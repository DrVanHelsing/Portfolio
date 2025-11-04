import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Tredir Sewpaul - Full-Stack Developer', 
  description = 'Full-stack developer specializing in modern web applications. View my projects, skills, and experience.',
  keywords = 'web developer, full-stack developer, react, javascript, portfolio',
  ogImage = '/og-image.jpg',
  path = ''
}) => {
  const siteUrl = 'https://tredirs.com'; // Update with your actual domain
  const currentUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;
