import fs from "fs";
import path from "path";

const sourceDir = "src/pemFile/";
const destinationDir = "dist/pemFile/";

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

// Get a list of files in the source directory
const files = fs.readdirSync(sourceDir);

// Copy each file to the destination directory
files.forEach((file) => {
  const sourcePath = path.join(sourceDir, file);
  const destinationPath = path.join(destinationDir, file);

  // Copy the file
  fs.copyFileSync(sourcePath, destinationPath);
});
