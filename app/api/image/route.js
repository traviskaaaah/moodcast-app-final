import { ImageResponse } from 'next/og';

export const runtime = 'edge';

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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const moodId = searchParams.get('mood');
  
  const mood = moodId ? moods[moodId] : null;
  
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
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {mood ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 200,
              marginBottom: 40,
            }}>
              {mood.emoji}
            </div>
            <div style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
            }}>
              I'm feeling {mood.label}!
            </div>
            <div style={{
              fontSize: 40,
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              Cast your mood on MoodCast
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 100,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 30,
            }}>
              MoodCast
            </div>
            <div style={{
              fontSize: 50,
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: 60,
              textAlign: 'center',
              maxWidth: '900px',
            }}>
              Express your mood & build your streak 🎭
            </div>
            <div style={{
              display: 'flex',
              gap: 30,
            }}>
              {Object.values(moods).slice(0, 4).map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 20,
                    padding: '30px 40px',
                  }}
                >
                  <div style={{ fontSize: 80, marginBottom: 10 }}>{m.emoji}</div>
                  <div style={{ fontSize: 30, color: 'white' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 30,
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          💜 Built for Farcaster
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}