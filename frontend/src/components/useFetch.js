//This is a Custom Hook

import { useState,useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null); 
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access');

    useEffect(()=>{
        const abortCont = new AbortController();
        console.log("Use effect ran");
        /*
             Start Json server: npx json-server --watch json_data/db.json --port 8000
            https://www.youtube.com/watch?v=eao7ABGFUXs&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=16
        */

        setTimeout(()=>{

        axios.get(url,{ 
            signal: abortCont.signal,
            headers:{
                'Content-Type':"application/json" ,
                'Authorization': `Bearer ${token}`
             }
        }).then(response => {
            return response.data;
        }).then((data=>{
            console.log(data);
            setData(data);
            setIsPending(false);
            setError(null);
        })).catch(error => {
            if(error.response && error.response.status === 401){
                alert("Error 401");
            }

            if(error.name === 'AbortError'){
                console.log('fetch aborted');
            }else{
                setError(error.message);
                setIsPending(false);
            }
        });
        },1000); // in here, setTimeOut is only used for simulation of the Loading...., Do not do this in production


        return () => abortCont.abort(); // To stop fetching data if changes Tab quickly
    },[url])   //The useEffect will only be triggered if the 'url' state changed 

    return { data, isPending, error}

}

export default useFetch;