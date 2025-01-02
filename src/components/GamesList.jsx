import { useEffect, useState } from 'react';
import GameItem from './GameItem'

export default function GamesList({globalNumber}){
    
    const [bg, setBg] = useState(useState(() => localStorage.getItem('activeBg') || '#ffffff00'))

    useEffect(() => {
        const storedBg = localStorage.getItem('activeBg');
        if (storedBg) {
          setBg(storedBg);
        }
      }, []);

    return(
        <div className='h-dvh grid items-center [background-image:--bg] !bg-cover duration-200' style={{'--bg':`url(${bg})`}}>
            <div 
                className="flex gap-6 w-auto h-auto [&_#splide01-track]:w-full [&_#splide01-track]:z-10 [&_#splide01-track]:h-full [&_ul]:w-full after:content-[''] snap-mandatory
                    after:absolute after:bg-black/75 after:w-full after:h-full after:z-0 after:left-0 after:top-0 px-20 overflow-x-scroll [&::-webkit-scrollbar]:hidden
                    [&:has(:not(div.is-active))_.is-active_.infos]:flex 
                    [&:has(:not(div.is-active))_.is-active]:h-auto
                    [&:has(:not(div.is-active))_.is-active]:w-auto
                    [&:has(:not(div.is-active))_.is-active]:mr-28
                    [&:has(:not(div.is-active))_.is-active]:overflow-visible
                    [&:has(:not(div.is-active))_.is-active_.image]:overflow-visible
                    [&:has(:not(div.is-active))_.is-active_.image]:min-w-72 
                    [&:has(:not(div.is-active))_.is-active_.image]:h-72 
                    [&:has(:not(div.is-active))_.is-active_.image]:max-w-72
                    [&:has(:not(div.is-active))_.is-active]:self-center
                    [&:has(:not(div.is-active))_.is-active_.image]:border-[3px]
                    [&:has(:not(div.is-active))_.is-active_img]:p-[.3rem]
                    [&:has(:not(div.is-active))_.is-active_.image]:border-[#0efaff]
                    ">
                <GameItem globalNumber={globalNumber} setBg={setBg}/>
            </div>
        </div>
    )
}