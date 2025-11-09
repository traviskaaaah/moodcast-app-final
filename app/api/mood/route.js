import { NextResponse } from 'next/server';

const moods = {
  1: { emoji: '😂', label: 'Happy', color: '#10b981' },
  2: { emoji: '😔', label: 'Sad', color: '#6366f1' },
  3: { emoji: '😡', label: 'Angry', color: '#ef4444' },
  4: { emoji: '😌', label: 'Calm', color: '#8b5cf6' },
  5: { emoji: '🤩', label: 'Excited', color: '#f59e0b' },
  6: { emoji: '😴', label: 'Sleepy', color: '#6b7280' },
  7: { emoji: '😎', label: 'Chill', color: '#06b6d4' },
  8: { emoji: '🤨', label: 'Curious', color: '#ec4899' },
};

export async function POST(request) {
  try {
    const body = await request.json();
    const buttonIndex = body?.untrustedData?.buttonIndex || 1;
    
    // Get the selected mood
    const mood = moods[buttonIndex] || moods[1];
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const castText = `I'm feeling ${mood.label} ${mood.emoji} today!`;
    const embedUrl = encodeURIComponent(baseUrl);
    const text = encodeURIComponent(castText);
    
    // Return frame that redirects to Warpcast compose
    return NextResponse.json({
      version: 'vNext',
      image: `${baseUrl}/api/image?mood=${buttonIndex}`,
      buttons: [
        {
          label: `Cast "${mood.label}" Mood 🎭`,
          action: 'link',
          target: `https://warpcast.com/~/compose?text=${text}&embeds[]=${embedUrl}`,
        },
        {
          label: 'Choose Another Mood',
          action: 'post',
        },
      ],
      postUrl: `${baseUrl}/api/mood`,
    });
  } catch (error) {
    console.error('Error processing mood:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
