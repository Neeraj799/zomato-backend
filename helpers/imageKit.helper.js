import ImageKit from "imagekit";
import fs from "fs";
import envConfig from "../config/env.config.js";
import Media from "../models/admin/media.js";

// Initialize ImageKit client
const imagekit = new ImageKit({
  publicKey: envConfig.imagekit.PUBLIC_KEY,
  privateKey: envConfig.imagekit.PRIVATE_KEY,
  urlEndpoint: envConfig.imagekit.URL,
});

const imageUploadHelper = async (files, folder, category) => {
  try {
    const uploadedImages = [];
    let baseFolder =
      `${envConfig.imagekit?.FOLDER?.toLowerCase()}/${envConfig.general?.NODE_ENV?.toLowerCase()}` ||
      "RestaurantMedia";

    for (const file of files) {
      const uploadedImage = await imagekit.upload({
        folder: `${baseFolder}/${folder}`,
        file: fs.createReadStream(file.path),
        fileName: file?.originalname?.toLowerCase() || "sample-image",
      });

      fs.unlinkSync(file.path);

      const transformedUrl = imagekit.url({
        src: uploadedImage.url,
        transformation: [{ width: "250", height: "200" }],
      });

      const insertImage = await Media.create({
        url: transformedUrl,
        meta: {
          title: uploadedImage.name,
          alt_text: "",
        },
        response: uploadedImage,
        file: {
          name: uploadedImage.name,
        },
        file_type: file.mimetype,
        category: category,
        folder: `${baseFolder}/${folder}`,
      });

      uploadedImages.push(insertImage.url);
    }
    return uploadedImages;
  } catch (error) {
    console.log("Image upload failed", error);
    return error;
  }
};

export { imageUploadHelper };
