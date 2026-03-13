const Reel = require('../models/Reel');
const Story = require('../models/Story');

// Mock data for Instagram reels (since direct API access is restricted)
const mockReels = [
  {
    id: 'reel1',
    url: 'https://example.com/reel1.mp4',
    thumbnail: 'https://example.com/reel1_thumb.jpg',
    caption: 'Amazing sunset! 🌅',
    likes: 1250,
    comments: 45,
    createdAt: new Date(),
  },
  {
    id: 'reel2',
    url: 'https://example.com/reel2.mp4',
    thumbnail: 'https://example.com/reel2_thumb.jpg',
    caption: 'Cooking tutorial 🍳',
    likes: 890,
    comments: 23,
    createdAt: new Date(),
  },
];

// Mock data for Instagram stories
const mockStories = [
  {
    id: 'story1',
    url: 'https://example.com/story1.jpg',
    thumbnail: 'https://example.com/story1_thumb.jpg',
    type: 'image',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    createdAt: new Date(),
  },
  {
    id: 'story2',
    url: 'https://example.com/story2.mp4',
    thumbnail: 'https://example.com/story2_thumb.jpg',
    type: 'video',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
];

// Get Instagram reels
const getReels = async (req, res) => {
  try {
    // In production, fetch from Instagram Graph API
    // For now, return mock data
    res.json({
      success: true,
      data: mockReels,
      message: 'Reels fetched successfully (mock data)',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reels', error: error.message });
  }
};

// Get Instagram stories
const getStories = async (req, res) => {
  try {
    // In production, fetch from Instagram Graph API
    // For now, return mock data
    res.json({
      success: true,
      data: mockStories,
      message: 'Stories fetched successfully (mock data)',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error: error.message });
  }
};

// Refresh content (simulate page refresh)
const refreshContent = async (req, res) => {
  try {
    // In production, this would refresh Instagram content
    // For now, just return success
    res.json({
      success: true,
      message: 'Content refreshed successfully',
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error refreshing content', error: error.message });
  }
};

module.exports = {
  getReels,
  getStories,
  refreshContent,
};