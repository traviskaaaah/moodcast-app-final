# 🎭 Panduan Penggunaan MoodCast

## ✨ Apa itu MoodCast?

MoodCast adalah mini aplikasi untuk Farcaster/Warpcast yang memungkinkan kamu untuk:
- Memilih mood/perasaan kamu saat ini
- Membagikannya langsung ke feed Farcaster kamu
- Berinteraksi dengan frame interaktif

---

## 📱 Cara Menggunakan (di Website)

### Langkah 1: Pilih Mood Kamu
1. Buka website MoodCast
2. Kamu akan melihat 8 pilihan emoji mood:
   - 😂 Happy
   - 😔 Sad
   - 😡 Angry
   - 😌 Calm
   - 🤩 Excited
   - 😴 Sleepy
   - 😎 Chill
   - 🤨 Curious

3. **Klik pada emoji** yang paling menggambarkan perasaan kamu

### Langkah 2: Mood Terpilih
Setelah kamu klik:
- Emoji akan **ter-highlight dengan warna hijau**
- Card mood akan **sedikit membesar**
- Muncul notifikasi: **"✨ Mood terpilih: [Mood] [Emoji]"**

### Langkah 3: Cast ke Farcaster
1. Klik tombol **"Cast 🎭 Mood"**
2. Tab baru akan terbuka ke **Warpcast Compose**
3. Text sudah ter-isi otomatis: **"I'm feeling [Mood] [Emoji] today!"**
4. MoodCast frame sudah ter-embed di cast kamu
5. Tinggal klik **"Cast"** untuk post!

---

## 🎯 Cara Menggunakan (Farcaster Frame)

### Di Feed Farcaster:
1. User melihat MoodCast frame di feed mereka
2. Frame menampilkan 4 button mood utama:
   - Happy 😂
   - Sad 😔
   - Angry 😡
   - Calm 😌

### Setelah Klik Mood:
1. Frame akan update menampilkan mood yang dipilih
2. Muncul 2 button:
   - **"Cast [Mood] Mood 🎭"** → Buka Warpcast compose
   - **"Choose Another Mood"** → Kembali memilih mood

### Post ke Farcaster:
1. Klik **"Cast [Mood] Mood 🎭"**
2. Warpcast compose akan terbuka dengan:
   - Pre-filled text dengan mood kamu
   - MoodCast frame ter-embed
3. Klik **"Cast"** untuk publish!

---

## 🚀 Deploy ke Production

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial MoodCast app"
git remote add origin [YOUR_REPO_URL]
git push -u origin main
```

### 2. Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Klik "Import Project"
3. Pilih repository GitHub kamu
4. Add Environment Variable:
   - Key: `NEXT_PUBLIC_BASE_URL`
   - Value: URL deployment kamu (contoh: `https://moodcast.vercel.app`)
5. Klik "Deploy"

### 3. Test Frame di Farcaster
1. Buka [warpcast.com/~/developers/frames](https://warpcast.com/~/developers/frames)
2. Paste URL deployment kamu
3. Test semua button
4. Share ke Farcaster!

---

## 💡 Tips & Trik

### Untuk Developer:
- Kamu bisa menambah mood baru di array `moods` di `MoodSelector.js`
- Customize warna dan style sesuai brand kamu
- Tambahkan analytics untuk track mood yang paling populer
- Buat variasi frame untuk mood yang berbeda

### Untuk User:
- Pilih mood yang sesuai dengan perasaan kamu saat ini
- Share mood kamu setiap hari untuk tracking mood history
- Interact dengan mood teman-teman kamu di feed
- Gunakan sebagai daily check-in ritual!

---

## 🐛 Troubleshooting

### Frame tidak muncul di Farcaster:
- Pastikan `NEXT_PUBLIC_BASE_URL` sudah di-set dengan benar
- Check metadata frame di `app/page.js`
- Test di Warpcast Frame Validator

### Button "Cast Mood" tidak berfungsi:
- Pastikan kamu sudah pilih mood terlebih dahulu
- Check console browser untuk error
- Pastikan popup tidak di-block oleh browser

### Deploy error di Vercel:
- Pastikan semua dependencies ter-install
- Check build logs di Vercel dashboard
- Pastikan Next.js version compatible

---

## 📞 Support

Jika ada pertanyaan atau menemukan bug:
1. Check README.md untuk dokumentasi lengkap
2. Lihat code di GitHub repository
3. Test di local environment dulu sebelum deploy

---

**Selamat mencoba MoodCast! 🎭✨**

Bagikan mood kamu dan mari berinteraksi di Farcaster! 💜
