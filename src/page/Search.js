import axios from "axios";
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
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI',
            params: {q: url.query, pageNumber: '1', pageSize: '10', autoCorrect: 'true'},
            headers: {
              'X-RapidAPI-Key': '48770c843cmshdca2289cc48f3c0p1576d3jsn91458f889214',
              'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            const resResult = response.data.value
            const resAnswer = response.data.relatedSearch
            setAnswer(resAnswer)
            setResult(resResult)
          }).catch(function (error) {
            console.error(error);
          });
          
        }
      getData()
      
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
    <div className="container relative">
      <div className="shadow-md shadow-red-300 w-full fixed top-0 bg-white z-50">
      <div className="py-5 h-20 flex w-full px-5 xl:px-10">
            <span className="w-1/3 xl:w-1/5">
                <h1 className="text-2xl font-bold"><span className="text-red-500 uppercase">g</span><span>an</span><span className="text-red-500">
                    teng</span><span className="text-red-500 text-xs">.merah</span></h1>
            </span>
              <div className="w-1/2 flex">
                <form action="" className="flex pr-10 items-center">
                    <input type="text" className="border-2 border-red-400 rounded-lg px-2 xl:py-1" onChange={searchHandler}/>
                    <Link to={`/${encodeQ}`} className="px-2 xl:py-1 rounded-lg bg-red-500 ml-5">Search</Link>
                </form>
              </div>
      </div>
      </div>
      <div className="pt-28 w-full">
        <div className="flex justify-center shadow-md rounded-lg h-auto mx-auto w-11/12">
          {result && (
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
                      <div key={result.id} className="h-28 overflow-hidden my-1 border-b border-pink-500">
                        <li>
                          <a href={result.url} className="text-red-400 hover:underline cursor-pointer text-xl font-normal" target="blank">{result.title}</a>
                          <p>{result.description}</p>
                        </li>
                      </div>
                    )
                  })}
                </div>

              </div>
            }
          </ul>
          )}
        </div>
      </div>
    </div>
    

  )
}