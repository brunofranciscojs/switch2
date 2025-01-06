import React, { useEffect, useState } from "react"
import Loading from "./Loading"
import ColorThief from './../../node_modules/colorthief/dist/color-thief.mjs'
import ActionButton from "./ActionButton"

export default function GameItem({globalNumber, setBg, gameIds}){
    const [game, setGame] = useState([])
    const [loading, setLoading] = useState(true)
    const imgPath = 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_1200/v1/'
    const [colors, setColors] = useState(null)

    useEffect(() =>{
        const fetchGames = async () => {
            try {
                const response = await fetch('./src/assets/gamesList.json')
                const data = await response.json();
                setGame(data.rows)

            } catch (error) {
                console.error("Failed to fetch games list", error);
            } finally {
              setTimeout(() =>{
                setLoading(false);
              },300)  
                
            }
      };
      fetchGames()
    },[])

    useEffect(() => {
      const extractColors = async () => {
        if (!game) return;
    
        const colorThief = new ColorThief();
    
        const colorPromises = game.map((item) => {
            const url = item.cover_art_url;
    
            return new Promise((resolve) => {
              const img = new Image();
              img.crossOrigin = "Anonymous";
              img.src = url;
    
              img.onload = () => {
                try {
                  const dominantColor = colorThief.getPalette(img, 5);
                  resolve({
                    url,
                    colors: dominantColor.slice(1,2).map(
                      (cor) => `rgb(${cor.join(", ")})`
                    ),
                  });
                } catch (error) {
                  console.error(`Erro ao obter a cor para ${url}:`, error);
                  resolve({ url, colors: ["#e2e2e2"] });
                }
              };
    
              img.onerror = () => {
                console.error(`Erro ao carregar a imagem ${url}`);
                resolve({ url, colors: ["#e2e2e2"] });
              };
            });
          });
    
        try {
          const cores = await Promise.all(colorPromises);
    
          const mapaCores = cores.reduce((acc, { url, colors }) => {
            acc[url] = colors;
            return acc;
          }, {});
    
          setColors(mapaCores);
        } catch (error) {
          console.error("Erro ao extrair cores:", error);
        }
      };
    
      extractColors();
    }, [game, imgPath, gameIds, setColors]);
    
  
    const activeBg = (bgUrl) => {
      localStorage.setItem('activeBg', JSON.stringify(bgUrl))
      setBg(localStorage.getItem('activeBg'))
    };
      
    const activeSelection = (e, item) =>{
        document.querySelectorAll('[data-id]').forEach(div => div.classList.remove('ativo','game'))
        e.target.closest('[data-id]').classList.add('ativo');
        activeBg(item)
        e.target.scrollIntoView({behavior:'smooth', block: 'nearest', inline: 'start'})

        e.target.parentElement.style.cssText = `--color:${e.target.dataset.color}`
    }
    const buttons = {
      Start:'A', 
      Options:'+'
    }

    return(
        game.map((item,index) =>(
                
                <button className="grid items-center self-end max-w-[170px] max-h-[170px] min-w-[170px] aspect-square [transition:width_.2s_ease] game z-30 scroll-ml-10 relative   
                                  after:absolute after:-left-[6rem] after:-top-[41px] after:[scale:.4] [zoom:.7] cl:[zoom:1]"
                        data-id={item.id} key={item.id}
                        data-installed={index % 2 ? true : false}
                        onClick={(e) => ( activeSelection(e, item.cover_art_url) )}
                        data-color={colors[item.cover_art_url]}
                >
                    
                    <div className="h-auto w-auto gap-5 active duration-200 relative pointer-events-none">
                        <div className="relative z-10 image">
                            {loading ? <Loading /> :
                                    <img src={item.cover_art_url} className="aspect-square object-cover object-center w-auto"/>
                            }
                        </div>
    
                        <div className="hidden flex-col gap-2 z-10 items-start infos absolute w-[500px] -right-[530px] top-0 ">
                            <h2 className="text-white font-bold text-3xl line-clamp-1">{item.title}</h2>
                            
                            <div className="flex gap-20 [&_a:after]:content-[attr(data-action)] [&_a:after]:text-white [&_a:after]:relative [&_a:after]:left-4">
                                
                                {Object.entries(buttons).map(button => <ActionButton text={button[1]} action={button[0]} key={button[0]}/> )}

                                <a tabIndex="-1" data-action={`${globalNumber}/${globalNumber * 5}`} key={'Trophy'}    
                                        className="
                                          after:!text-[#80e103] 
                                            after:!left-7
                                            after:!-top-[.3rem]
                                            before:content-[''] before:bg-[url('../src/assets/trophy.webp')] 
                                            before:bg-contain
                                            before:w-full 
                                            before:h-full 
                                            before:rounded-full 
                                            before:bg-center 
                                            before:absolute 
                                            before:left-1/2 
                                            before:-translate-x-1/2
                                            before:top-0 relative w-7 h-7 rounded-full p-2">
                                </a>
                            </div>
                        </div>

                    </div>
                </button>
              
        ))
    )
}
