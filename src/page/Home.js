import { useEffect } from "react";
import { useState } from "react";
import { Link} from "react-router-dom";

export default function Home(){
    const [query, setQuery] = useState("")
    const [encodeQ, setEncodeQ] = useState("")
    function searchHandler(event){
        setQuery(event.target.value)
    }
    useEffect(function(){
        const encodeQuery = encodeURIComponent(query.trim())
        setEncodeQ(encodeQuery)
    },[query])
    
    return(
        <div className="container py-32 mx-auto">
            <span>
                <h1 className="text-center text-4xl pb-10 font-bold"><span className="text-red-500 uppercase">g</span><span>an</span><span className="text-red-500">
                    teng</span></h1>
            </span>
            <div className="flex justify-center">
                <div className="w-80 bg-slate-50 shadow-xl py-3 px-5 flex justify-center rounded-lg">
                <form action="">
                    <input type="text" className="border-2 border-red-400 rounded-lg px-2 mr-2" onChange={searchHandler}/>
                    <Link to={encodeQ} className="py-1 px-2 rounded-lg bg-red-500">Search</Link>
                </form>
                </div>
            </div>
            <div className="text-center pt-20">
                <p>build with web search API from rapidapi.com</p>
                <p>made by <span className="text-red-500 underline">LixuLing</span></p>
            </div>
        </div>
    )
}