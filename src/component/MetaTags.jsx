import React from 'react';
import { Helmet } from 'react-helmet';

export default function MetaTags() {
  const appUrl = 'https://moodcast-kappa.vercel.app';
  const ogImageUrl = `${appUrl}/og-image.png`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>MoodCast - Express Your Mood on Farcaster</title>
      <meta name="description" content="Express your current mood & share it on Farcaster 🚀" />
      <meta name="theme-color" content="#1e1b4b" />
      
      {/* Farcaster Frame Meta Tags */}
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content={ogImageUrl} />
      <meta property="fc:frame:image:aspect_ratio" content="1:1" />
      <meta property="fc:frame:button:1" content="Open MoodCast 😴" />
      <meta property="fc:frame:button:1:action" content="link" />
      <meta property="fc:frame:button:1:target" content={appUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={appUrl} />
      <meta property="og:title" content="MoodCast - Express Your Mood" />
      <meta property="og:description" content="Express your current mood & share it on Farcaster 🚀" />
      <meta property="og:image" content={ogImageUrl} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="MoodCast - Express Your Mood" />
      <meta name="twitter:description" content="Express your current mood & share it on Farcaster 🚀" />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}