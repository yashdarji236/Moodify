const ImageKit = require('@imagekit/nodejs').default

const client = new ImageKit({
    privateKey:process.env.IMAGE_KIT
})
async function uplodeFile({buffer , filename , foldername=""}){
    const file = await client.files.upload({
        file:await ImageKit.toFile(Buffer.from(buffer)),
        fileName:filename,
        folder:foldername
    })

    return file
}

module.exports = {
    uplodeFile
}