import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Gamepad2, X, Plus, Rocket, Globe, Smartphone, Monitor, Search, Settings } from 'lucide-react';
import { Forum } from './components/Forum';

interface Game {
  id: string;
  name: string;
  url: string;
  image: string;
  color: string;
  defaultPortrait?: boolean;
}

const DEFAULT_GAMES: Game[] = [
  {
    id: 'fnaf-1',
    name: 'FNAF 1',
    url: 'https://fivenightsatfreddysgame.io/play/five-nights-at-freddys/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9b/77/03/9b77034f-5ade-ddf5-9c2d-48fd8a546c62/AppIcon-1x_U007epad-0-85-220-0.png/512x512bb.jpg',
    color: '#8b0000'
  },
  {
    id: 'fnaf-2',
    name: 'FNAF 2',
    url: 'https://fivenightsatfreddysgame.io/play/five-nights-at-freddys-2/',
    image: 'https://steamcdn-a.akamaihd.net/steam/apps/332800/header.jpg',
    color: '#FF8800'
  },
  {
    id: 'eaglercraft',
    name: 'Eaglercraft (MC)',
    url: 'https://eaglercraft.q13x.com/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c9/81/16/c981164e-410c-7a07-d76b-3a8e4238793b/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg',
    color: '#a855f7'
  },
  {
    id: 'retro-bowl',
    name: 'Retro Bowl',
    url: '/retrobowl.html',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ef/a7/1d/efa71d1e-7304-e890-a09c-72edaa3f6580/AppIcon-0-0-1x_U007emarketing-0-8-0-0-85-220.png/512x512bb.jpg',
    color: '#4B3621'
  },
  {
    id: 'slope',
    name: 'Slope',
    url: 'https://brunoiscool2.github.io/unblockedgames/play/slope/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/1a/bd/65/1abd65ad-c663-0b81-daa0-ed8d5d9ce3cb/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
    color: '#00FA9A'
  },
  {
    id: 'subway-surfers',
    name: 'Subway Surfers',
    url: 'https://subwaysurfers.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2c/b6/06/2cb606cd-7784-07bf-2c3a-e3ba376dec68/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#facc15',
    defaultPortrait: true
  },
  {
    id: 'krunker',
    name: 'Krunker.io',
    url: 'https://krunker.io/',
    image: 'https://steamcdn-a.akamaihd.net/steam/apps/1122100/header.jpg',
    color: '#ff3366'
  },
  {
    id: 'fnf',
    name: 'Friday Night Funkin\'',
    url: 'https://brunoiscool2.github.io/fnf/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/7f/40/e9/7f40e93d-18b8-a9f7-f98f-8bcb0c219ed9/AppIcon-0-0-1x_U007emarketing-0-11-0-P3-85-220.png/512x512bb.jpg',
    color: '#FF1493'
  },
  {
    id: 'geometry-dash',
    name: 'Geometry Dash',
    url: 'https://geometrydash.io/',
    image: 'https://steamcdn-a.akamaihd.net/steam/apps/322170/header.jpg',
    color: '#00FFFF'
  },
  {
    id: 'shell-shockers',
    name: 'Shell Shockers',
    url: 'https://shellshock.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/11/b0/d6/11b0d6e0-3e89-0dfd-b445-7d299d00b33f/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#facc15'
  },
  {
    id: 'smash-karts',
    name: 'Smash Karts',
    url: 'https://smashkarts.com/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/20/b3/08/20b3085b-14b3-a0bf-3e58-c4cc7ffaa048/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#39ff14'
  },
  {
    id: 'hole-io',
    name: 'Hole.io',
    url: 'https://hole-io.com/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9f/fa/fa/9ffafa69-3740-3a05-2a31-2d3061afc644/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#FF00FF'
  },
  {
    id: 'paper-io-2',
    name: 'Paper.io 2',
    url: 'https://paper-io.com/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c9/d7/80/c9d78046-a119-b893-eace-abf59653e560/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#FF00FF'
  },
  {
    id: 'drive-mad',
    name: 'Drive Mad',
    url: 'https://brunoiscool2.github.io/games1/drivemad/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3b/0a/e1/3b0ae123-071f-b60d-9434-1bf69a7552af/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#FF8C00'
  },
  {
    id: 'snake-io',
    name: 'Snake.io',
    url: 'https://brunoiscool2.github.io/games3/snakeio/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/84/53/31/845331ee-e088-5438-377b-b82d60845e93/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#00FF00'
  },
  {
    id: 'tomb-of-the-mask',
    name: 'Tomb of the Mask',
    url: 'https://beta-brunysixl-v3.onrender.com/games/selfhosted/tombofthemask/index.html',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4c/b3/8e/4cb38eef-73f9-fd90-94d7-a8dcbd90ab32/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#FFD700',
    defaultPortrait: true
  },
  {
    id: '2v2-io',
    name: '2v2.io',
    url: 'https://2v2.io/',
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600&auto=format&fit=crop',
    color: '#ff3366'
  },
  {
    id: 'flappy-bird',
    name: 'Floppy Bird',
    url: 'https://nebezb.com/floppybird/',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png',
    color: '#ff3366',
    defaultPortrait: true
  },
  {
    id: 'monkey-mart',
    name: 'Monkey Mart',
    url: 'https://monkey-mart.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5c/09/44/5c094471-f115-c8b9-6df0-559630eebc4e/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    color: '#8b4513'
  },
  {
    id: 'crossy-road',
    name: 'Crossy Road',
    url: 'https://crossy-road.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/1f/f3/9c/1ff39cc7-a4af-4d4a-e8af-b3bdcb9028a9/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#39ff14',
    defaultPortrait: true
  },
  {
    id: 'bitlife',
    name: 'BitLife',
    url: 'https://bitlifefree.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/83/17/fe/8317feb8-8517-f350-40e4-cc547f732210/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#ff3366',
    defaultPortrait: true
  }
];

const VITA_BACKGROUNDS = [
  { id: 'blue', color1: '#1A82E2', color2: '#0D3880', wave: 'rgba(255,255,255,0.1)' },
  { id: 'pink', color1: '#E21A82', color2: '#800D38', wave: 'rgba(255,255,255,0.1)' },
  { id: 'green', color1: '#1AE282', color2: '#0D8038', wave: 'rgba(255,255,255,0.1)' },
  { id: 'charcoal', color1: '#333333', color2: '#111111', wave: 'rgba(255,255,255,0.05)' },
  { id: 'purple', color1: '#821AE2', color2: '#380D80', wave: 'rgba(255,255,255,0.1)' },
];

const GameCard = ({ game, i, onOpen }: { game: Game, i: number, onOpen: (g: Game) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -10, 0] 
      }}
      transition={{ 
        opacity: { delay: i * 0.05, duration: 0.4 },
        scale: { delay: i * 0.05, type: 'spring', bounce: 0.5 },
        y: { delay: i * 0.05, duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut' }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center gap-2 cursor-pointer w-[110px] sm:w-[130px]"
      onClick={() => onOpen(game)}
    >
      <div 
        className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-full overflow-hidden shadow-[0_15px_25px_rgba(0,0,0,0.4)] border-[3px] border-white/80 group-hover:border-white transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
      >
        <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-500" />
        
        {/* Glossy sphere overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(255,255,255,0.8)_0%,_rgba(255,255,255,0)_40%)] pointer-events-none z-10 opacity-70" />
        <div className="absolute inset-0 border-[4px] border-white/20 rounded-full pointer-events-none z-10" />
        
        {/* Shadow inner ring */}
        <div className="absolute inset-0 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.6)] rounded-full pointer-events-none z-10" />
      </div>
      
      <div 
        className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold w-full text-center truncate shadow-lg border border-white/20 group-hover:bg-white/90 group-hover:text-black group-hover:border-white transition-colors"
      >
         {game.name}
      </div>
    </motion.div>
  );
};

const VitaBackground = ({ theme }: { theme: any }) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1] transition-colors duration-1000 overflow-hidden"
      style={{ backgroundImage: `linear-gradient(135deg, ${theme.color1}, ${theme.color2})` }}
    >
      {/* Dynamic Ribbon Waves */}
      <svg className="absolute inset-0 w-[200%] h-full opacity-60 mix-blend-overlay blur-[2px]" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path
          fill={theme.wave}
          animate={{
            d: [
              "M0,40 Q25,20 50,40 T100,40 L100,100 L0,100 Z",
              "M0,40 Q25,60 50,40 T100,40 L100,100 L0,100 Z",
              "M0,40 Q25,20 50,40 T100,40 L100,100 L0,100 Z"
            ],
            x: ["0%", "-50%"]
          }}
          transition={{ d: { duration: 12, repeat: Infinity, ease: 'easeInOut' }, x: {duration: 25, repeat: Infinity, ease: 'linear'} }}
        />
        <motion.path
          fill={theme.wave}
          animate={{
            d: [
              "M0,60 Q25,80 50,60 T100,60 L100,100 L0,100 Z",
              "M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z",
              "M0,60 Q25,80 50,60 T100,60 L100,100 L0,100 Z"
            ],
            x: ["-50%", "0%"]
          }}
          transition={{ d: {duration: 15, repeat: Infinity, ease: 'easeInOut'}, x: {duration: 30, repeat: Infinity, ease: 'linear'} }}
        />
      </svg>
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
           key={i}
           className="absolute w-2 h-2 rounded-full bg-white/30 backdrop-blur-sm"
           initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, scale: Math.random() + 0.5 }}
           animate={{ 
             y: [0, -100, 0],
             opacity: [0.2, 0.8, 0.2] 
           }}
           transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [portraitMode, setPortraitMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(VITA_BACKGROUNDS[0]);
  const welcomeAudioRef = useRef<HTMLAudioElement | null>(null);
  const exploreAudioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!hasInteracted) return;

    // Stop both to start clean
    if (welcomeAudioRef.current) welcomeAudioRef.current.pause();
    if (exploreAudioRef.current) exploreAudioRef.current.pause();

    const playAudio = async (audioElement: HTMLAudioElement) => {
      try {
        audioElement.currentTime = 0;
        await audioElement.play();
      } catch (e) {
        console.warn('Audio playback failed (file might be missing or blocked):', e);
      }
    };

    if (!activeGame) {
      if (exploreAudioRef.current) {
        playAudio(exploreAudioRef.current);
      }
    }
  }, [activeGame, hasInteracted]);

  const handleOpenGame = (game: Game) => {
    setActiveGame(game);
    setPortraitMode(!!game.defaultPortrait);
  };

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <audio ref={welcomeAudioRef} src="https://jetta.vgmtreasurechest.com/soundtracks/ps-vita-system-music/lqxqkbet/02.%20Home%20Screen.mp3" loop />
      <audio ref={exploreAudioRef} src="https://jetta.vgmtreasurechest.com/soundtracks/ps-vita-system-music/beryrota/05.%20PlayStation%20Store%20-%20Main%20Theme.mp3" loop />

      <AnimatePresence>
        {!hasInteracted && (
          <motion.div 
            key="lockscreen"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-between py-16 cursor-pointer shadow-[20px_20px_60px_rgba(0,0,0,0.5)] origin-[100%_0%] overflow-hidden"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${currentTheme.color1}, ${currentTheme.color2})` }}
            onClick={() => {
              setHasInteracted(true);
            }}
            initial={{ opacity: 1, y: 0, scale: 1, rotate: 0, borderBottomLeftRadius: 0 }}
            exit={{ 
              opacity: 0, 
              y: "-80%", 
              x: "80%", 
              rotate: 35,
              borderBottomLeftRadius: '100%',
              transition: { duration: 0.8, ease: [0.8, 0, 0.2, 1] }
            }}
          >
            {/* Glossy fold effect on peel */}
            <div className="absolute inset-0 bg-gradient-to-bl from-white/40 via-transparent to-transparent opacity-0 pointer-events-none" />
            
            {/* Top Right Fold Indicator */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/40 to-transparent flex items-start justify-end p-4 rounded-bl-[100%] animate-pulse">
              <span className="text-white text-xl font-light transform rotate-[-45deg] translate-x-1 translate-y-1">◢</span>
            </div>

            <motion.div 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 1 }}
              className="relative z-10 text-white font-light text-9xl drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)] tracking-tighter mt-12 w-full px-12 flex justify-between items-start"
            >
              <div className="flex flex-col">
                <span className="text-4xl font-normal ml-2 mb-2 opacity-90">{currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                <span>{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-10 text-white font-semibold text-lg tracking-widest uppercase drop-shadow-md pb-12 flex flex-col items-center gap-4"
            >
              Peel to start
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VitaBackground theme={currentTheme} />
      
      {/* Background Theme Selector */}
      <div className="fixed bottom-6 right-6 z-[100] flex gap-3 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-xl opacity-50 hover:opacity-100 transition-opacity">
        <Settings className="w-6 h-6 text-white self-center mx-2" />
        {VITA_BACKGROUNDS.map(bg => (
          <button 
            key={bg.id}
            onClick={() => setCurrentTheme(bg)} 
            className={`w-8 h-8 rounded-full border-2 transition-transform ${currentTheme.id === bg.id ? 'border-white scale-110' : 'border-white/40 hover:scale-105'}`}
            style={{ background: bg.color1 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence>
        {!activeGame && hasInteracted && (
          <motion.div 
            key="maingrid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 relative z-10 px-8 py-4 border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl rounded-full mx-auto max-w-7xl">
              <motion.div 
                className="flex items-center gap-4 shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full shadow-inner flex items-center justify-center border border-white/50">
                  <Gamepad2 className="text-white w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md uppercase italic">
                  LiveArea
                </h1>
              </motion.div>
              
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 cursor-pointer" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/30 rounded-full py-3 pl-12 pr-6 text-white placeholder-white/60 font-medium focus:outline-none focus:border-white focus:bg-black/60 transition-all backdrop-blur-md shadow-inner"
                />
              </div>
            </header>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-16 max-w-5xl mx-auto px-4 py-10">
              {filteredGames.length === 0 ? (
                <div className="w-full py-20 text-center text-white/80 font-bold text-xl">
                  No applications found
                </div>
              ) : (
                filteredGames.map((game, i) => (
                  <GameCard key={game.id} game={game} i={i} onOpen={handleOpenGame} />
              ))
              )}
            </div>
            
            <div className="mt-20">
              <Forum />
            </div>
            
            <p className="text-center mt-16 text-white/50 font-sans text-sm font-medium">
              Note: Unblocked games are fetched via third-party GitHub Pages and HTML URLs. <br/>
              To export this site to GitHub, simply build it and push the static files!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Player Fullscreen */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center overflow-x-hidden"
          >
            {/* Game Player Fullscreen with LiveArea Theme */}
            <div className="flex items-center justify-between px-8 py-4 bg-black/60 border-b border-white/10 backdrop-blur-2xl w-full shadow-md z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shadow-inner">
                   <Gamepad2 className="w-5 h-5 text-white drop-shadow-md" />
                 </div>
                 <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                  {activeGame.name}
                 </h2>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPortraitMode(!portraitMode)}
                  className="px-5 py-2.5 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 font-semibold text-xs transition-all flex items-center gap-2 text-white hidden sm:flex cursor-pointer shadow-[0_0_10px_rgba(255,255,255,0.1)] backdrop-blur-md"
                >
                  {portraitMode ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  {portraitMode ? 'Landscape' : 'Portrait'}
                </motion.button>
                <a 
                  href={activeGame.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-white/20 rounded-full border border-white/40 hover:bg-white/30 font-semibold text-xs transition-all flex items-center gap-2 text-white cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] backdrop-blur-md"
                >
                  Open in Browser <Globe className="w-4 h-4" />
                </a>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveGame(null)}
                  className="bg-black/40 hover:bg-red-500/80 text-white rounded-full p-2.5 cursor-pointer border border-white/30 shadow-inner backdrop-blur-md transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
            
            <div className={`flex-1 w-full relative flex justify-center items-center overflow-hidden ${portraitMode ? 'p-0 sm:p-6 md:p-12' : ''}`}>
              <VitaBackground theme={currentTheme} />
              <div className="absolute inset-0 bg-black/40 -z-10" />
              <div className={`w-full h-full relative transition-all duration-500 ${portraitMode ? 'max-w-md max-h-[85vh] sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-black/80' : ''}`}>
                <iframe 
                  src={activeGame.url}
                  className="w-full h-full border-none bg-black"
                  allow="autoplay; fullscreen; gamepad; focus"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-downloads"
                  title={activeGame.name}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals removed for simplified public forum experience */}
    </>
  );
}
