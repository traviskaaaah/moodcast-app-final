import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a2e',
            fontSize: 60,
            fontWeight: 700,
          }}
        >
          <div style={{ color: '#eee', marginBottom: 20 }}>
            😊 MoodCast
          </div>
          <div style={{ color: '#16f2b3', fontSize: 40 }}>
            Track Your Mood on Farcaster
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 1200,
      }
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}