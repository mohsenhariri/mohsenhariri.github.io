import fs from "node:fs/promises";
import path from "node:path";
// import sharp from "sharp";

async function copyAndOptimizeImages(sourceDir, targetDir) {
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
      // Copy other files directly
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

const slideSourceDir = path.join(process.cwd(), "_slides", "_assets");
const slideTargetDir = path.join(process.cwd(), "public", "slides", "_assets");

copyAndOptimizeImages(slideSourceDir, slideTargetDir);
