const fs = require('fs');
const path = require('path');

// Path for reading from disk (server-side)
const folderPath = path.resolve(__dirname, '../public/images');

// Public URL base path (client-side)
const publicUrlPrefix = '/images';

const getImageFiles = () => {
    return fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map(file => ({
            title: path.basename(file, path.extname(file)),
            url: `${publicUrlPrefix}/${file}` // <-- Web-accessible path for React
        }));
};

module.exports = {
    getImageFiles
};
