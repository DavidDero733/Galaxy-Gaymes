import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Plus, Rocket, Globe, Smartphone, Monitor } from 'lucide-react';
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
    id: 'hextris',
    name: 'Hextris',
    url: 'https://hextris.github.io/hextris/',
    image: 'https://raw.githubusercontent.com/hextris/hextris/master/favicon.ico',
    color: '#a855f7'
  },
  {
    id: '2048',
    name: '2048',
    url: 'https://gabrielecirulli.github.io/2048/',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2048_logo.svg/512px-2048_logo.svg.png',
    color: '#ffb347'
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
    id: 'pacman',
    name: 'Pac-Man',
    url: 'https://macek.github.io/google_pacman/',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/1200px-Pacman.svg.png',
    color: '#facc15'
  },
  {
    id: 'react-tetris',
    name: 'Tetris',
    url: 'https://chvin.github.io/react-tetris/',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Tetris_logo.png',
    color: '#00FFFF',
    defaultPortrait: true
  },
  {
    id: 'ztype',
    name: 'ZType',
    url: 'https://zty.pe/',
    image: 'https://img.itch.zone/aW1hZ2UvNTM5OTYvMjUwNDAxLnBuZw==/original/71J1Uo.png',
    color: '#FF00FF'
  },
  {
    id: 'tower-blocks',
    name: 'Tower Blocks',
    url: 'https://iamkun.github.io/tower_game/',
    image: 'https://iamkun.github.io/tower_game/assets/icon.png',
    color: '#39ff14',
    defaultPortrait: true
  },
  {
    id: 'alien-invasion',
    name: 'Alien Invasion',
    url: 'https://cykod.github.io/Alien-Invasion/',
    image: 'https://cykod.github.io/Alien-Invasion/images/sprites.png',
    color: '#7597de'
  },
  {
    id: 'basket-random',
    name: 'Basket Random',
    url: 'https://basketrandom.github.io/',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#FF8800'
  },
  {
    id: 'bitlife',
    name: 'BitLife',
    url: 'https://bitlifefree.io/',
    image: 'https://images.unsplash.com/photo-1555529771-835f59bfc40a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#ff3366',
    defaultPortrait: true
  },
  {
    id: 'geometry-dash',
    name: 'Geometry Dash',
    url: 'https://geometrydash.io/',
    image: 'https://images.unsplash.com/photo-1508933221971-ce453bfbc02a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#00FFFF'
  },
  {
    id: 'subway-surfers',
    name: 'Subway Surfers',
    url: 'https://subwaysurfers.io/',
    image: 'https://images.unsplash.com/photo-1498177688220-337cecc55be3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#facc15',
    defaultPortrait: true
  },
  {
    id: 'monkey-mart',
    name: 'Monkey Mart',
    url: 'https://monkey-mart.io/',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#8b4513'
  },
  {
    id: 'eaglercraft',
    name: 'Eaglercraft (MC)',
    url: 'https://eaglercraft.q13x.com/',
    image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#a855f7'
  },
  {
    id: 'web-dashers',
    name: 'Web Dashers',
    url: 'https://web-dashers.github.io/',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
    color: '#7597de'
  },
  {
    id: 'crossy-road',
    name: 'Crossy Road',
    url: 'https://crossy-road.io/',
    image: 'https://images.unsplash.com/photo-1494809610410-160faaed4de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#39ff14',
    defaultPortrait: true
  },
  {
    id: '2v2-io',
    name: '2v2.io',
    url: 'https://2v2.io/',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#ff3366'
  },
  {
    id: 'paper-io-2',
    name: 'Paper.io 2',
    url: 'https://paper-io.com/',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#FF00FF'
  },
  {
    id: 'fnaf-1',
    name: 'FNAF 1',
    url: 'https://brunoiscool2.github.io/unblockedgames/play/fnaf/',
    image: 'https://images.unsplash.com/photo-1626244675549-317185ebc839?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#8b0000'
  },
  {
    id: 'fnaf-2',
    name: 'FNAF 2',
    url: 'https://brunoiscool2.github.io/unblockedgames/play/fnaf2/',
    image: 'https://images.unsplash.com/photo-1626244675549-317185ebc839?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#FF8800'
  },
  {
    id: 'retro-bowl',
    name: 'Retro Bowl',
    url: 'https://brunoiscool2.github.io/unblockedgames/play/retrobowl/',
    image: 'https://images.unsplash.com/photo-1587280510058-2f22b7a9de5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#4B3621'
  },
  {
    id: 'slope',
    name: 'Slope',
    url: 'https://brunoiscool2.github.io/unblockedgames/play/slope/',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#00FA9A'
  },
  {
    id: 'drive-mad',
    name: 'Drive Mad',
    url: 'https://brunoiscool2.github.io/games1/drivemad/',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#FF8C00'
  },
  {
    id: 'fnf',
    name: 'Friday Night Funkin\'',
    url: 'https://brunoiscool2.github.io/fnf/',
    image: 'https://images.unsplash.com/photo-1516280440502-861fce1a9cbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#FF1493'
  },
  {
    id: 'snake-io',
    name: 'Snake.io',
    url: 'https://brunoiscool2.github.io/games3/snakeio/',
    image: 'https://images.unsplash.com/photo-1549429539-7c8008a0d922?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#00FF00'
  },
  {
    id: 'tomb-of-the-mask',
    name: 'Tomb of the Mask',
    url: 'https://beta-brunysixl-v3.onrender.com/games/selfhosted/tombofthemask/index.html',
    image: 'https://images.unsplash.com/photo-1611099667503-6258aa5655a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#FFD700',
    defaultPortrait: true
  }
];

export default function App() {
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [portraitMode, setPortraitMode] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleOpenGame = (game: Game) => {
    setActiveGame(game);
    setPortraitMode(!!game.defaultPortrait);
  };


  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050510]"
          >
            {/* Deep Galaxy Base */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#050510]/90 to-[#050510]"></div>
            
            {/* Animated Stars / Nebula effects */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-50%] opacity-40 mix-blend-screen"
              style={{
                backgroundImage: 'radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, white, rgba(0,0,0,0))',
                backgroundSize: '120px 120px'
              }}
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/4"
            />
            
            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center gap-10">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.6)] rotate-3">
                  <Rocket className="w-12 h-12 text-white drop-shadow-md" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 uppercase m-0 leading-none drop-shadow-lg text-center">
                  GALAXY GAMES
                </h1>
                <p className="text-xl text-purple-200/80 font-medium tracking-wide">
                  Your portal to unblocked entertainment
                </p>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8, type: 'spring' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168,85,247,0.8)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWelcome(false)}
                className="mt-8 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-xl uppercase tracking-[0.2em] overflow-hidden relative group cursor-pointer border border-white/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore <Globe className="w-6 h-6" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Galaxy Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#050510]">
        <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"></div>
        <div className="absolute top-40 left-80 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_12px_4px_rgba(168,85,247,0.6)]"></div>
        <div className="absolute bottom-20 right-40 w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_8px_2px_rgba(147,197,253,0.8)]"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Main Content */}
      <AnimatePresence>
        {!activeGame && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 relative z-10 px-8 py-6 border-b border-white/10 bg-black/30 backdrop-blur-md rounded-2xl mx-auto max-w-7xl">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] rotate-3">
                  <span className="text-2xl font-black">G</span>
                </div>
                <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 uppercase m-0 leading-none">
                  GALAXY GAMES
                </h1>
              </motion.div>
              
              {/* Optional header items can go here */}
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {games.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  whileHover={{ y: -5 }}
                  className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col transition-all cursor-pointer hover:border-white/20 hover:bg-white/10"
                  onClick={() => handleOpenGame(game)}
                >
                  <div className="h-40 relative overflow-hidden bg-gray-800">
                    <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-3 left-4 font-black text-xl italic uppercase text-white drop-shadow-md flex items-center gap-2">
                       {game.name}
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col gap-2 flex-grow bg-transparent">
                     <p className="text-xs text-gray-400">Play {game.name} unblocked directly in your browser!</p>
                     <button className="mt-auto w-full py-2 bg-white text-black font-bold text-xs rounded-xl uppercase hover:bg-gray-200 transition-colors">Play Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Forum />
            
            <p className="text-center mt-16 text-gray-400 font-sans text-sm">
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
            <div className="flex items-center justify-between px-8 py-4 bg-[#050510] border-b border-white/10 backdrop-blur-md w-full">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] rotate-3">
                   <Gamepad2 className="w-4 h-4 text-white" />
                 </div>
                 <h2 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 uppercase">
                  {activeGame.name}
                 </h2>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPortraitMode(!portraitMode)}
                  className="px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 font-bold text-xs uppercase transition-all flex items-center gap-2 text-white hidden sm:flex cursor-pointer"
                >
                  {portraitMode ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  {portraitMode ? 'Landscape mode' : 'Portrait mode'}
                </motion.button>
                <a 
                  href={activeGame.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 font-bold text-xs uppercase transition-all flex items-center gap-2 text-white cursor-pointer"
                >
                  Open in New Tab <Globe className="w-3 h-3" />
                </a>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveGame(null)}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 cursor-pointer border border-white/20"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
            
            <div className={`flex-1 w-full bg-black relative flex justify-center items-center ${portraitMode ? 'p-0 sm:p-4 md:p-8' : ''}`}>
              <div className={`w-full h-full relative transition-all duration-300 ${portraitMode ? 'max-w-md max-h-[85vh] sm:rounded-3xl overflow-hidden' : ''}`}>
                <iframe 
                  src={activeGame.url}
                  className="w-full h-full border-none bg-white"
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
