import React from 'react'
import {useState,useEffect} from "react"

const Count = () => {
        const [countt, setcountt]=useState(0)
        useEffect(()=>{
            fetch("/appstart/getDbSize")
            .then((res)=>{
                if(res.ok){
                  return res.json()
            
                }
              })
            .then((jsonresp)=>{
                setcountt(jsonresp["length"])
            })
        },[])
        return (
            <div className="count-flex">
                <div>we have over</div>
                <div className="top-plate-head"></div>
                <div className="top-plate"></div>
                <div id="count" >{countt}</div>
                <div className="bottom-plate"></div>
                <div>cuisines</div>
            </div>
        )
    }
    
    export default Count;