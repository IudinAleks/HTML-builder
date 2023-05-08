const fs = require("fs");
const path = require("path");
const filesDir = path.join(__dirname, 'files');
const filesDirCopy = path.join(__dirname, 'files-copy');

function copyDir() {
  return fs.promises.mkdir(filesDirCopy, {recursive: true});
};

function readDir() {
  return fs.promises.readdir(filesDir, {
    withFileTypes: true,
  });
}

function copyFile(file) {
  if (file.isFile()) {
    const filePath = path.join(filesDir, file.name);
    const copyFilePath = path.join(filesDirCopy, file.name);
    return fs.promises.copyFile(filePath, copyFilePath);
  }
}

fs.promises.rm(filesDirCopy, {
  recursive: true,
  force: true,
}).then(() => {
  copyDir();
  readDir().then(files => {
    files.forEach((file => copyFile(file)))
  })
})


