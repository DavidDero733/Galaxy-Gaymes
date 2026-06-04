import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Plus, Rocket, Globe, Smartphone, Monitor, Search } from 'lucide-react';
import { Forum } from './components/Forum';

import shellshockersImg from './assets/images/shell_shockers_cover_1780592380165.png';
import krunkerImg from './assets/images/krunker_io_cover_1780592393691.png';
import smashkartsImg from './assets/images/smash_karts_cover_1780592410530.png';
import holeioImg from './assets/images/hole_io_cover_1780592424235.png';
import paperioImg from './assets/images/paper_io_cover_1780592437726.png';
import fnaf1Img from './assets/images/fnaf_1_cover_1780592449589.png';
import fnaf2Img from './assets/images/fnaf_2_cover_1780592495414.png';
import retrobowlImg from './assets/images/retro_bowl_cover_1780592463075.png';
import slopeImg from './assets/images/slope_cover_1780592475345.png';
import drivemadImg from './assets/images/drive_mad_cover_1780592509359.png';
import fnfImg from './assets/images/fnf_cover_1780592522601.png';
import snakeioImg from './assets/images/snake_io_cover_1780592535385.png';
import tombmaskImg from './assets/images/tomb_mask_cover_1780592547297.png';
import twovtwoImg from './assets/images/twovtwo_io_cover_1780592560627.png';
import genericGameImg from './assets/images/generic_game_cover_1780593040352.png';

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
    image: fnaf1Img,
    color: '#8b0000'
  },
  {
    id: 'fnaf-2',
    name: 'FNAF 2',
    url: 'https://fivenightsatfreddysgame.io/play/five-nights-at-freddys-2/',
    image: fnaf2Img,
    color: '#FF8800'
  },
  {
    id: 'eaglercraft',
    name: 'Eaglercraft (MC)',
    url: 'https://eaglercraft.q13x.com/',
    image: genericGameImg,
    color: '#a855f7'
  },
  {
    id: 'retro-bowl',
    name: 'Retro Bowl',
    url: '/retrobowl.html',
    image: retrobowlImg,
    color: '#4B3621'
  },
  {
    id: 'slope',
    name: 'Slope',
    url: 'https://brunoiscool2.github.io/unblockedgames/play/slope/',
    image: slopeImg,
    color: '#00FA9A'
  },
  {
    id: 'subway-surfers',
    name: 'Subway Surfers',
    url: 'https://subwaysurfers.io/',
    image: genericGameImg,
    color: '#facc15',
    defaultPortrait: true
  },
  {
    id: 'krunker',
    name: 'Krunker.io',
    url: 'https://krunker.io/',
    image: krunkerImg,
    color: '#ff3366'
  },
  {
    id: 'fnf',
    name: 'Friday Night Funkin\'',
    url: 'https://brunoiscool2.github.io/fnf/',
    image: fnfImg,
    color: '#FF1493'
  },
  {
    id: 'geometry-dash',
    name: 'Geometry Dash',
    url: 'https://geometrydash.io/',
    image: genericGameImg,
    color: '#00FFFF'
  },
  {
    id: 'shell-shockers',
    name: 'Shell Shockers',
    url: 'https://shellshock.io/',
    image: shellshockersImg,
    color: '#facc15'
  },
  {
    id: 'smash-karts',
    name: 'Smash Karts',
    url: 'https://smashkarts.com/',
    image: smashkartsImg,
    color: '#39ff14'
  },
  {
    id: 'hole-io',
    name: 'Hole.io',
    url: 'https://hole-io.com/',
    image: holeioImg,
    color: '#FF00FF'
  },
  {
    id: 'paper-io-2',
    name: 'Paper.io 2',
    url: 'https://paper-io.com/',
    image: paperioImg,
    color: '#FF00FF'
  },
  {
    id: 'drive-mad',
    name: 'Drive Mad',
    url: 'https://brunoiscool2.github.io/games1/drivemad/',
    image: drivemadImg,
    color: '#FF8C00'
  },
  {
    id: 'snake-io',
    name: 'Snake.io',
    url: 'https://brunoiscool2.github.io/games3/snakeio/',
    image: snakeioImg,
    color: '#00FF00'
  },
  {
    id: 'tomb-of-the-mask',
    name: 'Tomb of the Mask',
    url: 'https://beta-brunysixl-v3.onrender.com/games/selfhosted/tombofthemask/index.html',
    image: tombmaskImg,
    color: '#FFD700',
    defaultPortrait: true
  },
  {
    id: '2v2-io',
    name: '2v2.io',
    url: 'https://2v2.io/',
    image: twovtwoImg,
    color: '#ff3366'
  },
  {
    id: 'flappy-bird',
    name: 'Floppy Bird',
    url: 'https://nebezb.com/floppybird/',
    image: genericGameImg,
    color: '#ff3366',
    defaultPortrait: true
  },
  {
    id: 'monkey-mart',
    name: 'Monkey Mart',
    url: 'https://monkey-mart.io/',
    image: genericGameImg,
    color: '#8b4513'
  },
  {
    id: 'crossy-road',
    name: 'Crossy Road',
    url: 'https://crossy-road.io/',
    image: genericGameImg,
    color: '#39ff14',
    defaultPortrait: true
  },
  {
    id: 'bitlife',
    name: 'BitLife',
    url: 'https://bitlifefree.io/',
    image: genericGameImg,
    color: '#ff3366',
    defaultPortrait: true
  }
];

export default function App() {
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [portraitMode, setPortraitMode] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const welcomeAudioRef = useRef<HTMLAudioElement | null>(null);
  const exploreAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Stop both to start clean
    if (welcomeAudioRef.current) welcomeAudioRef.current.pause();
    if (exploreAudioRef.current) exploreAudioRef.current.pause();

    if (showWelcome) {
      if (welcomeAudioRef.current) {
        welcomeAudioRef.current.currentTime = 0;
        welcomeAudioRef.current.play().catch(e => console.log('Audio play blocked:', e));
      }
    } else if (!activeGame) {
      if (exploreAudioRef.current) {
        exploreAudioRef.current.currentTime = 0;
        exploreAudioRef.current.play().catch(e => console.log('Audio play blocked:', e));
      }
    }
  }, [showWelcome, activeGame]);

  const handleOpenGame = (game: Game) => {
    setActiveGame(game);
    setPortraitMode(!!game.defaultPortrait);
  };

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <audio ref={welcomeAudioRef} src="/02.mp3" loop />
      <audio ref={exploreAudioRef} src="/05.mp3" loop />
      
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
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 relative flex items-center justify-center shrink-0"
                >
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.8)] z-10" />
                  <div className="absolute w-28 h-6 border-4 border-pink-400/60 rounded-[50%] rotate-[30deg]" />
                  <div className="absolute w-28 h-6 border-4 border-blue-400/40 rounded-[50%] -rotate-[30deg]" />
                </motion.div>
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
                className="flex items-center gap-3 shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 relative flex items-center justify-center shrink-0"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10" />
                  <div className="absolute w-14 h-4 border-2 border-pink-400/60 rounded-[50%] rotate-[30deg]" />
                  <div className="absolute w-14 h-4 border-2 border-blue-400/40 rounded-[50%] -rotate-[30deg]" />
                </motion.div>
                <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 uppercase m-0 leading-none">
                  GALAXY GAMES
                </h1>
              </motion.div>
              
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredGames.length === 0 ? (
                <div className="col-span-full py-20 text-center text-gray-400 font-medium">
                  No games found matching "{searchQuery}"
                </div>
              ) : (
                filteredGames.map((game, i) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring' }}
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
              ))
              )}
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
