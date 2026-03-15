import {GetSongs} from '../Services/Song.api'
import { useContext } from 'react'
import { SongContext } from '../Context'


export const useSongs = () => {
    const songContect = useContext(SongContext)
    const { loading , Setloading , song , Setsong } = songContect

    async function handleGetSongs({mood}){
        Setloading(true)
        const data = await GetSongs({mood})
        Setsong(data.song)
        Setloading(false)
    }

    return ({loading , song , handleGetSongs})
}
