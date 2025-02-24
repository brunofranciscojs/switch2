import React, { useEffect, useState } from "react"
import Notification from './Notification';
import ActionButton from "./ActionButton";

export default function BottomBar({globalNumber}){
    const joystick = 
    `<svg height="40px" width="40px" viewBox="0 0 58.189 58.189" xml:space="preserve"> 
        <path style="fill:black;" d="M29.095,39.268h9.446c1.701,0,3.346,0.609,4.638,1.716l9.128,7.828 c0.611,0.524,1.505,0.614,2.184,0.183c9.496-6.01-2.022-29.728-4.305-34.034c-0.242-0.457-0.641-2.936-1.126-3.113l-7.676-2.791 c-0.673-0.245-1.422-0.155-2.017,0.242c0,0-2.164,1.383-2.649,1.383h-8.425h-6.549c-0.485,0-2.921-1.383-2.921-1.383 c-0.596-0.397-1.345-0.487-2.017-0.242L9.13,11.848c-0.486,0.177-0.884,2.656-1.126,3.113C5.721,19.267-5.797,42.985,3.699,48.995 c0.68,0.43,1.574,0.34,2.184-0.183l9.128-7.828c1.292-1.107,2.937-1.716,4.638-1.716H29.095z"/> 
        <circle style="fill:white;" cx="36.786" cy="30.268" r="4"/> <circle style="fill:white;" cx="13.786" cy="20.268" r="4"/> 
        <circle style="fill:white;" cx="43.786" cy="16.268" r="2"/> <circle style="fill:white;" cx="39.786" cy="20.268" r="2"/> 
        <circle style="fill:white;" cx="47.786" cy="20.268" r="2"/> <circle style="fill:white;" cx="43.786" cy="24.268" r="2"/> 
        <path style="fill:white;" d="M27.286,27.921H24v-3.286c0-0.395-0.32-0.714-0.714-0.714h-2.571c-0.395,0-0.714,0.32-0.714,0.714 v3.286h-3.286c-0.395,0-0.714,0.32-0.714,0.714v2.571c0,0.395,0.32,0.714,0.714,0.714H20v3.286c0,0.395,0.32,0.714,0.714,0.714 h2.571c0.395,0,0.714-0.32,0.714-0.714v-3.286h3.286c0.395,0,0.714-0.32,0.714-0.714v-2.571C28,28.241,27.68,27.921,27.286,27.921z" /> 
    </svg>`
    
        const [light, setLight] = useState(1);

        useEffect(() => {
            const limitedGlobalNumber = globalNumber % 4 || 4;
            
            if (limitedGlobalNumber === 2) {
                setLight(2);
            } else if (limitedGlobalNumber === 3) {
                setLight(3);
            } else if (limitedGlobalNumber === 4) {
                setLight(4);
            } else {
                setLight(1);
            }
        
            document.querySelectorAll('.lights span').forEach((luz, index) => {
                light === index + 1 ? (luz.classList.add('light')) : (luz.classList.remove('light'));

                luz.onclick = () =>{
                    setLight(light); 
                    document.querySelectorAll('.lights span').forEach(luz => luz.classList.remove('light'))
                    luz.classList.add('light')
                }
            });
        }, [globalNumber, light]);
        
    return(
        <div className="flex justify-between absolute bottom-0 w-full h-24 z-[99] px-16 items-center">
            <div className="flex flex-col justify-center gap-2 items-center">
                
                <div className="flex gap-1 [&_span]:w-2 [&_span]:h-2 [&_span]:bg-[#0efaff] [&_span]:opacity-50 lights [&_.light]:[scale:1.35] [&_.light]:opacity-100">
                    <span ></span>
                    <span ></span>
                    <span ></span>
                    <span ></span>
                </div>
                <button dangerouslySetInnerHTML={{__html:joystick}} className="mix-blend-overlay invert"></button>
            </div>

            <div className="w-5 justify-end flex [&_a:after]:content-[attr(data-action)] [&_a:after]:text-white [&_a:after]:relative [&_a:after]:left-4 pr-12 relative [&_small]:-translate-x-12">
                <Notification />
                <ActionButton text={'C'} action={'connect'} />
            </div>
        </div>
    )
}