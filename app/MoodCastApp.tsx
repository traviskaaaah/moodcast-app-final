'use client';

import React, { useState } from 'react';

// Mood options
const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-400' },
  { emoji: '😢', label: 'Sad', color: 'bg-blue-400' },
  { emoji: '😡', label: 'Angry', color: 'bg-red-400' },
  { emoji: '😴', label: 'Tired', color: 'bg-purple-400' },
  { emoji: '🤩', label: 'Excited', color: 'bg-pink-400' },
  { emoji: '😰', label: 'Anxious', color: 'bg-gray-400' },
  { emoji: '🥳', label: 'Celebrating', color: 'bg-green-400' },
  { emoji: '😌', label: 'Calm', color: 'bg-teal-400' },
];

export default function MoodCastApp() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    if (selectedMood) {
      setShared(true);
      setTimeout(() => {
        setShared(false);
        setSelectedMood(null);
        setNote('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">MoodCast 🎭</h1>
          <p className="text-white/80 text-lg">Express your mood on Farcaster</p>
        </div>

        {shared && (
          <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
            <p className="text-green-200 font-semibold">✨ Mood shared successfully!</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">How are you feeling?</h2>
          <div className="grid grid-cols-4 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`
                  ${mood.color} 
                  ${selectedMood === mood.label ? 'ring-4 ring-white scale-110' : 'hover:scale-105'}
                  transition-all duration-200 rounded-2xl p-6 
                  flex flex-col items-center justify-center
                  shadow-lg hover:shadow-xl
                `}
              >
                <span className="text-4xl mb-2">{mood.emoji}</span>
                <span className="text-white font-medium text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedMood && (
          <>
            <div className="mb-6">
              <label className="block text-white text-lg font-semibold mb-2">
                Add a note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-white/10 border border-white/30 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                rows={4}
              />
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Share on Farcaster 🚀
            </button>
          </>
        )}

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">Built for Farcaster 💜</p>
        </div>
      </div>
    </div>
  );
}
```

## Struktur File:
```
app/
├── page.tsx          ← Metadata di sini
├── MoodCastApp.tsx   ← UI Component di sini
├── layout.tsx
└── globals.css