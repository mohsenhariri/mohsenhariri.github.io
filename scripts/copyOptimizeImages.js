import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.join(process.cwd(), "_posts", "_assets");
const targetDir = path.join(process.cwd(), "public", "posts");

async function copyAndOptimizeImages() {
  try {
    await copyDirectory(sourceDir, targetDir);
    console.log("Images copied and optimized successfully!");
  } catch (error) {
    console.error("Error copying and optimizing images:", error);
  }
}

async function copyDirectory(source, target) {
  await fs.mkdir(target, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      // Only process image files
      if (/\.(png|jpe?g|gif|svg|webp)$/i.test(entry.name)) {
        await optimizeAndCopyImage(sourcePath, targetPath);
      } else {
        // Copy other files directly
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }
}

async function optimizeAndCopyImage(sourcePath, targetPath) {
  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    if (metadata.format === "svg" || metadata.format === "gif") {
      // Copy SVGs and GIFs directly
      await fs.copyFile(sourcePath, targetPath);
    } else {
      // Optimize and save image
      await image
        .resize({ width: 1920, withoutEnlargement: true })
        .toFormat("webp") // Convert to WebP format for better compression
        .webp({ quality: 80 })
        .toFile(replaceExtension(targetPath, ".webp"));
    }
  } catch (error) {
    console.error(`Error optimizing image ${sourcePath}:`, error);
  }
}

function replaceExtension(filePath, newExtension) {
  return filePath.replace(path.extname(filePath), newExtension);
}

copyAndOptimizeImages();
