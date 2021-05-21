import React from 'react'
import {useState,useEffect} from "react"

export const Find = () => {
    var statearray=  ['West Bengal', 'Rajasthan', 'Punjab', 'Uttar Pradesh', 
    'Odisha', 'Maharashtra', 'Uttarakhand', 'Assam', 'Bihar',
    'Andhra Pradesh', 'Karnataka', 'Telangana', 'Kerala', 'Tamil Nadu',
    'Gujarat', 'Tripura', 'Manipur', 'Nagaland', 'NCT of Delhi',
    'Jammu & Kashmir', 'Chhattisgarh', 'Haryana', 'Madhya Pradesh',
    'Goa']





    var flavorarray=["spicy","sweet","bitter","sour"]
    const [flavor,setFlavor]=useState("spicy")
    const [state,setState]=useState("West Bengal")
    const [reciepe,setReciepe]=useState([{"name":"shukto","cook_time":20,"diet":"vegeterian"},{"name":"daal puri","cook_time":30,"diet":"non vegeterian"},
    {"name":"chicken razala","cook_time":35,"diet":"non vegeterian"},{"name":"chingri malai curry","cook_time":40,"diet":"non vegeterian"},{"name":"prawn malai curry","cook_time":50,"diet":"non vegeterian"}])
    useEffect(()=>{
        fetch("/appstart/getFind",{
            method:"POST",
            body: JSON.stringify({"state":state,"flavor":flavor}),
            headers:{
                "Content-type": 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())  
        .then((json) => {
            json["out"].sort((item,item2)=>{
                return( item.cook_time-item2.cook_time)
            })
            console.log(json)
        })
    },[])

    return (
        <div className="flex-find">
            <div>
                {state}
                {flavor}
            
        </div>

        <div>
            <select id="input-state" >

            {statearray.map((item)=>{
                return <option value={item}>{item}</option>
            })}

            </select>
            <select>
            {flavorarray.map((item)=>{
                return <option value={item}>{item}</option>
            })}
            </select>
        </div>
        </div>
    )
}
