import React from 'react'
import {useState,useEffect} from 'react'
const FlavorState = () => {
    var statearray=  ['West Bengal', 'Rajasthan', 'Punjab', 'Uttar Pradesh', 
    'Odisha', 'Maharashtra', 'Uttarakhand', 'Assam', 'Bihar',
    'Andhra Pradesh', 'Karnataka', 'Telangana', 'Kerala', 'Tamil Nadu',
    'Gujarat', 'Tripura', 'Manipur', 'Nagaland', 'NCT of Delhi',
    'Jammu & Kashmir', 'Chhattisgarh', 'Haryana', 'Madhya Pradesh',
    'Goa']
    const [flavor,setFlavor]=useState([0,0,0,0])
    const [state,setState]=useState("West Bengal")
        // Flavor array [sweet,spicy,bitter,sour]
        useEffect(()=>{
            fetch("/appstart/getFlavorState",{
                method:"POST",
                body: JSON.stringify({"data":state}),
                headers:{
                    "Content-type": 'application/json; charset=UTF-8'
                }
            })
            .then(response => response.json())  
            
            .then((json) => {
                const newFlavor=[0,0,0,0]
                for( let i=0;i<json["out"]["rows"].length;i++){
                   if(json["out"]["rows"][i]["key"][1]==="spicy"){
                    newFlavor[1]=json["out"]["rows"][i]["value"]
                   }
    
                   else if(json["out"]["rows"][i]["key"][1]==="sweet"){
                    newFlavor[0]=json["out"]["rows"][i]["value"]
                   }
    
    
                   else if(json["out"]["rows"][i]["key"][1]==="bitter"){
                    newFlavor[2]=json["out"]["rows"][i]["value"]
                   }
                   else if(json["out"]["rows"][i]["key"][1]==="sour"){
                    newFlavor[3]=json["out"]["rows"][i]["value"]
                   }
                }
                setFlavor(newFlavor)
            })
            .catch((err)=>{
                console.log("yo errrrrsss")
            })

        },[state])

    const closeInput=()=>{
            document.getElementById("input-state")["size"]="1"
    
        }
    const ChangeInput =()=>{
        document.getElementById("input-state").blur()
       setState( document.getElementById("input-state").value)
        
        
    }
    const expandInput= ()=>{
        document.getElementById("input-state")["size"]="4"
    }
 
    return (
        <div className="flavor-grid">
            <div>
            <select id="input-state" onChange={ChangeInput.bind(this)} size="1"  onFocus={expandInput.bind(this)}  onBlur={closeInput.bind(this)}>

            {statearray.map((item)=>{
                return <option value={item}>{item}</option>
            })}



            </select>
            </div>
            <div className="flavor-flex">
                <div>sweet</div>
                <div><img src={process.env.PUBLIC_URL+"/images/sugar.svg"}></img></div>
                <div>{flavor[0]}</div>
                   
            </div >
            <div className="flavor-flex">
                <div>spicy</div>
                <div><img src={process.env.PUBLIC_URL+"/images/chilli.svg"}></img></div>
               <div>{flavor[1]}</div> 
            </div>
            <div className="flavor-flex">
                <div>sour</div>
                <div><img src={process.env.PUBLIC_URL+"/images/lemon.svg"}></img></div>
              <div>  {flavor[3]}</div>
            </div>
           <div className="flavor-flex">
               <div> bitter</div>
               <div><img src={process.env.PUBLIC_URL+"/images/bitter.svg"}></img></div>
              <div> {flavor[2]} </div>
            </div>
        </div>
    )
}

export default FlavorState