const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result);
        console.log(`Image with public ID ${publicId} has been deleted.`);
    } catch (error) {
        console.error(`Error deleting image: ${error.message}`);
    }
};
