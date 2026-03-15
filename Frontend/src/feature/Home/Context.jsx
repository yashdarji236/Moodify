import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children}) => {
    const [song, Setsong] = useState(
        {
            "url": "https://ik.imagekit.io/szvl9xygyl/cohort-2/Moodify/Restart_-_Rap__N__Folk__From__12th_Fail___lHm6XCMTb.mp3",
            "posterUrl": "https://ik.imagekit.io/szvl9xygyl/cohort-2/Moodify/posters/Restart_-_Rap__N__Folk__From__12th_Fail___N26lLuwrp.jpeg",
            "title": "Restart - Rap 'N' Folk (From \"12th Fail\")",
            "mood": "happy",
            "__v": 0
        }
    )
    const [loading , Setloading] = useState(false)


    return (
        <SongContext.Provider value={{loading , Setloading , song , Setsong}}>
            {children}
        </SongContext.Provider>
    )
}