import instagramDl from 'instagram-url-direct';

export const downloadInstagramVideo = async (req, res) => {
    // Vercel Cache বন্ধ রাখা
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ success: false, message: "URL is required" });
        }

        console.log("Fetching Instagram URL:", url);

        // 🔥 FIX: Import সমস্যার অটোমেটিক সমাধান
        // লাইব্রেরিটি ফাংশন নাকি অবজেক্ট, সেটা চেক করে সঠিক ফাংশনটি নেওয়া হচ্ছে
        let getLinks;
        if (typeof instagramDl === 'function') {
            getLinks = instagramDl;
        } else if (instagramDl.default && typeof instagramDl.default === 'function') {
            getLinks = instagramDl.default;
        } else {
            throw new Error("Library import failed: instagramDl is not a function");
        }

        // লাইব্রেরি কল করা
        const result = await getLinks(url);
        
        console.log("Insta Result Found:", result.results_number); // ডিবাগিং লগ

        // রেজাল্ট ভ্যালিডেশন
        if (!result || !result.url_list || result.url_list.length === 0) {
            return res.status(404).json({ success: false, message: "Video not found or Private Account" });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: Date.now(),
                title: "Instagram Video",
                author: {
                    nickname: "Instagram User",
                    unique_id: "instagram",
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                },
                stats: {
                    plays: 0,
                    likes: 0,
                    comments: 0
                },
                downloads: {
                    video: result.url_list[0], // হাই কোয়ালিটি লিংক
                    music: null,
                    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                },
                cover: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            }
        });

    } catch (error) {
        console.error("Insta Server Error:", error);
        return res.status(500).json({ success: false, message: "Server Error: Failed to fetch video" });
    }
};