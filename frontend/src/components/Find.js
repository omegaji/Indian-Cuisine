import React from 'react'
import {useState,useEffect} from "react"
import veg from "../veg.svg"
import nonveg from "../nonveg.svg"


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
    {"name":"chicken razala","cook_time":35,"diet":"non vegeterian"}])
    // ,{"name":"chingri malai curry","cook_time":40,"diet":"non vegeterian"},{"name":"prawn malai curry","cook_time":50,"diet":"non vegeterian"}
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
            setReciepe((reciepe)=>{
                const new_reciepe= json["out"]
                return new_reciepe
            })
            console.log(json)
        })
    },[state,flavor])
    const ChangeInput = (num)=>{
        if(num==1){
            setState(document.getElementById("drop-state").value)
        }
        else{
            setFlavor(document.getElementById("drop-flavor").value)
        }
    }
    return (
        <div className="flex-find">
            <div>
                {reciepe.map((item)=>{
                    let src=null;
                    if(item.diet=="vegetarian"){
                        src=veg;
                    }
                    else{
                        src=nonveg;
                    }
                    return (<div className="finded">
                                <div>{item.name}</div>
                                <div><img src={src}></img><span>{item.cook_time} mins</span></div>
                            </div>)
                })}
            
        </div>
        <div>&#x1F50D; a Dish</div>

        <div>
            <select id="drop-state" onChange={ChangeInput.bind(this,1)} >

            {statearray.map((item)=>{
                return <option value={item}>{item}</option>
            })}

            </select>
            <select id="drop-flavor" onChange={ChangeInput.bind(this,2)}>
            {flavorarray.map((item)=>{
                return <option value={item}>{item}</option>
            })}
            </select>
        </div>
        </div>
    )
}
