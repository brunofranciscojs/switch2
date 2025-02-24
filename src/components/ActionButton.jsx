

export default function ActionButton({action,text}){
    return(
        <a tabIndex="-1" className="w-7 h-7 rounded-full p-2 bg-white leading-[.6] relative" data-action={action} >
            {text}
        </a>
    )
}