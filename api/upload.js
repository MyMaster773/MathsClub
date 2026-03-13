// api/upload.js
export default async function handler(req, res) {
    // Only allow POST requests for security
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { image } = req.body; // This is the Base64 string from the admin panel

        if (!image) {
            return res.status(400).json({ success: false, message: "No image data provided" });
        }

        // Use the API key from Vercel Environment Variables
        const apiKey = process.env.IMGBB_API_KEY; 

        // ImgBB requires URL-encoded form data for Base64 uploads
        const formData = new URLSearchParams();
        formData.append('image', image);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString(),
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}