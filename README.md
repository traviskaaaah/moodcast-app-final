# MoodCast - Farcaster Frame

Aplikasi MoodCast untuk Farcaster yang memungkinkan pengguna memilih dan membagikan mood mereka.

## Fitur

- 8 pilihan mood: Happy, Sad, Angry, Calm, Excited, Sleepy, Chill, Curious
- **Interaktive mood selection**: Klik emoji untuk memilih mood (dengan highlight visual)
- **Direct Farcaster integration**: Ketika klik "Cast Mood", langsung dialihkan ke Warpcast untuk post
- **Farcaster Frame support**: Bisa digunakan langsung di feed Farcaster dengan button interaktif
- Gambar dinamis untuk setiap mood
- Pre-filled cast text dengan mood yang dipilih
- Auto-embed MoodCast frame di cast kamu

## Cara Menggunakan

### Di Website Langsung:
1. Buka website MoodCast
2. **Klik emoji mood** yang sesuai dengan perasaan kamu (akan ter-highlight hijau)
3. Klik tombol **"Cast 🎭 Mood"**
4. Otomatis akan membuka **Warpcast compose** dengan:
   - Text pre-filled: "I'm feeling [Mood] [Emoji] today!"
   - MoodCast frame ter-embed di cast kamu
5. Klik **"Cast"** di Warpcast untuk post!

### Di Farcaster Frame:
1. User melihat MoodCast frame di feed mereka
2. Klik salah satu dari 4 mood buttons (Happy, Sad, Angry, atau Calm)
3. Frame akan menampilkan mood yang dipilih dengan tombol:
   - **"Cast [Mood] Mood 🎭"** → Langsung buka Warpcast compose
   - **"Choose Another Mood"** → Pilih mood lain
4. Klik "Cast" untuk langsung post ke Farcaster!

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser di `http://localhost:3000`

## Deployment ke Vercel

1. Push kode ke GitHub repository
2. Import project di Vercel
3. Set environment variable:
   - `NEXT_PUBLIC_BASE_URL` = URL deployment kamu (contoh: https://moodcast.vercel.app)
4. Deploy!

## Testing Frame

Untuk testing Farcaster Frame, kamu bisa menggunakan:
- https://warpcast.com/~/developers/frames
- Paste URL deployment kamu

## Struktur Project

```
moodcast-app/
├── app/
│   ├── api/
│   │   ├── mood/
│   │   │   └── route.js      # Handle mood selection
│   │   └── image/
│   │       └── route.js      # Generate mood images
│   ├── layout.js             # Root layout
│   ├── page.js               # Main page with frame metadata
│   └── globals.css           # Global styles
├── .env.local                # Environment variables
└── package.json
```

## Teknologi

- Next.js 15 (App Router)
- Farcaster Frames vNext
- React
- Dynamic OG Images

## Catatan

- Aplikasi ini menggunakan Farcaster Frames vNext specification
- Gambar di-generate secara dinamis menggunakan `next/og`
- Support untuk 8 mood berbeda dengan emoji dan warna unik

Dibuat dengan 💜 untuk Farcaster
