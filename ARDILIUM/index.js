let username = "";
let profileImage = "";

// On page load, check if user data exists
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("username");
  const savedImage = localStorage.getItem("profileImage");

  if (savedName && savedImage) {
    username = savedName;
    profileImage = savedImage;

    document.getElementById("login-page").style.display = "none";
    document.getElementById("profile-selection").classList.add("hidden");
    document.getElementById("loading-screen").style.display = "flex";

    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("app").style.display = "block";

      document.getElementById("profileName").textContent = `HI, ${username}`;
      document.getElementById("profilePhoto").src = profileImage;

      showPage("homePage");
    }, 2000);
  }
});

// Handle "Next" button click
document.getElementById("nextBtn").addEventListener("click", () => {
  username = document.getElementById("usernameInput").value.trim();
  if (username !== "") {
    localStorage.setItem("username", username);
    document.getElementById("login-page").style.display = "none";
    document.getElementById("profile-selection").classList.remove("hidden");
  } else {
    alert("Please enter your name.");
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

      document.getElementById("profileName").textContent = `HI, ${username}`;
      document.getElementById("profilePhoto").src = profileImage;

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

  // Show login page and hide app
  document.getElementById("login-page").style.display = "flex";
  document.getElementById("app").style.display = "none";

  // Reset profile name and photo
  document.getElementById("profileName").textContent = "Welcome, ";
  document.getElementById("profilePhoto").src = "";

  // Show the login page to enter name again
  document.getElementById("usernameInput").value = "";
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

let currentStoryIndex = 0;
let currentStorySrc = "";

const stories = [
  { type: "image", src: "q.jpg" },
  { type: "image", src: "netflix.jpg" },
  { type: "image", src: "kirtry.jpg" },
  { type: "image", src: "nani.jpg" },
  { type: "image", src: "akhyakumar.jpg" },
  { type: "image", src: "nabeen.jpg" },
  { type: "image", src: "apple.jpg" }
];

function openStoryViewer(index) {
  currentStoryIndex = index;
  const viewer = document.getElementById("storyViewer");
  viewer.style.display = "flex";
  showStory();
}

function closeStoryViewer() {
  const viewer = document.getElementById("storyViewer");
  viewer.style.display = "none";
  document.getElementById("storyDisplay").innerHTML = "";
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


  // Close on click
  viewer.addEventListener("click", () => {
    viewer.remove();
  });

  document.body.appendChild(viewer);


window.onload = () => {
  loadLikes();
  loadComments();
};

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
  ['post1', 'post2', 'story'].forEach(postId => {
    const count = localStorage.getItem(`likes-${postId}`) || "0";
    const el = document.getElementById(`likes-${postId}`);
    if (el) el.textContent = count;
  });
}

function loadComments() {
  ['post1', 'post2', 'story'].forEach(postId => {
    const comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
    renderComments(postId, comments);
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
  


// Enhanced search functionality with debounce
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', function() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const searchTerm = this.value.trim();
    if (searchTerm) {
      filterPhotos(searchTerm);
    } else {
      showAllPhotos();
    }
  }, 300);
});

function filterPhotos(searchTerm) {
  const photos = document.querySelectorAll('.photo-item');
  photos.forEach(photo => {
    const altText = photo.querySelector('img').alt.toLowerCase();
    if (altText.includes(searchTerm.toLowerCase())) {
      photo.style.display = 'block';
    } else {
      photo.style.display = 'none';
    }
  });
}

function showAllPhotos() {
  document.querySelectorAll('.photo-item').forEach(photo => {
    photo.style.display = 'block';
  });
}

// Photo click handler
document.querySelectorAll('.photo-item').forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    const imgAlt = this.querySelector('img').alt;
    console.log('Opening:', imgAlt, imgSrc);
    // Implement your photo opening logic here
  });
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
    if (video) {
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
  const playPromise = video.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Autoplay prevented:', error);
      // Show UI indication that interaction is needed
      video.parentElement.classList.add('needs-interaction');
    });
  }
}

function pauseVideo(video) {
  video.pause();
  video.currentTime = 0;
  video.parentElement.classList.remove('needs-interaction');
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
