let username = "";
let profileImage = "";

// On page load, check if user data exists
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("username");
  const savedImage = localStorage.getItem("profileImage");

  if (savedName && savedImage) {
    username = savedName;
    profileImage = savedImage;

    document.getElementById("auth-page").style.display = "none";
    document.getElementById("profile-selection").classList.add("hidden");
    document.getElementById("loading-screen").style.display = "flex";

    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("app").style.display = "block";

      document.getElementById("profileName").textContent = `HI, ${username}`;
      document.getElementById("profilePhoto").src = profileImage;

      // Initialize data when entering the app from cache
      initializeAppData();

      showPage("homePage");
    }, 2000);
  }
});


// Profile image selection
const profileChoices = document.querySelectorAll(".profile-choice");
profileChoices.forEach(img => {
  img.addEventListener("click", () => {
    profileImage = img.dataset.img;
    localStorage.setItem("profileImage", profileImage);

    document.getElementById("profile-selection").classList.add("hidden");
    document.getElementById("loading-screen").style.display = "flex";

    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("app").style.display = "block";

      username = localStorage.getItem("username") || "User";
      document.getElementById("profileName").textContent = `HI, ${username}`;
      document.getElementById("profilePhoto").src = profileImage;

      // Initialize data when entering the app
      initializeAppData();

      showPage("homePage");
    }, 2000);
  });
});

// Page navigation
const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.add("hidden");
    page.classList.remove("active");
  });

  const currentPage = document.getElementById(pageId);
  if (currentPage) {
    currentPage.classList.remove("hidden");
    currentPage.classList.add("active");
  }
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;

    navButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.classList.remove("active-with-circle");
    });

    button.classList.add("active");
    button.classList.add("active-with-circle");

    showPage(pageId);
  });
});

// Message icon navigation (fix)
document.getElementById("messageBtn").addEventListener("click", () => {
  navButtons.forEach(btn => {
    btn.classList.remove("active");
    btn.classList.remove("active-with-circle");
  });
  showPage("messagesPage"); // Ensure you have the "messagesPage" section in HTML
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  // Clear localStorage
  localStorage.removeItem("username");
  localStorage.removeItem("profileImage");

  // Show auth page and hide app
  document.getElementById("auth-page").style.display = "flex";
  document.getElementById("app").style.display = "none";

  if (window.firebaseSignOut && window.firebaseAuth) {
    window.firebaseSignOut(window.firebaseAuth);
  }

  // Reset profile name and photo
  document.getElementById("profileName").textContent = "Welcome, ";
  document.getElementById("profilePhoto").src = "";
});

// Dark mode toggle functionality
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save dark mode preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

// Check dark mode preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "enabled") {
    document.body.classList.add("dark-mode");
  }
});

const randomNames = ["nani", "kriti_shetty", "akshaya", "naveen", "apple", "netflix", "ardilium", "john_doe", "jane_smith", "traveler_joe"];
const randomCaptions = ["Welcome to my world!", "Behind the scenes 🎬", "Natural star ✨", "Streaming now!", "Shot on iPhone", "Amazing day!", "Love this view 😍", "Good vibes only! ✌️"];

// Function to get a random high-quality image URL from Unsplash Source
function getRandomImage() {
  const seed = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/seed/${seed}/800/800`;
}

// Function to get a random video URL
function getRandomVideo() {
  const videos = [
    { type: "local", src: "kirty.mp4" },
    { type: "local", src: "nani.mp4" },
    { type: "local", src: "q.mp4" },
    { type: "local", src: "elementa.mp4" },
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
  return videos[Math.floor(Math.random() * videos.length)];
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDynamicPosts(count) {
  const posts = [];
  for (let i = 0; i < count; i++) {
    const isVideo = Math.random() > 0.7; // 30% chance for video
    const videoData = isVideo ? getRandomVideo() : null;
    
    posts.push({
      id: `dyn_post_${i}_${Date.now()}`,
      type: isVideo ? videoData.type : "image",
      src: isVideo ? (videoData.src || "") : getRandomImage(),
      videoId: isVideo ? (videoData.videoId || "") : "",
      username: getRandomItem(randomNames),
      userImg: getRandomImage(),
      caption: getRandomItem(randomCaptions),
      likes: Math.floor(Math.random() * 10000)
    });
  }
  return posts;
}

function generateDynamicReels(count) {
  const reels = [];
  for (let i = 0; i < count; i++) {
    const videoData = getRandomVideo();
    reels.push({
      id: `dyn_reel_${i}_${Date.now()}`,
      type: videoData.type,
      src: videoData.src || "",
      videoId: videoData.videoId || "",
      username: getRandomItem(randomNames),
      userImg: getRandomImage(),
      likes: `${(Math.random() * 100).toFixed(1)}k`,
      comments: Math.floor(Math.random() * 5000)
    });
  }
  return reels;
}

const mockStories = [
  { id: 0, type: "image", src: getRandomImage(), username: getRandomItem(randomNames) },
  { id: 1, type: "image", src: getRandomImage(), username: getRandomItem(randomNames) },
  { id: 2, type: "image", src: getRandomImage(), username: getRandomItem(randomNames) },
  { id: 3, type: "image", src: getRandomImage(), username: getRandomItem(randomNames) },
  { id: 4, type: "image", src: getRandomImage(), username: getRandomItem(randomNames) },
  { id: 5, type: "image", src: getRandomImage(), username: getRandomItem(randomNames) },
];
const stories = mockStories; // Keep old reference for viewer

let mockPosts = [];
let mockReels = [];

let currentQuery = 'explore';
let currentPostPage = 1;
let currentReelPage = 1;
let isFetching = false;

async function fetchInstagramData(query = 'explore', page = 1, append = false) {
  if (isFetching) return;
  isFetching = true;
  currentQuery = query;
  
  try {
    const res = await fetch(`/api/instagram?q=${encodeURIComponent(query)}&page=${page}`);
    const data = await res.json();
    if (data.success && data.posts && data.reels) {
      if (append) {
        mockPosts = [...mockPosts, ...data.posts];
        mockReels = [...mockReels, ...data.reels];
        renderPosts(true, data.posts);
        renderReels(true, data.reels);
      } else {
        mockPosts = data.posts;
        mockReels = data.reels;
      }
    }
  } catch (e) {
    console.error("Failed to fetch Instagram data from proxy", e);
    // fallback if backend is not running or fails
    const newPosts = generateDynamicPosts(100);
    const newReels = generateDynamicReels(100);
    if (append) {
      mockPosts = [...mockPosts, ...newPosts];
      mockReels = [...mockReels, ...newReels];
      renderPosts(true, newPosts);
      renderReels(true, newReels);
    } else {
      mockPosts = newPosts;
      mockReels = newReels;
    }
  }
  isFetching = false;
}

let currentStoryIndex = 0;
let currentStorySrc = "";

function openStoryViewer(index) {
  currentStoryIndex = index;
  let viewer = document.getElementById("storyViewer");
  if (!viewer) {
    viewer = document.createElement("div");
    viewer.id = "storyViewer";
    viewer.className = "story-viewer-overlay";
    viewer.innerHTML = `
      <div class="story-viewer-content">
        <button class="close-btn" onclick="closeStoryViewer()">×</button>
        <div id="storyDisplay"></div>
      </div>
    `;
    document.body.appendChild(viewer);
  }
  viewer.style.display = "flex";
  showStory();
}

function closeStoryViewer() {
  const viewer = document.getElementById("storyViewer");
  if (viewer) viewer.style.display = "none";
  const display = document.getElementById("storyDisplay");
  if (display) display.innerHTML = "";
}

function showStory() {
  const display = document.getElementById("storyDisplay");
  const story = stories[currentStoryIndex];
  currentStorySrc = story.src;

  display.innerHTML = story.type === "video"
    ? `<video controls autoplay muted style="max-width: 90%; max-height: 90%;"><source src="${story.src}" type="video/mp4"></video>`
    : `<img src="${story.src}" style="max-width: 90%; max-height: 90%;" />`;

  setupVideoAutopause();
  loadLikes();
  loadComments();
}

function setupVideoAutopause() {
  document.addEventListener('play', function (e) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (video !== e.target) {
        video.pause();
      }
    });
  }, true);
}



window.onload = async () => {
  // Only initialize if we are already logged in (checked by localStorage logic above)
  if (localStorage.getItem("username") && localStorage.getItem("profileImage")) {
    // The top-level DOMContentLoaded will call initializeAppData
  } else {
    // We do nothing until they log in or select a profile
    renderStories();
  }
};

/* ================= Reviews Logic ================= */
async function loadGlobalReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container || !window.firebaseDb) return;
  
  try {
    const { collection, getDocs, query, orderBy } = window.firebaseFirestore;
    const q = query(collection(window.firebaseDb, "reviews"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    
    container.innerHTML = '';
    
    if (snapshot.empty) {
      container.innerHTML = '<div class="loading-reviews">No reviews yet. Be the first to leave one!</div>';
      return;
    }
    
    snapshot.forEach(doc => {
      const review = doc.data();
      const date = review.timestamp ? review.timestamp.toDate().toLocaleDateString() : 'Just now';
      
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-card-header">
          <span class="review-author">@${review.username || 'Anonymous'}</span>
          <span class="review-date">${date}</span>
        </div>
        <div class="review-text">${review.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      `;
      container.appendChild(card);
    });
    
  } catch (error) {
    console.error("Error loading reviews:", error);
    container.innerHTML = '<div class="loading-reviews">Failed to load reviews.</div>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const submitReviewBtn = document.getElementById("submitReviewBtn");
  const reviewInput = document.getElementById("reviewInput");
  
  if (submitReviewBtn && reviewInput) {
    submitReviewBtn.addEventListener("click", async () => {
      const text = reviewInput.value.trim();
      if (!text) return;
      
      if (!window.firebaseDb) {
        alert("Database connection not ready.");
        return;
      }
      
      submitReviewBtn.disabled = true;
      submitReviewBtn.textContent = "Posting...";
      
      try {
        const { collection, addDoc, serverTimestamp } = window.firebaseFirestore;
        const username = localStorage.getItem("username") || "Anonymous";
        
        await addDoc(collection(window.firebaseDb, "reviews"), {
          text: text,
          username: username,
          timestamp: serverTimestamp()
        });
        
        reviewInput.value = '';
        await loadGlobalReviews(); // Refresh feed
        
      } catch (error) {
        // Fallback for permissions error if user not fully logged in on backend
        if (error.code === 'permission-denied') {
          alert('You must be logged in to post a review!');
        } else {
          console.error("Error posting review:", error);
          alert("Failed to post review. Please try again.");
        }
      } finally {
        submitReviewBtn.disabled = false;
        submitReviewBtn.textContent = "Post Review";
      }
    });
  }
});

async function initializeAppData() {
  renderStories();
  await fetchInstagramData('explore', 1, false);
  renderPosts();
  renderReels();
  loadLikes();
  loadComments();
  updateSearchGrid();
  loadGlobalReviews();
}

// Load More Functions replacing Infinite Scroll
window.loadMorePosts = async function() {
  const btn = document.getElementById('loadMoreFeedBtn');
  if (btn && !isFetching) {
    btn.textContent = "Loading...";
    currentPostPage++;
    await fetchInstagramData(currentQuery, currentPostPage, true);
    
    loadLikes();
    loadComments();
    
    btn.textContent = "Load More Posts";
  }
};

window.loadMoreReels = async function() {
  const btn = document.getElementById('loadMoreReelsBtn');
  if (btn && !isFetching) {
    btn.textContent = "Loading...";
    currentReelPage++;
    await fetchInstagramData(currentQuery, currentReelPage, true);
    
    // Re-observe newly added reels
    initializeReels(); 
    
    btn.textContent = "Load More Reels";
  }
};

function renderStories() {
  const container = document.getElementById("storyContainer");
  if (!container) return;
  container.innerHTML = mockStories.map((story, index) => `
    <div class="story" onclick="openStoryViewer(${index})">
      <img src="${story.src}" alt="${story.username}" />
    </div>
  `).join("");
}

function renderPosts(append = false, items = mockPosts) {
  const container = document.getElementById("postFeed");
  if (!container) return;
  
  const htmlStr = items.map(post => `
    <div class="post" data-id="${post.id}">
      <div class="post-header">
        <img src="${post.userImg}" alt="${post.username}">
        <span>${post.username}</span>
      </div>
      ${post.type === 'youtube' || post.type === 'video' || post.type === 'local'
        ? `<div class="video-container" onclick="toggleMute(this)">
             <video class="post-img post-video" loop autoplay muted playsinline><source src="${post.src}" /></video>
             <div class="mute-indicator">🔇 Tap to unmute</div>
           </div>` 
        : `<img class="post-img" src="${post.src}" alt="Post" />`
      }
      <div class="post-actions">
        <svg aria-label="Like" onclick="likePost('${post.id}')" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.543 1.117 1.543s.277-.368 1.117-1.543a4.21 4.21 0 0 1 3.675-1.941" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
        <svg aria-label="Comment" onclick="toggleCommentBox(this.parentElement.parentElement)" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
        <svg aria-label="Share" onclick="sharePost('${post.src}')" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
        <svg aria-label="Save" class="save-btn" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
      </div>
      <div class="post-likes" id="likes-${post.id}">${post.likes} likes</div>
      <div class="post-caption">
        <span>${post.username}</span> ${post.caption}
      </div>
      <div class="comments">
        <div class="comment-list" id="comments-${post.id}"></div>
        <input type="text" placeholder="Add a comment..." onkeydown="addComment(event, this, '${post.id}')" />
      </div>
    </div>
  `).join("");

  if (append) {
    container.insertAdjacentHTML('beforeend', htmlStr);
  } else {
    container.innerHTML = htmlStr;
  }
}

function renderReels(append = false, items = mockReels) {
  const container = document.getElementById("reelsContainer");
  if (!container) return;
  
  const htmlStr = items.map(reel => `
    <div class="reel" onclick="toggleMute(this)">
      <video class="reel-video" loop autoplay muted playsinline>
        <source src="${reel.src}" type="video/mp4">
      </video>
      <div class="mute-indicator">🔇 Tap to unmute</div>
      <div class="reel-actions">
        <button class="reel-action-btn" onclick="likeReel(this)">
          <span class="icon">❤️</span>
          <span class="count">${reel.likes}</span>
        </button>
        <button class="reel-action-btn" onclick="toggleReelComment(this)">
          <span class="icon">💬</span>
          <span class="count">${reel.comments}</span>
        </button>
        <button class="reel-action-btn" onclick="shareReel(this)">
          <span class="icon">↗️</span>
        </button>
        <button class="reel-action-btn" onclick="saveReel(this)">
          <span class="icon">🔖</span>
        </button>
      </div>
      <div class="reel-user-info">
        <img src="${reel.userImg}" alt="User" class="reel-user-avatar">
        <span class="reel-username">${reel.username}</span>
      </div>
    </div>
  `).join("");

  if (append) {
    container.insertAdjacentHTML('beforeend', htmlStr);
  } else {
    container.innerHTML = htmlStr;
  }
}

function openMedia(src, isVideo = false) {
  const win = window.open("", "_blank");
  win.document.write(isVideo
    ? `<video controls autoplay style="width:100%"><source src="${src}"></video>`
    : `<img src="${src}" style="width:100%">`);
}

function likePost(postId) {
  let likes = parseInt(localStorage.getItem(`likes-${postId}`) || "0");
  likes++;
  localStorage.setItem(`likes-${postId}`, likes);
  document.getElementById(`likes-${postId}`).textContent = likes;
}

function toggleCommentBox(container) {
  const box = container.querySelector('.comments');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function addComment(event, input, postId) {
  if (event.key === "Enter" && input.value.trim()) {
    const text = input.value.trim();
    let comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
    comments.push(`${profileName}: ${text}`);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));
    renderComments(postId, comments);
    input.value = '';
  }
}

function renderComments(postId, comments) {
  const list = document.getElementById(`comments-${postId}`);
  if (!list) return;
  list.innerHTML = '';
  comments.forEach(c => {
    const div = document.createElement('div');
    div.textContent = c;
    list.appendChild(div);
  });
}

function loadLikes() {
  mockPosts.forEach(post => {
    const memCount = localStorage.getItem(`likes-${post.id}`);
    const el = document.getElementById(`likes-${post.id}`);
    if (el) {
      el.textContent = memCount ? `${memCount} likes` : `${post.likes} likes`;
    }
  });
}

function loadComments() {
  mockPosts.forEach(post => {
    const comments = JSON.parse(localStorage.getItem(`comments-${post.id}`)) || [];
    renderComments(post.id, comments);
  });
}

function scrollStories(dir) {
  const container = document.getElementById("storyContainer");
  container.scrollBy({ left: dir * 200, behavior: "smooth" });
}

// Story Viewer Logic
function openStoryViewer(index) {
  currentStoryIndex = index;
  const viewer = document.getElementById("storyViewer");
  viewer.style.display = "flex";
  showStory();
}

function closeStoryViewer() {
  document.getElementById("storyViewer").style.display = "none";
}

function showStory() {
  const display = document.getElementById("storyDisplay");
  const story = stories[currentStoryIndex];
  currentStorySrc = story.src;

  display.innerHTML = story.type === "video"
    ? `<video controls autoplay><source src="${story.src}"></video>`
    : `<img src="${story.src}" />`;

  loadLikes();
  loadComments();
}

function navigateStory(offset) {
  currentStoryIndex += offset;
  if (currentStoryIndex < 0) currentStoryIndex = stories.length - 1;
  if (currentStoryIndex >= stories.length) currentStoryIndex = 0;
  showStory();
}

function sharePost(src) {
  navigator.clipboard.writeText(src).then(() => {
    alert("Link copied to clipboard!");
  });
}

// Pause other videos when one starts playing
function setupVideoAutopause() {
    document.addEventListener('play', function(e) {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (video !== e.target) {
          video.pause();
        }
      });
    }, true); // Use capture phase to catch events earlier
  }
  

  function showStory() {
    const display = document.getElementById("storyDisplay");
    const story = stories[currentStoryIndex];
    currentStorySrc = story.src;
  
    display.innerHTML = story.type === "video"
      ? `<video controls autoplay muted><source src="${story.src}" type="video/mp4"></video>`
      : `<img src="${story.src}" />`;
  
    setupVideoAutopause(); // Ensure only one video plays at a time
    loadLikes();
    loadComments();
  }
  
  function closeStoryViewer() {
    const viewer = document.getElementById("storyViewer");
    viewer.style.display = "none";
  
    // Clear the video or image to stop any media from playing
    document.getElementById("storyDisplay").innerHTML = "";
  }
  


// Enhanced search functionality with backend fetching
// Enhanced search functionality with backend fetching
function updateSearchGrid(searchTerm = 'explore') {
  const grid = document.querySelector('.photo-grid');
  if (grid) {
    // If we're using mock fallback images, ensure the search term forces the seed to match
    const finalPosts = mockPosts.length > 0 ? mockPosts : Array.from({length: 12}).map((_, i) => ({
      src: `https://picsum.photos/seed/${searchTerm}${i}/800/800`,
      caption: `Exploring ${searchTerm}`
    }));
    
    grid.innerHTML = finalPosts.map(post => `
      <div class="photo-item" onclick="alert('Opening: ${post.caption}')">
        <img src="${post.src}" alt="${post.caption}" loading="lazy">
        <div class="photo-overlay">${searchTerm}</div>
      </div>
    `).join('');
  }
}

let searchTimeout;
document.getElementById('searchInput').addEventListener('input', function() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    const searchTerm = this.value.trim() || 'explore';
    currentPostPage = 1;
    currentReelPage = 1;
    await fetchInstagramData(searchTerm, 1, false);
    
    renderPosts();
    renderReels();
    updateSearchGrid(searchTerm);
    initializeReels(); // Reset observer for new reels
    
    // Jump to top
    document.getElementById('postFeed').scrollIntoView();
  }, 500);
});



// Reels functionality
let currentPlayingReel = null;

function initializeReels() {
  const reelContainer = document.querySelector('.reel-container');
  if (!reelContainer) return;

  // Set up intersection observer
  const observer = new IntersectionObserver(
    handleReelVisibility, 
    {
      root: reelContainer,
      threshold: 0.8,
      rootMargin: '0px'
    }
  );

  // Observe all reels
  document.querySelectorAll('.reel').forEach(reel => {
    observer.observe(reel);
    const video = reel.querySelector('.reel-video');
    if (video && !video.hasAttribute('playsinline')) {
      video.muted = true; // Mute by default for autoplay
      video.playsInline = true; // For iOS
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
    }
  });

  // Handle manual play when needed
  document.querySelectorAll('.reel').forEach(reel => {
    reel.addEventListener('click', handleReelClick);
  });
}

function handleReelVisibility(entries) {
  entries.forEach(entry => {
    const video = entry.target.querySelector('.reel-video');
    if (!video) return;

    if (entry.isIntersecting) {
      // Pause current video if different
      if (currentPlayingReel && currentPlayingReel !== video) {
        pauseVideo(currentPlayingReel);
      }
      
      // Play the new video
      playVideo(video);
      currentPlayingReel = video;
    } else {
      // Only pause if it's the current playing video
      if (video === currentPlayingReel) {
        pauseVideo(video);
        currentPlayingReel = null;
      }
    }
  });
}

function playVideo(video) {
  if (!video || video.tagName !== 'VIDEO') return;
  
  const playPromise = video.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Autoplay prevented:', error);
      // Show UI indication that interaction is needed
      if (video.parentElement) {
        video.parentElement.classList.add('needs-interaction');
      }
    });
  }
}

function pauseVideo(video) {
  if (video && video.tagName === 'VIDEO') {
    video.pause();
    video.currentTime = 0;
    video.muted = true; // Force mute when scrolled away
    if (video.parentElement) {
      video.parentElement.classList.remove('needs-interaction');
      
      // Reset mute indicator explicitly
      const indicator = video.parentElement.querySelector('.mute-indicator');
      if (indicator) {
        indicator.textContent = '🔇 Tap to unmute';
        indicator.style.opacity = '1';
        setTimeout(() => { if (video.muted) indicator.style.opacity = '0'; }, 2000);
      }
    }
  }
}

function handleReelClick(event) {
  const reel = event.currentTarget;
  const video = reel.querySelector('.reel-video');
  
  // Only handle if this reel needs interaction
  if (reel.classList.contains('needs-interaction')) {
    playVideo(video);
    reel.classList.remove('needs-interaction');
  }
}

// Initialize when reels page is shown
document.addEventListener('DOMContentLoaded', () => {
  // Set up observer to detect when reels page becomes visible
  const observer = new MutationObserver((mutations) => {
    const reelsPage = document.getElementById('reelsPage');
    if (reelsPage && !reelsPage.classList.contains('hidden')) {
      initializeReels();
    }
  });

  const reelsPage = document.getElementById('reelsPage');
  if (reelsPage) {
    observer.observe(reelsPage, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // Also initialize if already visible
  if (reelsPage && !reelsPage.classList.contains('hidden')) {
    initializeReels();
  }
});

// Clean up when switching tabs
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentPlayingReel) {
      pauseVideo(currentPlayingReel);
      currentPlayingReel = null;
    }
  });
});

// Reel interaction functions
function likeReel(button) {
  const countEl = button.querySelector('.count');
  if (!countEl) return;
  
  const currentCount = parseInt(countEl.textContent.replace(/\D/g, ''));
  const isLiked = button.classList.contains('liked');
  
  button.classList.toggle('liked');
  countEl.textContent = isLiked ? 
    formatNumber(currentCount - 1) : 
    formatNumber(currentCount + 1);
}

function toggleReelComment() {
  alert('Comments would open here');
}

function shareReel() {
  alert('Share options would appear here');
}

function saveReel(button) {
  const textEl = button.querySelector('.text');
  const iconEl = button.querySelector('.icon');
  
  if (button.classList.contains('saved')) {
    button.classList.remove('saved');
    textEl.textContent = 'Save';
    iconEl.textContent = '🔖';
  } else {
    button.classList.add('saved');
    textEl.textContent = 'Saved';
    iconEl.textContent = '✔️';
  }
}

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

function toggleMute(container) {
  const video = container.querySelector('video');
  const indicator = container.querySelector('.mute-indicator');
  if (video) {
    video.muted = !video.muted;
    if (indicator) {
      if (video.muted) {
        indicator.textContent = '🔇 Tap to unmute';
        indicator.style.opacity = '1';
        setTimeout(() => { if (video.muted) indicator.style.opacity = '0'; }, 2000);
      } else {
        indicator.textContent = '🔊';
        indicator.style.opacity = '1';
        setTimeout(() => { indicator.style.opacity = '0'; }, 1000);
      }
    }
  }
}
