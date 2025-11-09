import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buttonId = body?.untrustedData?.buttonIndex || 1;

    // Response HTML dengan frame baru
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app/mood-tracked.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1:1" />
          <meta property="fc:frame:button:1" content="Track Again 🔄" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:button:2" content="Open App 🚀" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app" />
          <meta property="fc:frame:post_url" content="https://moodcast-lvj2qwaed-traviskaahs-projects.vercel.app/api/frame" />
        </head>
        <body>
          <h1>Mood Tracked!</h1>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Frame API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle GET requests (untuk testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'MoodCast Frame API',
    status: 'active' 
  });
}