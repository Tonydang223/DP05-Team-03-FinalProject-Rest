const cloudinary = require('cloudinary').v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME,
});

const upload = async (file, folder, size, id) => {
  return await cloudinary.uploader.upload(file, {
    upload_preset: folder,
    public_id: id,
    width: size.w,
    height: size.h,
    crop: 'fill',
  });
};
const getUploaded = async (folder) => {
  const resources = await cloudinary.api.resources({ prefix: `${folder}/`, type: 'upload' });
  return resources;
};

module.exports = { upload, getUploaded };
