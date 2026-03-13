const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Security middleware to prevent accessing backend files
app.use((req, res, next) => {
  const forbiddenPaths = ['/server.js', '/package.json', '/package-lock.json', '/firestore.rules', '/.env'];
  if (forbiddenPaths.includes(req.path) || req.path.startsWith('/server/')) {
    return res.status(403).send('Forbidden');
  }
  next();
});

// Serve the frontend static files from the root directory
app.use(express.static(__dirname));

// Removed MongoDB and User Schema since Firebase is now handling Authentication on the client side.

// Instagram Scraper Endpoint Proxy
app.get('/api/instagram', async (req, res) => {
  try {
    const query = req.query.q || 'explore';
    const page = parseInt(req.query.page) || 1;
    
    // Fallback/Simulated Data representing Instagram-like content for search term:
    // We use the page number to ensure unique IDs and images when infinite scrolling
    const mockPosts = Array.from({ length: 100 }).map((_, i) => ({
      id: `ig_post_${query}_p${page}_${i}`,
      type: 'image',
      src: `https://picsum.photos/seed/${query}${page}${i}/800/800`,
      username: `${query}_lover_${page}${i}`,
      userImg: `https://picsum.photos/seed/user${page}${i}/100/100`,
      caption: `Exploring ${query} vibes! #instagram #${query}`,
      likes: Math.floor(Math.random() * 5000)
    }));
    
    // User's uploaded videos + Real dummy mp4s
    const extendedVideos = [
      { type: "local", src: "kirty.mp4" },
      { type: "local", src: "nani.mp4" },
      { type: "local", src: "q.mp4" },
      { type: "local", src: "elementa.mp4" },
      // Common public MP4s
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" },
      { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" }
    ];
    
    // Shuffle helper to make it feel organic
    const getShuffledVideo = (index) => extendedVideos[index % extendedVideos.length];
    
    const mockReels = Array.from({ length: 100 }).map((_, i) => {
       const videoData = getShuffledVideo(page * 100 + i); // Spread out uniquely
       return {
         id: `ig_reel_${query}_p${page}_${i}`,
         type: videoData.type,
         src: videoData.src || "", 
         videoId: videoData.videoId || "",
         username: `${query}_creator_${page}${i}`,
         userImg: `https://picsum.photos/seed/user${page}${i+10}/100/100`,
         likes: `${(Math.random() * 100).toFixed(1)}k`,
         comments: Math.floor(Math.random() * 500)
       };
    });

    res.status(200).json({ 
      success: true, 
      query: query,
      page: page,
      posts: mockPosts,
      reels: mockReels
    });

  } catch (error) {
    console.error('Instagram fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch from Instagram' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
