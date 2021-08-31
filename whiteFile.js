const { promises } = require('fs');
const nodePath = require('path');

async function writeFile(path, text) {
    if(!path || typeof path !== 'string') {
        throw new Error('path must be sting');
    }

    const now = new Date();
    let currentPath = path;

    if (!path.match(/\.(txt|md)$/g)) {
        currentPath = nodePath.join(path, `${now.getFullYear()}_${now.getMonth()}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}.txt`);
    }

    return promises.writeFile(currentPath, text);
}

module.exports = writeFile;
