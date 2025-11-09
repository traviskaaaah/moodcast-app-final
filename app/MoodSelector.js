'use client';

import { useState, useEffect, useRef } from 'react';

const moods = [
  { id: 1, emoji: '😂', label: 'Happy', color: '#10b981' },
  { id: 2, emoji: '😔', label: 'Sad', color: '#6366f1' },
  { id: 3, emoji: '😡', label: 'Angry', color: '#ef4444' },
  { id: 4, emoji: '😌', label: 'Calm', color: '#8b5cf6' },
  { id: 5, emoji: '🤩', label: 'Excited', color: '#f59e0b' },
  { id: 6, emoji: '😴', label: 'Sleepy', color: '#6b7280' },
  { id: 7, emoji: '😎', label: 'Chill', color: '#06b6d4' },
  { id: 8, emoji: '🤨', label: 'Curious', color: '#ec4899' },
];

const themes = {
  purple: {
    name: 'Purple Night',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    accent: '#10b981',
  },
  blue: {
    name: 'Ocean Blue',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    accent: '#06b6d4',
  },
  pink: {
    name: 'Sunset Pink',
    gradient: 'linear-gradient(135deg, #4c0519 0%, #831843 100%)',
    accent: '#ec4899',
  },
  dark: {
    name: 'Midnight Dark',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    accent: '#8b5cf6',
  },
  emerald: {
    name: 'Forest Emerald',
    gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
    accent: '#10b981',
  },
};

const badges = [
  { id: 'starter', name: 'Starter', emoji: '🌱', requirement: 1, description: 'First cast!' },
  { id: 'bronze', name: 'Bronze Viber', emoji: '🥉', requirement: 7, description: '7 day streak!' },
  { id: 'silver', name: 'Silver Viber', emoji: '🥈', requirement: 30, description: '30 day streak!' },
  { id: 'gold', name: 'Gold Viber', emoji: '🥇', requirement: 100, description: '100 day streak!' },
  { id: 'diamond', name: 'Diamond Legend', emoji: '💎', requirement: 365, description: '365 day streak!' },
];

const castTexts = {
  'Happy': [
    "Today's vibe is pure happiness! 😂✨ Feeling blessed and grateful for this moment. Life is good!",
    "I'm radiating positive energy today! 😂💫 So many reasons to smile. Let's spread the joy!",
    "Happiness level: MAXIMUM! 😂🌟 Today is going to be an amazing day, I can feel it!",
  ],
  'Sad': [
    "Feeling a bit down today 😔💙 Taking time to process my emotions and that's okay. Tomorrow will be better.",
    "Today's mood: reflective and melancholic 😔🌧️ Sometimes we need these moments to grow stronger.",
    "Not my best day 😔💭 But I'm being gentle with myself. It's okay to not be okay sometimes.",
  ],
  'Angry': [
    "Feeling fired up today! 😡🔥 Channeling this energy into something productive. Watch out world!",
    "Not in the mood for nonsense today 😡💢 Sometimes anger is just passion with nowhere to go.",
    "Raw emotions today 😡⚡ Using this intensity to fuel positive change. Let's go!",
  ],
  'Calm': [
    "Inner peace activated 😌🧘 Taking it slow and savoring every peaceful moment today.",
    "Zen mode: ON 😌☮️ Finding tranquility in the chaos. Breathing in calm, breathing out stress.",
    "Serenity is my superpower today 😌✨ Centered, grounded, and at peace with everything.",
  ],
  'Excited': [
    "Can't contain this energy! 🤩⚡ Something amazing is happening and I'm HERE for it!",
    "PUMPED UP and ready to conquer the world! 🤩🚀 Today is going to be absolutely EPIC!",
    "Excitement level: OFF THE CHARTS! 🤩💥 Great things are coming, I can feel it in my bones!",
  ],
  'Sleepy': [
    "Running on vibes and caffeine today 😴☕ Need a nap but life keeps happening. Send energy!",
    "Dreamy and drowsy 😴💤 The bed is calling my name but responsibilities say no. Struggle is real!",
    "Energy levels: critically low 😴🔋 Operating on 2% battery but still pushing through!",
  ],
  'Chill': [
    "Just vibing and flowing today 😎🌊 No stress, no rush, just pure chill energy.",
    "Cool, calm, and collected 😎✌️ Taking life one relaxed moment at a time. Stay chill, friends!",
    "Living my best laid-back life 😎🎵 Sometimes you just gotta go with the flow and enjoy the ride.",
  ],
  'Curious': [
    "Mind full of questions today 🤨💭 Exploring, learning, and discovering new things. What's your take?",
    "Curiosity mode: ACTIVATED 🤨🔍 So many interesting things to explore. Let's dive deep!",
    "Something's got me thinking... 🤨💡 Always questioning, always learning. That's the way to grow!",
  ],
};

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [streak, setStreak] = useState(0);
  const [lastCastDate, setLastCastDate] = useState(null);
  const [hoveredMood, setHoveredMood] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [moodHistory, setMoodHistory] = useState({});
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [particles, setParticles] = useState([]);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(null);
  const [username, setUsername] = useState('');
  const audioContextRef = useRef(null);
  const backgroundMusicRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    
    const savedStreak = localStorage.getItem('moodcast_streak');
    const savedLastDate = localStorage.getItem('moodcast_last_date');
    const savedTheme = localStorage.getItem('moodcast_theme');
    const savedHistory = localStorage.getItem('moodcast_history');
    const savedBadges = localStorage.getItem('moodcast_badges');
    const savedUsername = localStorage.getItem('moodcast_username');
    
    if (savedTheme) setCurrentTheme(savedTheme);
    if (savedHistory) setMoodHistory(JSON.parse(savedHistory));
    if (savedBadges) setEarnedBadges(JSON.parse(savedBadges));
    if (savedUsername) setUsername(savedUsername);
    
    if (savedStreak && savedLastDate) {
      const streak = parseInt(savedStreak);
      const lastDate = new Date(savedLastDate);
      const today = new Date();
      
      const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        setStreak(streak);
        setLastCastDate(lastDate);
      } else if (diffDays === 1) {
        setStreak(streak);
        setLastCastDate(lastDate);
      } else {
        setStreak(0);
        setLastCastDate(null);
      }
    }

    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      startBackgroundMusic();
    }, 1500);

    const emojiTimer = setTimeout(() => {
      const emojis = [];
      const farcasterEmojis = ['📡', '💜', '🎭', '✨', '🟣', '💬', '🎙️', '⭐', '💫'];
      
      for (let i = 0; i < 12; i++) {
        emojis.push({
          id: i,
          emoji: farcasterEmojis[Math.floor(Math.random() * farcasterEmojis.length)],
          left: Math.random() * 100,
          animationDuration: 18 + Math.random() * 25,
          animationDelay: Math.random() * 8,
          size: 35 + Math.random() * 45,
        });
      }
      setFloatingEmojis(emojis);
      setStartAnimation(true);
    }, 100);

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(emojiTimer);
      stopBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    if (backgroundMusicRef.current && backgroundMusicRef.current.masterGain) {
      const baseVolume = 0.015;
      backgroundMusicRef.current.masterGain.gain.value = baseVolume * musicVolume;
    }
  }, [musicVolume]);

  const createConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 2,
        animationDelay: Math.random() * 0.5,
        color: ['#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360,
      });
    }
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4000);
  };

  const createParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      newParticles.push({
        id: Math.random(),
        x: x,
        y: y,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3),
        color: themes[currentTheme].accent,
        size: 4 + Math.random() * 4,
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const playCelebrationSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const volumeMultiplier = musicVolume;
    
    // Celebration fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      const startTime = now + (i * 0.08);
      gain.gain.setValueAtTime(0.4 * volumeMultiplier, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  };

  const checkAndAwardBadges = (newStreak) => {
    const newBadges = [...earnedBadges];
    let badgeAwarded = null;
    
    badges.forEach(badge => {
      if (newStreak >= badge.requirement && !earnedBadges.includes(badge.id)) {
        newBadges.push(badge.id);
        badgeAwarded = badge;
      }
    });
    
    if (badgeAwarded) {
      setEarnedBadges(newBadges);
      localStorage.setItem('moodcast_badges', JSON.stringify(newBadges));
      
      // Show celebration
      setNewBadgeUnlocked(badgeAwarded);
      createConfetti();
      playCelebrationSound();
      
      setTimeout(() => setNewBadgeUnlocked(null), 5000);
    }
  };

  const getLeaderboard = () => {
    // Demo leaderboard (in production, fetch from backend)
    const demoLeaders = [
      { username: 'CryptoViber', streak: 156, badge: '💎' },
      { username: 'MoodMaster', streak: 89, badge: '🥇' },
      { username: 'FeelGoodFren', streak: 67, badge: '🥈' },
      { username: 'DailyVibes', streak: 45, badge: '🥈' },
      { username: 'StreakKing', streak: 38, badge: '🥈' },
      { username: 'HappyCaster', streak: 29, badge: '🥉' },
      { username: 'ChillMood', streak: 21, badge: '🥉' },
      { username: 'EmotionExpress', streak: 15, badge: '🥉' },
      { username: 'VibeChecker', streak: 12, badge: '🥉' },
      { username: 'MoodTracker', streak: 8, badge: '🥉' },
    ];
    
    return demoLeaders;
  };

  const getUserRank = () => {
    const leaders = getLeaderboard();
    const userIndex = leaders.findIndex(l => l.streak < streak);
    return userIndex === -1 ? leaders.length + 1 : userIndex + 1;
  };

  const generateAchievementImage = (badge) => {
    // This would generate a shareable image
    // For now, we'll create a text-based share
    const text = `🎉 Achievement Unlocked!\n\n${badge.emoji} ${badge.name}\n${badge.description}\n\n🔥 ${streak} Day Streak on MoodCast!\n\n🎭 Cast your mood too via MoodCast on Farcaster!`;
    return text;
  };

  const shareAchievement = (badge) => {
    const shareText = generateAchievementImage(badge);
    const baseUrl = window.location.origin;
    const embedUrl = encodeURIComponent(baseUrl);
    const castText = encodeURIComponent(shareText);
    
    const warpcastUrl = `https://warpcast.com/~/compose?text=${castText}&embeds[]=${embedUrl}`;
    window.open(warpcastUrl, '_blank');
  };

  const startBackgroundMusic = () => {
    if (!audioContextRef.current || backgroundMusicRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const gain3 = ctx.createGain();
    const masterGain = ctx.createGain();
    
    osc1.frequency.value = 130.81;
    osc2.frequency.value = 164.81;
    osc3.frequency.value = 196.00;
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'triangle';
    
    gain1.gain.value = 0.008;
    gain2.gain.value = 0.006;
    gain3.gain.value = 0.005;
    
    const baseVolume = 0.015;
    masterGain.gain.value = 0;
    masterGain.gain.setTargetAtTime(baseVolume * musicVolume, now, 2);
    
    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);
    
    gain1.connect(masterGain);
    gain2.connect(masterGain);
    gain3.connect(masterGain);
    masterGain.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    
    backgroundMusicRef.current = { osc1, osc2, osc3, masterGain };
    setIsMusicPlaying(true);
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      const { osc1, osc2, osc3, masterGain } = backgroundMusicRef.current;
      
      masterGain.gain.setTargetAtTime(0, now, 0.5);
      
      setTimeout(() => {
        osc1.stop();
        osc2.stop();
        osc3.stop();
      }, 600);
      
      backgroundMusicRef.current = null;
      setIsMusicPlaying(false);
    }
  };

  const toggleBackgroundMusic = () => {
    if (isMusicPlaying) {
      stopBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
  };

  const playMoodSound = (moodLabel) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const volumeMultiplier = musicVolume;
    
    switch(moodLabel) {
      case 'Happy':
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
        
      case 'Sad':
        osc.frequency.setValueAtTime(293.66, now);
        osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(220.00, now + 0.4);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.25 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
        
      case 'Angry':
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.15);
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.35 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
        
      case 'Calm':
        osc.frequency.setValueAtTime(392.00, now);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.2 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
        break;
        
      case 'Excited':
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15);
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.3 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
        
      case 'Sleepy':
        osc.frequency.setValueAtTime(220.00, now);
        osc.frequency.exponentialRampToValueAtTime(110.00, now + 0.6);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.2 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
        osc.start(now);
        osc.stop(now + 0.7);
        break;
        
      case 'Chill':
        osc.frequency.setValueAtTime(329.63, now);
        osc.frequency.exponentialRampToValueAtTime(293.66, now + 0.4);
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.25 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
        
      case 'Curious':
        osc.frequency.setValueAtTime(440.00, now);
        osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.25);
        osc.type = 'square';
        gain.gain.setValueAtTime(0.2 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
        
      default:
        osc.frequency.value = 600;
        gain.gain.setValueAtTime(0.1 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    }
  };

  const playCastSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const volumeMultiplier = musicVolume;
    
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      const startTime = now + (i * 0.1);
      gain.gain.setValueAtTime(0.3 * volumeMultiplier, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    playMoodSound(mood.label);
  };

  const handleCastMood = (e) => {
    if (!selectedMood) {
      alert('Please select your mood first! 😊');
      return;
    }

    playCastSound();
    
    // Create particles at button position
    const rect = e.target.getBoundingClientRect();
    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);

    const today = new Date();
    const todayString = today.toDateString();
    const dateKey = today.toISOString().split('T')[0];
    
    const newHistory = { ...moodHistory };
    newHistory[dateKey] = { mood: selectedMood.label, emoji: selectedMood.emoji };
    setMoodHistory(newHistory);
    localStorage.setItem('moodcast_history', JSON.stringify(newHistory));
    
    if (lastCastDate) {
      const lastDateString = lastCastDate.toDateString();
      if (lastDateString === todayString) {
        // Already cast today
      } else {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLastCastDate(today);
        localStorage.setItem('moodcast_streak', newStreak.toString());
        localStorage.setItem('moodcast_last_date', today.toISOString());
        checkAndAwardBadges(newStreak);
      }
    } else {
      setStreak(1);
      setLastCastDate(today);
      localStorage.setItem('moodcast_streak', '1');
      localStorage.setItem('moodcast_last_date', today.toISOString());
      checkAndAwardBadges(1);
    }

    const templates = castTexts[selectedMood.label];
    const randomText = templates[Math.floor(Math.random() * templates.length)];
    const streakText = streak > 0 ? `\n\n🔥 ${streak + 1} day streak on MoodCast!` : '';
    const fullText = `${randomText}${streakText}\n\n🎭 Cast your mood too via MoodCast on Farcaster!`;

    const baseUrl = window.location.origin;
    const embedUrl = encodeURIComponent(baseUrl);
    const castText = encodeURIComponent(fullText);
    
    const warpcastUrl = `https://warpcast.com/~/compose?text=${castText}&embeds[]=${embedUrl}`;
    window.open(warpcastUrl, '_blank');
  };

  const changeTheme = (themeKey) => {
    setCurrentTheme(themeKey);
    localStorage.setItem('moodcast_theme', themeKey);
    setShowThemeSelector(false);
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: '10px' }}></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateKey = date.toISOString().split('T')[0];
      const dayMood = moodHistory[dateKey];
      const isToday = day === today.getDate();
      
      days.push(
        <div
          key={day}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: isToday ? `2px solid ${themes[currentTheme].accent}` : '1px solid rgba(255,255,255,0.1)',
            background: dayMood ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          <div>{day}</div>
          {dayMood && <div style={{ fontSize: '1.5rem', marginTop: '5px' }}>{dayMood.emoji}</div>}
        </div>
      );
    }
    
    return days;
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          15% { opacity: 0.12; }
          85% { opacity: 0.12; }
          100% { transform: translateY(-150px) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes logoScale {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          70% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes particleExpand {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }
        @keyframes badgePopIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .mood-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mood-card:hover {
          transform: translateY(-8px) scale(1.05) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .mood-emoji {
          transition: all 0.3s ease;
        }
        .mood-card:hover .mood-emoji {
          animation: bounce 0.6s ease infinite;
        }
        .streak-badge {
          animation: pulse 2s ease-in-out infinite;
        }
        .cast-button {
          background-size: 200% 200%;
          transition: all 0.4s ease;
        }
        .cast-button:hover:not(:disabled) {
          background-position: right center;
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        }
        .cast-button:active:not(:disabled) {
          transform: scale(0.98);
        }
        .selected-mood-box {
          animation: slideInUp 0.4s ease-out;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
          background: rgba(30, 27, 75, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 2rem;
          max-width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          animation: slideInUp 0.3s ease-out;
        }
        .icon-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-size: 1.2rem;
        }
        .icon-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        .volume-slider {
          width: 120px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.2);
          outline: none;
          border-radius: 2px;
        }
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #10b981;
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        .volume-slider::-webkit-slider-thumb:hover {
          background: #059669;
          transform: scale(1.2);
        }
        .confetti-piece {
          position: fixed;
          width: 10px;
          height: 10px;
          animation: confettiFall var(--duration) linear forwards;
          z-index: 9999;
        }
        .particle {
          position: fixed;
          border-radius: 50%;
          animation: particleExpand 1s ease-out forwards;
          z-index: 9998;
        }
        .badge-unlock-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
          border: 3px solid #f59e0b;
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
          z-index: 10000;
          animation: badgePopIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        @media (max-width: 768px) {
          .modal-content {
            max-width: 95%;
            padding: 1.5rem;
          }
          .icon-button {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
          }
        }
      `}</style>
      
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            '--duration': `${piece.animationDuration}s`,
            animationDelay: `${piece.animationDelay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            '--tx': `${particle.vx * 50}px`,
            '--ty': `${particle.vy * 50}px`,
          }}
        />
      ))}

      {/* Badge Unlock Celebration */}
      {newBadgeUnlocked && (
        <div className="badge-unlock-modal">
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
          <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>{newBadgeUnlocked.emoji}</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#f59e0b' }}>
            Achievement Unlocked!
          </h2>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            {newBadgeUnlocked.name}
          </h3>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
            {newBadgeUnlocked.description}
          </p>
          <button
            onClick={() => shareAchievement(newBadgeUnlocked)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Share Achievement 🎭
          </button>
        </div>
      )}

      {/* Splash Screen */}
      {showSplash && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: themes[currentTheme].gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeOut 1.5s ease-in-out forwards',
        }}>
          <img 
            src="/logo.png" 
            alt="MoodCast Logo"
            style={{
              width: '180px',
              height: '180px',
              animation: 'logoScale 1s ease-out forwards',
            }}
          />
        </div>
      )}

      {/* Badges Modal */}
      {showBadges && (
        <div className="modal-overlay" onClick={() => setShowBadges(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>🏆 Your Badges</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {badges.map(badge => {
                const isEarned = earnedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: isEarned ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      border: `1px solid ${isEarned ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255,255,255,0.1)'}`,
                      opacity: isEarned ? 1 : 0.5,
                    }}
                  >
                    <div style={{ fontSize: '3rem' }}>{isEarned ? badge.emoji : '🔒'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{badge.name}</div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{badge.description}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.3rem' }}>
                        {isEarned ? '✅ Unlocked!' : `Requires ${badge.requirement} day streak`}
                      </div>
                    </div>
                    {isEarned && (
                      <button
                        onClick={() => shareAchievement(badge)}
                        style={{
                          background: themes[currentTheme].accent,
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                        }}
                      >
                        Share
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setShowBadges(false)}
              style={{
                marginTop: '1.5rem',
                padding: '0.8rem 1.5rem',
                background: themes[currentTheme].accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="modal-overlay" onClick={() => setShowLeaderboard(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>🏆 Leaderboard</h2>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>Your Rank</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>#{getUserRank()}</div>
              <div style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>🔥 {streak} day streak</div>
            </div>
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              {getLeaderboard().map((leader, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: index < 3 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: index < 3 ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '30px' }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{leader.username}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>🔥 {leader.streak} days</div>
                  </div>
                  <div style={{ fontSize: '1.5rem' }}>{leader.badge}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowLeaderboard(false)}
              style={{
                marginTop: '1.5rem',
                padding: '0.8rem 1.5rem',
                background: themes[currentTheme].accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="modal-overlay" onClick={() => setShowCalendar(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>📅 Mood Calendar</h2>
            <div style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
              marginBottom: '1rem',
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', opacity: 0.7 }}>
                  {day}
                </div>
              ))}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '8px',
            }}>
              {renderCalendar()}
            </div>
            <button
              onClick={() => setShowCalendar(false)}
              style={{
                marginTop: '1.5rem',
                padding: '0.8rem 1.5rem',
                background: themes[currentTheme].accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Theme Selector Modal */}
      {showThemeSelector && (
        <div className="modal-overlay" onClick={() => setShowThemeSelector(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>🎨 Choose Theme</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {Object.entries(themes).map(([key, theme]) => (
                <div
                  key={key}
                  onClick={() => changeTheme(key)}
                  style={{
                    padding: '1rem',
                    background: theme.gradient,
                    borderRadius: '12px',
                    border: currentTheme === key ? `3px solid ${theme.accent}` : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>{theme.name}</span>
                  {currentTheme === key && <span>✅</span>}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowThemeSelector(false)}
              style={{
                marginTop: '1.5rem',
                padding: '0.8rem 1.5rem',
                background: themes[currentTheme].accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        display: 'flex',
        gap: '10px',
        zIndex: 100,
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
      }}>
        <button className="icon-button" onClick={() => setShowLeaderboard(true)} title="Leaderboard">
          👑
        </button>
        <button className="icon-button" onClick={() => setShowBadges(true)} title="Badges">
          🏆
        </button>
        <button className="icon-button" onClick={() => setShowCalendar(true)} title="Calendar">
          📅
        </button>
        <button className="icon-button" onClick={() => setShowThemeSelector(true)} title="Themes">
          🎨
        </button>
      </div>

      {/* Music Controls */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
        zIndex: 100,
      }}>
        {showVolumeControl && (
          <div style={{
            background: 'rgba(30, 27, 75, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'slideInRight 0.3s ease-out',
          }}>
            <span style={{ fontSize: '0.9rem' }}>🔉</span>
            <input
              type="range"
              min="0"
              max="100"
              value={musicVolume * 100}
              onChange={(e) => setMusicVolume(e.target.value / 100)}
              className="volume-slider"
            />
            <span style={{ fontSize: '0.9rem' }}>🔊</span>
          </div>
        )}
        
        <button className="icon-button" onClick={() => setShowVolumeControl(!showVolumeControl)} title="Volume">
          🎚️
        </button>
        
        <button className="icon-button" onClick={toggleBackgroundMusic} title={isMusicPlaying ? 'Mute' : 'Play'}>
          {isMusicPlaying ? '🔊' : '🔇'}
        </button>
      </div>

      <div style={{
        minHeight: '100vh',
        background: themes[currentTheme].gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease',
      }}>
        
        {/* Floating emojis */}
        {startAnimation && floatingEmojis.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              animation: `float ${item.animationDuration}s ease-in-out ${item.animationDelay}s infinite`,
              pointerEvents: 'none',
              userSelect: 'none',
              opacity: 0,
            }}
          >
            {item.emoji}
          </div>
        ))}

        <div style={{ textAlign: 'center', maxWidth: '600px', position: 'relative', zIndex: 1 }}>
          {/* Streak Badge */}
          {streak > 0 && (
            <div className="streak-badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              marginBottom: '1.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
            }}>
              🔥 {streak} Day Streak!
            </div>
          )}

          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            MoodCast
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
            Express your current mood & share it on Farcaster 🎭
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {moods.map((mood) => (
              <div 
                key={mood.id}
                className="mood-card"
                onClick={() => handleMoodSelect(mood)}
                onMouseEnter={() => setHoveredMood(mood.id)}
                onMouseLeave={() => setHoveredMood(null)}
                style={{
                  background: selectedMood?.id === mood.id 
                    ? `${themes[currentTheme].accent}33` 
                    : hoveredMood === mood.id
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  border: selectedMood?.id === mood.id 
                    ? `2px solid ${themes[currentTheme].accent}` 
                    : '2px solid transparent',
                  transform: selectedMood?.id === mood.id ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <div className="mood-emoji" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {mood.emoji}
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                  {mood.label}
                </div>
              </div>
            ))}
          </div>
          
          {selectedMood && (
            <div className="selected-mood-box" style={{
              background: `${themes[currentTheme].accent}33`,
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              border: `1px solid ${themes[currentTheme].accent}80`,
            }}>
              <p style={{ fontSize: '1rem', margin: 0 }}>
                ✨ Selected mood: <strong>{selectedMood.label} {selectedMood.emoji}</strong>
              </p>
            </div>
          )}
          
          <button 
            className="cast-button"
            onClick={handleCastMood}
            style={{
              background: selectedMood 
                ? `linear-gradient(135deg, ${themes[currentTheme].accent} 0%, ${themes[currentTheme].accent}CC 50%, ${themes[currentTheme].accent} 100%)` 
                : 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: selectedMood ? 'pointer' : 'not-allowed',
              marginBottom: '2rem',
              opacity: selectedMood ? 1 : 0.6,
            }}
            disabled={!selectedMood}
          >
            Cast 🎭 Mood
          </button>
          
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            💜 Built for Farcaster · MoodCast © 2025 by traviskaah
          </p>
        </div>
      </div>
    </>
  );
}