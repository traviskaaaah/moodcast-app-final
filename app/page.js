import MoodCastApp from './MoodCastApp';

// Metadata untuk SEO dan Farcaster Frame
export const metadata = {
  title: 'MoodCast - Express Your Mood on Farcaster',
  description: 'Express your current mood & share it on Farcaster 🚀',
  openGraph: {
    title: 'MoodCast - Express Your Mood',
    description: 'Express your current mood & share it on Farcaster 🚀',
    url: 'https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app',
    siteName: 'MoodCast',
    images: [
      {
        url: 'https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app/og-image.png',
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
    images: ['https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app/og-image.png'],
  },
  other: {
  'fc:frame': 'vNext',
  'fc:frame:image': 'https://moodcast-kappa.vercel.app/api/og',
  'fc:frame:image:aspect_ratio': '1:1',
  'fc:frame:button:1': 'Open MoodCast 😊',
  'fc:frame:button:1:action': 'link',
  'fc:frame:button:1:target': 'https://moodcast-kappa.vercel.app',
},
    'fc:frame:image:aspect_ratio': '1:1',
    'fc:frame:button:1': 'Open MoodCast 😊',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app',
    'fc:frame:button:2': 'Track My Mood 📊',
    'fc:frame:button:2:action': 'post',
    'fc:frame:post_url': 'https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app/api/frame',
  },
};

export default function Page() {
  return <MoodCastApp />;
}