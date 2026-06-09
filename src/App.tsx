import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Gamepad2, X, Plus, Rocket, Globe, Smartphone, Monitor, Search, Settings, Heart } from 'lucide-react';
import { Forum } from './components/Forum';

interface Game {
  id: string;
  name: string;
  url: string;
  image: string;
  color: string;
  defaultPortrait?: boolean;
  description?: string;
  category?: string;
}

const CATEGORIES = ["All", "Favorites", "Action", "Arcade", "Platformer", "Shooter", "Simulation", "Sports", "RPG", "Other"];

const DEFAULT_GAMES: Game[] = [
  {
    id: 'pokemon-silver',
    name: 'Pokémon Silver',
    url: '/pokemon-silver.html',
    image: 'https://images.nintendolife.com/games/gbc/pokemon_silver/cover_large.jpg',
    color: '#C0C0C0',
    description: 'A classic 1999 role-playing game for the Game Boy Color by Game Freak, introducing 100 new Pokémon and the Johto region.',
    category: 'RPG'
  },
  {
    id: 'sonic-robo-blast-2',
    name: 'Sonic Robo Blast 2',
    url: 'https://vinmannie.github.io/srb2web/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/20/2f/27/202f273f-b11d-52b4-6ab5-a0996bf38b47/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#1E90FF',
    description: 'A 3D fan-made Sonic the Hedgehog game originally built on a modified Doom engine, featuring fast-paced platforming.',
    category: 'Platformer'
  },
  {
    id: 'sonic-mania',
    name: 'Sonic Mania',
    url: 'https://vinmannie.github.io/SonicManiaWeb/RSDKv5.html',
    image: 'https://steamcdn-a.akamaihd.net/steam/apps/584400/header.jpg',
    color: '#0000FF',
    description: 'A 2017 platform game honoring the original Sega Genesis Sonic games, featuring remixed classic levels and new zones.',
    category: 'Platformer'
  },
  {
    id: 'fnaf-1',
    name: 'FNAF 1',
    url: 'https://fivenightsatfreddysgame.io/play/five-nights-at-freddys/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9b/77/03/9b77034f-5ade-ddf5-9c2d-48fd8a546c62/AppIcon-1x_U007epad-0-85-220-0.png/512x512bb.jpg',
    color: '#8b0000',
    description: 'The iconic 2014 indie survival horror classic where you work as a night security guard at Freddy Fazbear\'s Pizza.',
    category: 'Other'
  },
  {
    id: 'fnaf-2',
    name: 'FNAF 2',
    url: 'https://fivenightsatfreddysgame.io/play/five-nights-at-freddys-2/',
    image: 'https://steamcdn-a.akamaihd.net/steam/apps/332800/header.jpg',
    color: '#FF8800',
    description: 'The prequel to the original Five Nights at Freddy\'s, introducing new animatronics and removing the security doors.',
    category: 'Other'
  },
  {
    id: 'eaglercraft',
    name: 'Eaglercraft (MC)',
    url: 'https://eaglercraft.q13x.com/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c9/81/16/c981164e-410c-7a07-d76b-3a8e4238793b/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg',
    color: '#a855f7',
    description: 'A fan-made browser-based port of Minecraft version 1.8.8, complete with online multiplayer server support.',
    category: 'Simulation'
  },
  {
    id: 'retro-bowl',
    name: 'Retro Bowl',
    url: '/retrobowl.html',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ef/a7/1d/efa71d1e-7304-e890-a09c-72edaa3f6580/AppIcon-0-0-1x_U007emarketing-0-8-0-0-85-220.png/512x512bb.jpg',
    color: '#4B3621',
    description: 'A retro-styled American football game inspired by Tecmo Bowl, emphasizing roster management and arcade gameplay.',
    category: 'Sports'
  },
  {
    id: 'slope',
    name: 'Slope',
    url: 'https://brunoiscool2.github.io/unblockedgames/play/slope/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/1a/bd/65/1abd65ad-c663-0b81-daa0-ed8d5d9ce3cb/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
    color: '#00FA9A',
    description: 'A fast-paced 3D endless runner where you steer a rolling ball down a steep, randomized neon track.',
    category: 'Arcade'
  },
  {
    id: 'subway-surfers',
    name: 'Subway Surfers',
    url: 'https://subwaysurfers.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2c/b6/06/2cb606cd-7784-07bf-2c3a-e3ba376dec68/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#facc15',
    defaultPortrait: true,
    description: 'A highly popular 2012 endless runner where you dodge trains, swipe obstacles, and collect coins on hoverboards.',
    category: 'Arcade'
  },
  {
    id: 'fnf',
    name: 'Friday Night Funkin\'',
    url: 'https://brunoiscool2.github.io/fnf/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/7f/40/e9/7f40e93d-18b8-a9f7-f98f-8bcb0c219ed9/AppIcon-0-0-1x_U007emarketing-0-11-0-P3-85-220.png/512x512bb.jpg',
    color: '#FF1493',
    description: 'A 2020 open-source rhythm game featuring catchy rap battles, memorable characters, and a massive modding community.',
    category: 'Arcade'
  },
  {
    id: 'geometry-dash',
    name: 'Geometry Dash',
    url: 'https://web-dashers.github.io/',
    image: 'https://steamcdn-a.akamaihd.net/steam/apps/322170/header.jpg',
    color: '#00FFFF',
    description: 'A challenging 2013 rhythm-based platformer where you jump and fly your icon through danger to upbeat electronic music.',
    category: 'Platformer'
  },
  {
    id: 'shell-shockers',
    name: 'Shell Shockers',
    url: 'https://shellshock.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/11/b0/d6/11b0d6e0-3e89-0dfd-b445-7d299d00b33f/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#facc15',
    description: 'A unique multiplayer first-person shooter where you play as an egg equipped with an arsenal of varied weaponry.',
    category: 'Shooter'
  },
  {
    id: 'smash-karts',
    name: 'Smash Karts',
    url: 'https://smashkarts.com/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/20/b3/08/20b3085b-14b3-a0bf-3e58-c4cc7ffaa048/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#39ff14',
    description: 'A multiplayer 3D kart racing game featuring weapons, chaotic power-ups, and intense arena battles.',
    category: 'Action'
  },
  {
    id: 'paper-io-2',
    name: 'Paper.io 2',
    url: 'https://paper-io.com/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c9/d7/80/c9d78046-a119-b893-eace-abf59653e560/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#FF00FF',
    description: 'A competitive territory-capturing game where you draw shapes to expand your color across a shared flat arena.',
    category: 'Arcade'
  },
  {
    id: 'drive-mad',
    name: 'Drive Mad',
    url: 'https://brunoiscool2.github.io/games1/drivemad/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3b/0a/e1/3b0ae123-071f-b60d-9434-1bf69a7552af/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#FF8C00',
    description: 'A quirky physics-based driving game where you navigate wacky 4x4 vehicles over blocky, challenging terrain.',
    category: 'Action'
  },
  {
    id: 'snake-io',
    name: 'Snake.io',
    url: 'https://brunoiscool2.github.io/games3/snakeio/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/84/53/31/845331ee-e088-5438-377b-b82d60845e93/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#00FF00',
    description: 'A modernized competitive version of the classic Snake game featuring multiplier elements and customizable skins.',
    category: 'Arcade'
  },
  {
    id: 'tomb-of-the-mask',
    name: 'Tomb of the Mask',
    url: 'https://beta-brunysixl-v3.onrender.com/games/selfhosted/tombofthemask/index.html',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4c/b3/8e/4cb38eef-73f9-fd90-94d7-a8dcbd90ab32/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#FFD700',
    defaultPortrait: true,
    description: 'A fast-paced retro arcade game where you swipe to move a masked explorer through winding vertical labyrinths.',
    category: 'Arcade'
  },
  {
    id: '2v2-io',
    name: '2v2.io',
    url: 'https://2v2.io/',
    image: 'https://2v2.io/favicon/android-chrome-512x512.png',
    color: '#ff3366',
    description: 'A multiplayer tactical browser game featuring intense team-based 2v2 competitive gameplay.',
    category: 'Action'
  },
  {
    id: 'basket-random',
    name: 'Basket Random',
    url: 'https://2048taylorswift.github.io/basketrandom/',
    image: 'https://play-lh.googleusercontent.com/gP8T5Z1O-ngxIloiwcBZzrzyLPYDp0R_1BDNKUDZboIRPVImeyWI8-7aExvB9gAGNKc=w512',
    color: '#ff8c00',
    description: 'A hilarious physics-based basketball game where you try to score with wacky characters and unpredictable controls.',
    category: 'Sports'
  },
  {
    id: 'flappy-bird',
    name: 'Floppy Bird',
    url: 'https://nebezb.com/floppybird/',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png',
    color: '#ff3366',
    defaultPortrait: true,
    description: 'A simple, highly addictive endless sidescroller inspired by the 2013 mobile hit Flappy Bird, testing reaction speed.',
    category: 'Arcade'
  },
  {
    id: 'monkey-mart',
    name: 'Monkey Mart',
    url: 'https://monkey-mart.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5c/09/44/5c094471-f115-c8b9-6df0-559630eebc4e/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    color: '#8b4513',
    description: 'An idle tycoon arcade game where you slowly build, manage, and expand a supermarket run entirely by monkeys.',
    category: 'Simulation'
  },
  {
    id: 'crossy-road',
    name: 'Crossy Road',
    url: 'https://crossy-road.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/1f/f3/9c/1ff39cc7-a4af-4d4a-e8af-b3bdcb9028a9/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#39ff14',
    defaultPortrait: true,
    description: 'A 2014 voxel-style arcade game inspired by Frogger, challenging players to relentlessly cross treacherous rivers and highways.',
    category: 'Arcade'
  },
  {
    id: 'bitlife',
    name: 'BitLife',
    url: 'https://bitlifefree.io/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/83/17/fe/8317feb8-8517-f350-40e4-cc547f732210/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
    color: '#ff3366',
    defaultPortrait: true,
    description: 'A popular text-based life simulation game where every narrative choice you make dictates your character\'s timeline.',
    category: 'Simulation'
  },
  {
    id: 'rooftop-snipers',
    name: 'Rooftop Snipers',
    url: 'https://jasongamesdev.github.io/rooftop-snipers/',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple117/v4/5b/d1/d4/5bd1d492-2a77-7924-93dd-97685f1ce8b8/mzl.rbxmiwkz.png/512x512bb.jpg',
    color: '#eb4034',
    description: 'Rooftop Snipers is a chaotic 2-player pixelated shooter where you try to knock your opponent off the roof.',
    category: 'Shooter'
  }
];

const FIREWATCH_THEME = { id: 'firewatch', color1: '#fc8f3d', color2: '#2a111a', wave: 'rgba(252,143,61,0.05)' };

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <span className="text-xl font-light opacity-90 text-white">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

const GameCard = React.memo(({ game, i, onOpen, isFavorite, onToggleFavorite }: { game: Game, i: number, onOpen: (g: Game) => void, isFavorite: boolean, onToggleFavorite: () => void }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: 1, 
        x: 0 
      }}
      transition={{ 
        opacity: { delay: i * 0.05, duration: 0.4 },
        x: { delay: i * 0.05, duration: 0.4 }
      }}
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col cursor-pointer shrink-0 z-10 hover:z-50"
      onClick={() => onOpen(game)}
    >
      <div 
        className="w-32 h-32 sm:w-40 sm:h-40 relative bg-gray-900 shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-2 border-transparent group-hover:border-white transition-all duration-200"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 z-0 bg-blue-900/20 animate-pulse" />
        )}
        <img 
          src={game.image} 
          alt={game.name} 
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        {/* Shadow inner overlay on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 pointer-events-none transition-colors duration-200 z-10" />
      </div>
      
      <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-white text-md font-medium tracking-wide truncate max-w-[120px] sm:max-w-[140px]">
          {game.name}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className="p-1 rounded-full hover:bg-white/20 transition-all z-[100]"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-blue-500 text-blue-500' : 'text-white/70'}`} />
        </button>
      </div>

      {game.description && (
        <div className="absolute top-[125%] left-0 w-72 p-4 bg-[#2a111a] text-[#fc8f3d] text-sm border-2 border-[#fc8f3d] shadow-[4px_4px_0_0_rgba(252,143,61,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 font-mono overflow-hidden">
          {/* Retro scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#fc8f3d]/50">
              <span className="block w-2 h-2 bg-[#fc8f3d] animate-pulse rounded-none"></span>
              <span className="uppercase tracking-widest font-bold text-xs">{game.name}</span>
            </div>
            <p className="leading-relaxed opacity-90 text-xs mb-3 text-white/90 font-sans">{game.description}</p>
            <div className="flex justify-between items-center text-[10px] opacity-70 uppercase tracking-widest text-[#fc8f3d]">
              <span>ROM_DATA</span>
              <span>[{game.category}]</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
});

const BackgroundTheme = React.memo(({ theme }: { theme: any }) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1] transition-colors duration-1000 overflow-hidden"
    >
      <motion.img 
        src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/383870/589f62a8f5867c5d4966bb857e736928b7d208b2/page_bg_raw.jpg?t=1755789801"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: [1.05, 1.1, 1.05], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a111a] via-[#be4f3c]/20 to-transparent" />
      <div className="absolute inset-0 bg-[#be4f3c] mix-blend-overlay opacity-30" />
    </div>
  );
});

export default function App() {
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [portraitMode, setPortraitMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ps4-favorites') || '[]');
    } catch {
      return [];
    }
  });

  const [hasInteracted, setHasInteracted] = useState(false);
  const welcomeAudioRef = useRef<HTMLAudioElement | null>(null);
  const exploreAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!hasInteracted) return;

    if (welcomeAudioRef.current) welcomeAudioRef.current.pause();
    if (exploreAudioRef.current) exploreAudioRef.current.pause();

    const playAudio = async (audioElement: HTMLAudioElement) => {
      try {
        audioElement.currentTime = 0;
        await audioElement.play();
      } catch (e) {
        console.warn('Audio playback failed');
      }
    };

    if (!activeGame) {
      if (exploreAudioRef.current) {
        playAudio(exploreAudioRef.current);
      }
    }
  }, [activeGame, hasInteracted]);

  useEffect(() => {
    localStorage.setItem('ps4-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const handleOpenGame = (game: Game) => {
    setActiveGame(game);
    setPortraitMode(!!game.defaultPortrait);
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                            (selectedCategory === 'Favorites' ? favorites.includes(game.id) : game.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });


  return (
    <>
      <audio ref={welcomeAudioRef} src="https://jetta.vgmtreasurechest.com/soundtracks/ps-vita-system-music/lqxqkbet/02.%20Home%20Screen.mp3" loop />
      <audio ref={exploreAudioRef} src="https://jetta.vgmtreasurechest.com/soundtracks/ps-vita-system-music/beryrota/05.%20PlayStation%20Store%20-%20Main%20Theme.mp3" loop />

      <AnimatePresence>
        {!hasInteracted && (
          <motion.div 
            key="lockscreen"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => {
              setHasInteracted(true);
            }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              transition: { duration: 0.5 }
            }}
          >
            <div className="absolute top-8 left-12">
               <Clock />
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 1 }}
              className="flex flex-col items-center backdrop-blur-sm bg-black/10 p-12 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full border-4 border-white/80 flex items-center justify-center mb-8 bg-gradient-to-br from-[#fc8f3d] to-[#be4f3c] shadow-[0_0_20px_rgba(252,143,61,0.5)]">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <h2 className="text-white text-3xl font-light mb-12 tracking-wide drop-shadow-md">Welcome Back to Galaxy-Games</h2>
              
              <div className="flex items-center gap-3 animate-pulse text-white/90">
                <span className="text-xl font-light tracking-widest text-[#fc8f3d]">Click</span>
                <span className="text-xl font-light tracking-widest">to start</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackgroundTheme theme={FIREWATCH_THEME} />

      {/* Main Content */}
      <AnimatePresence>
        {!activeGame && hasInteracted && (
          <motion.div 
            key="maingrid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 0.4 }}
            className="min-h-screen relative z-10 flex flex-col pt-10"
          >
            <header className="flex justify-between items-start px-12 relative z-10 w-full mb-12">
              <div className="flex items-center gap-12 flex-1 relative">
                <div 
                  className="w-full overflow-x-auto no-scrollbar py-2"
                  style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)' }}
                >
                  <div className="flex items-center gap-8 px-8">
                    {CATEGORIES.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-lg transition-colors font-light tracking-wide shrink-0 ${
                          selectedCategory === category 
                            ? 'text-white font-medium border-b-2 border-white pb-1' 
                            : 'text-white/50 hover:text-white/80'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8 pl-8">
                <div className="relative w-64 shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#2a111a]/50 border border-[#fc8f3d]/20 rounded-full py-2 pl-10 pr-4 text-white text-sm placeholder-white/40 focus:outline-none focus:bg-[#4a1f2d]/80 focus:border-[#fc8f3d]/50 transition-all font-mono"
                  />
                </div>
                <div className="flex items-center gap-4 shrink-0 text-[#fc8f3d]/90 font-mono">
                  <div className="w-8 h-8 rounded-full border-2 border-[#fc8f3d]/50 bg-[#be4f3c]/20 flex items-center justify-center shadow-[0_0_10px_rgba(252,143,61,0.2)]">
                     <span className="text-[#fc8f3d] text-xs font-bold font-sans">G</span>
                  </div>
                  <Clock />
                </div>
              </div>
            </header>

            <div className="flex-1 w-full flex items-center px-12 min-h-[400px]">
              <div className="w-full overflow-x-auto no-scrollbar pt-12 pb-4 scroll-smooth">
                <div className="flex gap-4 min-w-max pb-[280px] px-4" style={{ minWidth: 'min-content' }}>
                  {filteredGames.length === 0 ? (
                    <div className="w-full py-20 text-white/50 font-light text-xl pl-8">
                      {selectedCategory === 'Favorites' ? "No favorites found." : "No games match your search."}
                    </div>
                  ) : (
                    filteredGames.map((game, i) => (
                      <GameCard 
                        key={game.id} 
                        game={game} 
                        i={i} 
                        onOpen={handleOpenGame} 
                        isFavorite={favorites.includes(game.id)}
                        onToggleFavorite={() => toggleFavorite(game.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-auto px-12 pb-8">
              <Forum />
            </div>
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
            className="fixed inset-0 z-50 bg-transparent flex flex-col items-center overflow-x-hidden"
          >
            {/* Game Player Fullscreen Theme */}
            <div className="flex items-center justify-between px-8 py-4 bg-[#2a111a]/80 border-b border-[#be4f3c]/20 backdrop-blur-2xl w-full shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-[#fc8f3d] to-[#be4f3c] rounded-full flex items-center justify-center border-2 border-white/80 shadow-[0_0_15px_rgba(252,143,61,0.4)]">
                   <Gamepad2 className="w-6 h-6 text-white drop-shadow-md" />
                 </div>
                 <h2 className="text-2xl font-light tracking-wide text-white drop-shadow-md uppercase">
                  {activeGame.name}
                 </h2>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPortraitMode(!portraitMode)}
                  className="px-5 py-2.5 bg-[#be4f3c]/20 rounded-full border border-[#fc8f3d]/40 hover:bg-[#be4f3c]/40 font-semibold text-xs transition-all flex items-center gap-2 text-[#fc8f3d] hidden sm:flex cursor-pointer shadow-[0_0_10px_rgba(252,143,61,0.1)] backdrop-blur-md"
                >
                  {portraitMode ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  {portraitMode ? 'Landscape' : 'Portrait'}
                </motion.button>
                <a 
                  href={activeGame.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#be4f3c]/20 rounded-full border border-[#fc8f3d]/40 hover:bg-[#fc8f3d]/30 font-semibold text-xs transition-all flex items-center gap-2 text-[#fc8f3d] cursor-pointer shadow-[0_0_15px_rgba(252,143,61,0.2)] backdrop-blur-md"
                >
                  Open in Browser <Globe className="w-4 h-4" />
                </a>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveGame(null)}
                  className="bg-[#2a111a]/60 hover:bg-[#be4f3c] text-white rounded-full p-2.5 cursor-pointer border border-[#fc8f3d]/40 shadow-[0_0_15px_rgba(252,143,61,0.2)] backdrop-blur-md transition-all"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
            
            <div className={`flex-1 w-full relative flex justify-center items-center overflow-hidden ${portraitMode ? 'p-0 sm:p-6 md:p-12' : ''}`}>
              <BackgroundTheme theme={FIREWATCH_THEME} />
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
