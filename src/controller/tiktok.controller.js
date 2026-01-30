// backend/src/controller/tiktok.controller.js
import axios from "axios";

export const downloadVideo = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Please provide a TikTok video URL",
      });
    }

    const apiUrl = `https://www.tikwm.com/api/?url=${url}`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.code === 0) {
      return res.status(200).json({
        success: true,
        data: {
          id: data.data.id,
          title: data.data.title,
          author: {
            nickname: data.data.author.nickname,
            unique_id: data.data.author.unique_id,
            avatar: data.data.author.avatar,
          },

          downloads: {
            video: data.data.play,
            music: data.data.music,
            thumbnail: data.data.cover,
          },

          stats: {
            plays: data.data.play_count,
            likes: data.data.digg_count,
            comments: data.data.comment_count,
          },
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch video. Check the URL.",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const streamFile = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).send("No URL provided");

    // ফাইলটি স্ট্রিম হিসেবে আনা হচ্ছে
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "stream",
    });

    // ব্রাউজারকে বলা হচ্ছে এটি একটি ডাউনলোড ফাইল
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tiktok-download.mp4"',
    );

    // ফাইলটি পাইপ করে ফ্রন্টএন্ডে পাঠানো হচ্ছে
    response.data.pipe(res);
  } catch (error) {
    console.error("Stream Error:", error);
    res.status(500).send("Failed to stream file");
  }
};
