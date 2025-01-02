import React, { useEffect, useState } from "react"
import Loading from "./Loading"

export default function GameItem({globalNumber, setBg, gameIds}){
    const [game, setGame] = useState([])
    const [loading, setLoading] = useState(true)
    const imgPath = 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_1200/v1/'

    useEffect(() =>{
        const fetchGames = async () => {
            try {
                const response = await fetch('./src/assets/gamesList.json')
                const data = await response.json();
                setGame(data.rows)

            } catch (error) {
                console.error("Failed to fetch games list", error);
            } finally {
                setLoading(false);
            }
      };
      fetchGames()
    },[])

    const activeBg = (bgUrl) => {
      localStorage.setItem('activeBg', JSON.stringify(bgUrl))
      setBg(localStorage.getItem('activeBg'))
    };
      
    const activeSelection = (e, item) =>{
        document.querySelectorAll('[data-id]').forEach(div => div.classList.remove('is-active','game'))
        e.target.closest('[data-id]').classList.add('is-active');
        activeBg(`${item.includes('src/assets') ? '' : imgPath}${item}`)
        e.target.scrollIntoView({behavior:'smooth', inline: 'center'})
    }

    return(
        game.map(item =>(
              gameIds.includes(item.id) && (
                
                <div className="relative grid items-center z-10 self-end min-w-[170px] min-h-[170px] max-w-[170px] max-h-[170px] overflow-hidden duration-200 game" data-id={item.id} key={item.id}
                     onClick={(e) => ( activeSelection(e, item.cover_art_url))}>
                    
                    <div className="h-auto w-auto gap-5 active duration-200 relative">
                        <div className="relative z-10 image">
                            {loading ? <Loading /> :
                                    <img src={`${item.cover_art_url.includes('src/assets') ? '' : imgPath}${item.cover_art_url}`} 
                                         className="aspect-square object-cover object-center w-auto"/>
                            }
                        </div>
    
                        <div className="hidden flex-col gap-2 z-10 items-start infos absolute w-[500px] -right-[530px] top-0 ">
                            <h2 className="text-white font-bold text-3xl line-clamp-1">{item.title}</h2>
                            
                            <div className="flex gap-20 [&_button:after]:content-[attr(data-action)] [&_button:after]:text-white [&_button:after]:relative [&_button:after]:left-4">
                                <button className="w-7 h-7 rounded-full p-2 bg-white leading-[0]" data-action="Start" key={'Start'}>A</button>
                                <button className="w-7 h-7 rounded-full p-2 bg-white leading-[0]" data-action="Options" key={'Options'}>+</button>
    
                                <button data-action={`${globalNumber}/${globalNumber * 5}`} key={'Trophy'}    
                                        className="
                                          after:!text-[#80e103] 
                                            after:!left-7
                                            after:!-top-[.3rem]
                                            before:content-[''] before:bg-[url('./src/assets/trophy.webp')] 
                                            before:bg-contain
                                            before:w-full 
                                            before:h-full 
                                            before:rounded-full 
                                            before:bg-center 
                                            before:absolute 
                                            before:left-1/2 
                                            before:-translate-x-1/2
                                            before:top-0 relative w-7 h-7 rounded-full p-2">
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
              )
        ))
    )
}
