const uploadPicture = require('./uploadPictureCloud');


exports.upload = (photos) => {
    const images = JSON.parse(photos)
    const urls = []
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const urlPicture = await uploadPicture(image)
            urls.push(urlPicture)
            if(urls.length === images.length){
                resolve(urls);
                return;
            }
        }
    })
}