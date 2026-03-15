const SongModel = require("../Model/song.model")
const storageservices = require("../services/storage.services")
const ndeId3 = require('node-id3')

async function uploadController(req,res){
    const Songbuffer = req.file.buffer
    const { mood } = req.body;

    const tag = ndeId3.read(Songbuffer)

   const [songsFile, PosterFile] = await Promise.all([
    storageservices.uplodeFile({
        buffer: Songbuffer,
        filename: tag.title + ".mp3",
        foldername: '/cohort-2/Moodify'
    }),
    storageservices.uplodeFile({
        buffer: tag.image.imageBuffer,
        filename: tag.title + ".jpeg",
        foldername: '/cohort-2/Moodify/posters'
    })
])

    const songs = await SongModel.create({
        title: tag.title,
        url: songsFile.url,
        posterUrl: PosterFile.url,
        mood
    })

    res.status(201).json({
        message: "Song created Successfully",
        songs
    })
}
async function getSongs(req,res){
    const {mood} = req.query
    const song = await SongModel.findOne({
        mood
    })
    res.status(201).json({
        message:"Song Fetch successfully.",
        song    
    })
}
module.exports = {
    uploadController , getSongs
}