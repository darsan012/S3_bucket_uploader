import { Router } from "express";
import multer from "multer";
import {
  s3Client,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "../config/aws.js";

import { isAuthenticated } from "../middleware/auth.js";

const uploadRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else
      cb(
        new Error(
          "Invalid file type. Only JPG, PNG, and PDF files are allowed."
        )
      );
  },
});

// List Files
uploadRouter.get("/", isAuthenticated, async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
    });
    const data = await s3Client.send(command);
    const uploadedFiles = data?.Contents?.map((item) => item.Key);
    res.render("index", { uploadedFiles });
  } catch (error) {
    res.render("index", { error: error });
  }
});

// Upload Files
uploadRouter.post(
  "/",
  isAuthenticated,
  upload.array("files", 5),
  async (req, res) => {
    try {
      const uploadPromises = req.files.map((file) => {
        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
        });
        return s3Client.send(command);
      });
      await Promise.all(uploadPromises);
      req.flash("success", "Files uploaded successfully!");
      res.redirect("/upload");
    } catch (error) {
      req.flash("error", "File upload failed!");
      res.render("index", { error: "File upload failed" });
    }
  }
);

// Delete File
uploadRouter.post("/delete", isAuthenticated, async (req, res) => {
  const { fileName } = req.body;
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
    });
    await s3Client.send(command);
    res.redirect("/upload");
  } catch (error) {
    res.render("index", { error: "Failed to delete file" });
  }
});

export default uploadRouter;
