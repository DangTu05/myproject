const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dry3sdlc1",
  api_key: "832558234163985",
  api_secret: "QYUhDxhatOVZmWFS4QRLufSDk7A", // Click 'View API Keys' above to copy your API secret
});
module.exports.upload = async (req, res, next) => {
  try {
    // Kiểm tra xem file có được gửi lên không
    if (!req.file) {
      next();
      return;
    }
    // Lấy buffer từ req.file.buffer
    const byteArrayBuffer = req.file.buffer;
    // Upload file lên Cloudinary từ buffer
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto" }, // Chế độ tự động nhận diện loại file
          (error, result) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.error("Cloudinary upload error:", error); // In ra lỗi của Cloudinary nếu có
              return reject(error);
            }
            resolve(result);
            req.body[req.file.fieldname] = result.url;
            next();
          }
        )
        .end(byteArrayBuffer); // Truyền buffer vào Cloudinary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
