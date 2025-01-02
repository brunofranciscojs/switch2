import { useEffect, useState } from 'react';
import GameItem from './GameItem'

export default function GamesList({globalNumber}){
    
    const [bg, setBg] = useState(useState(() => localStorage.getItem('activeBg') || '#ffffff00'))
    const [items] = useState([
        <GameItem globalNumber={globalNumber} setBg={setBg} />,
        <GameItem globalNumber={globalNumber} setBg={setBg} />,
    ])
    const [loopItems, setLoopItems] = useState([]);

    useEffect(() => {
        const storedBg = localStorage.getItem('activeBg');
        if (storedBg) {
          setBg(storedBg);
        }
      }, []);      

    useEffect(() => {
        const clonedItems = [ ...items.slice(-items.length), ...items, ...items.slice(0, items.length), ];
        setLoopItems(clonedItems);

        setTimeout(() => document.querySelectorAll('button[data-id]')[7].click(),300)
  }, [items]);    

    return(
        <div className='h-full max-h-full grid items-center [background-image:--bg] !bg-cover duration-200 w-auto overflow-hidden relative asd' style={{'--bg':`url(${bg})`}}>
            <div className="flex gap-6 w-auto h-auto after:content-[''] snap-mandatory z-40 scroll-pl-24
                    before:content-[''] before:z-[1] before:bg-[linear-gradient(205deg,transparent_60%,var(--color))] before:absolute before:left-0 before:saturate-[5] before:bottom-0 before:h-full before:w-full before:blur-[10rem] before:pointer-events-none
                    after:absolute after:bg-black/55 after:w-full after:h-full after:z-0 after:left-0 after:top-0 px-20 overflow-x-scroll [&::-webkit-scrollbar]:hidden
                    [&:has(:not(div.ativo))_.ativo_.infos]:flex 
                    [&:has(:not(div.ativo))_.ativo]:h-auto
                    [&:has(:not(div.ativo))_.ativo]:w-auto
                    [&:has(:not(div.ativo))_.ativo]:mr-0
                    [&:has(:not(div.ativo))_.ativo]:overflow-visible
                    [&:has(:not(div.ativo))_.ativo_.image]:overflow-visible
                    [&:has(:not(div.ativo))_.ativo]:max-w-72
                    [&:has(:not(div.ativo))_.ativo]:max-h-72
                    [&:has(:not(div.ativo))_.ativo]:min-w-72
                    [&:has(:not(div.ativo))_.ativo]:z-20
                    [&:has(:not(div.ativo))_.ativo]:self-center
                    [&:has(:not(div.ativo))]:content-['']
                    [&:has(:not(div.ativo))_.ativo_.image]:border-[4px]
                    [&:has(:not(div.ativo))_.ativo_img]:p-[.3rem]
                    [&:has(:not(div.ativo))_.ativo_.image]:border-[#0efaff]
                    [&:has(:not(div.ativo))_.ativo[data-installed='true']]:after:content-[url(../src/assets/cartridge.webp)]
                    ">
                    {loopItems.map((item, index) => (
                        <GameItem globalNumber={globalNumber} setBg={setBg} />, <GameItem globalNumber={globalNumber} setBg={setBg} key={index}/>
                    ))}
 
            </div>
        </div>
    )
}