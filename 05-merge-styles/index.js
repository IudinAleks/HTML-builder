const fs = require("fs");
const path = require("path");

const stylePath = path.join(__dirname, 'styles');
const stylePathBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const style = [];
fs.promises.readdir(stylePath, {withFileTypes: true})
    .then(files => files.forEach(file => {
          const filePath = path.join(stylePath, file.name);
          if (file.isFile() && path.extname(filePath) === '.css') {
            const rsstream = fs.createReadStream(filePath, 'utf-8');
            rsstream.on('data', data => style.push(data));
            rsstream.on('end', () => fs.createWriteStream(stylePathBundle, 'utf-8').write(style.flat().join('\n')));
          }
        })
    )

