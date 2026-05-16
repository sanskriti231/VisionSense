module.exports = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: "Invalid file type" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ error: "File too large (max 5MB)" });
    }

    next();
};
