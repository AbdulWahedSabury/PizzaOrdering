import { useSelector } from "react-redux"

export default function UserName(){
    const userName = useSelector((store)=>store.user.userName)
    return <div className="uppercase font-semibold text-xs hidden  sm:block">
        {userName}
    </div>
}