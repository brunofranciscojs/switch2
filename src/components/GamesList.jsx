import { useEffect, useState } from 'react';
import GameItem from './GameItem'

export default function GamesList({globalNumber, gameIds}){
    
    const [bg, setBg] = useState(useState(() => localStorage.getItem('activeBg') || '#ffffff00'))

    useEffect(() => {
        const storedBg = localStorage.getItem('activeBg');
        if (storedBg) {
          setBg(storedBg);
        }
      }, []);      

    return(
        <div className='h-dvh grid items-center [background-image:--bg] !bg-cover duration-200 w-auto' style={{'--bg':`url(${bg})`}}>
            <div 
                className="flex gap-6 w-auto h-auto after:content-[''] snap-mandatory
                    after:absolute after:bg-black/75 after:w-full after:h-full after:z-0 after:left-0 after:top-0 px-20 overflow-x-scroll [&::-webkit-scrollbar]:hidden
                    [&:has(:not(div.is-active))_.is-active_.infos]:flex 
                    [&:has(:not(div.is-active))_.is-active]:h-auto
                    [&:has(:not(div.is-active))_.is-active]:w-auto
                    [&:has(:not(div.is-active))_.is-active]:mr-0
                    [&:has(:not(div.is-active))_.is-active]:overflow-visible
                    [&:has(:not(div.is-active))_.is-active_.image]:overflow-visible
                    [&:has(:not(div.is-active))_.is-active_.image]:min-w-72 
                    [&:has(:not(div.is-active))_.is-active_.image]:h-72 
                    [&:has(:not(div.is-active))_.is-active_.image]:max-w-72
                    [&:has(:not(div.is-active))_.is-active]:max-w-72
                    [&:has(:not(div.is-active))_.is-active]:max-h-72
                    [&:has(:not(div.is-active))_.is-active]:min-w-72
                    [&:has(:not(div.is-active))_.is-active]:self-center
                    [&:has(:not(div.is-active))_.is-active_.image]:border-[3px]
                    [&:has(:not(div.is-active))_.is-active_img]:p-[.3rem]
                    [&:has(:not(div.is-active))_.is-active_.image]:border-[#0efaff]

                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_.infos]:flex 
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:h-auto
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:w-auto
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:mr-0
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:overflow-visible
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_.image]:overflow-visible
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_.image]:min-w-72 
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_.image]:h-72 
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_.image]:max-w-72
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:max-w-72
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:max-h-72
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:min-w-72
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)]:self-center
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_.image]:border-[3px]
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_img]:p-[.3rem]
                    [&:has(:not(.game:nth-child(1)))_.game:nth-child(1)_.image]:border-[#0efaff]
                    ">
                <GameItem globalNumber={globalNumber} setBg={setBg} gameIds={gameIds}/>
            </div>
        </div>
    )
}