import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Seacrh(){
    const url = useParams()
    const [query, setQuery] = useState("")
    const [encodeQ, setEncodeQ] = useState("")
    const [result, setResult] = useState([])
    const [answer, setAnswer] = useState([])
    useEffect(function(){
        async function getData(){
          const options = {
            method: 'GET',
            headers: {
              'X-User-Agent': 'desktop',
              'X-Proxy-Location': 'IN',
              'X-RapidAPI-Key': '0c0b9dcc3emsh71bc1794699a15ep157b83jsn53ad44415841',
              'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            }
          };
          
          const request = await fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${url.query}`,options)
          const response = await request.json()
          const resResult = response.results
          const resAnswer = response.answers
          setAnswer(resAnswer)
          setResult(resResult)
        }
      // getData()
      
    },[url])
    useEffect(()=>{
      const encodeQuery = encodeURIComponent(query.trim())
      setEncodeQ(encodeQuery)
      setAnswer([])
      setResult([])
      //.log(result)
    },[query])
    function searchHandler(event) {
      setQuery(event.target.value)
    }
  return(
    <div className="container mx-auto relative">
      <div className="shadow-md shadow-red-300 w-full fixed top-0 left-0 right-0 bg-white z-50">
      <div className="py-5 h-20 flex justify-evenly px-10">
            <span className="w-1/2">
                <h1 className="text-2xl pb-10 font-bold"><span className="text-red-500 uppercase">g</span><span>an</span><span className="text-red-500">
                    teng</span></h1>
            </span>
            <div className="flex justify-center">
                <div className="w-1/2">
                <form action="" className="flex justify-between pr-10">
                    <input type="text" className="border-2 border-red-400 rounded-lg px-2" onChange={searchHandler}/>
                    <Link to={`/${encodeQ}`} className="py-1 px-2 rounded-lg bg-red-500">Search</Link>
                </form>
                </div>
            </div>
      </div>
      </div>
      <div className="pt-28 w-full">
        <div className="flex justify-center shadow-md rounded-lg h-auto mx-auto w-11/12">
          <ul className="px-4 w-full flex justify-center">
            {result.length <= 0 ? 
                <li className="w-11/12 pt-10 flex-1 justify-center space-y-20 animate-pulse">
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
                  <div className="h-2 bg-slate-400 rounded-full w-11/12"></div>
              </li>
                
            :
              <div className="w-11/12">
                <div className="h-auto py-3 w-full">
                  {answer.length <= 0 ? 
                      <></>
                  :
                    answer.map((answer) => {
                      return <li>{answer}</li>
                    })
                  }
                </div>
                <div>
                  {result.map((result) => {
                    return (
                      <div className="h-28 overflow-hidden my-1 border-b border-pink-500">
                        <li>
                          <a href={result.link} className="text-red-400 hover:underline cursor-pointer text-xl font-normal" target="blank">{result.title}</a>
                          <p>{result.description}</p>
                        </li>
                      </div>
                    )
                  })}
                </div>

              </div>
            }
          </ul>
        </div>
      </div>
    </div>
    

  )
}