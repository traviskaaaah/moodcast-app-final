import MoodCastApp from './MoodCastApp';

// Metadata untuk SEO dan Farcaster Frame
export const metadata = {
  title: 'MoodCast - Express Your Mood on Farcaster',
  description: 'Express your current mood & share it on Farcaster 🚀',
  openGraph: {
    title: 'MoodCast - Express Your Mood',
    description: 'Express your current mood & share it on Farcaster 🚀',
    url: 'https://moodcast-kappa.vercel.app',
    siteName: 'MoodCast',
    images: [
      {
        url: 'https://moodcast-kappa.vercel.app/og-image.png',
        width: 1200,
        height: 1200,
        alt: 'MoodCast - Express Your Mood',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoodCast - Express Your Mood',
    description: 'Express your current mood & share it on Farcaster 🚀',
    images: ['https://moodcast-kappa.vercel.app/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://moodcast-kappa.vercel.app/og-image.png',
    'fc:frame:image:aspect_ratio': '1:1',
    'fc:frame:button:1': 'Open MoodCast 😊',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://moodcast-kappa.vercel.app',
  },
};

export default function Page() {
  return <MoodCastApp />;
}