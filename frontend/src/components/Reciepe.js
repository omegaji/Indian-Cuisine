import React from 'react'
import {useState,useEffect} from 'react'

const Reciepe = () => {
    const [r_state,r_stateUpdate]=useState("")
    const [suggest_state,updateSuggest]=useState([])
    const [r_chosen,updateChosen]=useState(["-1","-1","-1","-1","-1","-1","-1","-1","-1"])
    const [desc_chose,updateDesc]=useState([{"cook_time":"","diet":"","flavor_profile":"","state":"","prep_time":"","course":""}])
    const recChange= ()=>{
       r_stateUpdate(document.getElementById("recInput").value.toLowerCase())
    }
    useEffect(()=>{
        if(r_state==""){
            return;
        }
        fetch("/appstart/getReciepe",{
            method:"POST",
            body: JSON.stringify({"data":r_state}),
            headers:{
                "Content-type": 'application/json; charset=UTF-8'
            }
        })
        .then((jsonresponse)=>{
            return jsonresponse.json()
        })
        .then((response_json)=>{
            if(r_state==""){
                updateSuggest((suggest_state)=>{
                    const newSuggest=[]
                   return newSuggest; 
                })
            }
            else{
                updateSuggest((suggest_state)=>{
                    const newSuggest=[...suggest_state]
                    newSuggest[0]=response_json["out"]["docs"][0]
                    newSuggest[1]=response_json["out"]["docs"][1]
                    newSuggest[2]=response_json["out"]["docs"][2]
                    return newSuggest

                })
        }
        })

    },[r_state])

    const loadReciepe=(ind)=>{
        document.getElementById("recInput").value=document.getElementsByClassName("suggest")[ind].innerText
        updateSuggest([])
        const ulist=document.createElement("ul")
        if(suggest_state[ind]==undefined){
            return ulist;
        }
        if(suggest_state[ind]["ingredients"]==undefined){
            return ulist;
        }
        updateDesc([suggest_state[ind]])
        var suggestArray=suggest_state[ind]["ingredients"].split(",")
       suggestArray.map((item)=>{
           var li= document.createElement("li")
           li.innerHTML=item
       ulist.appendChild(li)

        })
        if(suggestArray.length<10){
            let diff=(10-suggestArray.length)
            for(let i=0;i<diff;i++){
                suggestArray.push("-1")
            }
        }
        updateChosen( suggestArray)
        // return ulist
    }

    const ChangeTab= (num)=>{
        if(num===2){
            document.getElementById("r-list").style.display="none";
            document.getElementById("description").style.display="block";

        }
        else{
            document.getElementById("r-list").style.display="block";
            document.getElementById("description").style.display="none";
        }
    }
    return (
        <div className="flex-reciepe">
           <div> 
               <div>Type a dish &#x2328;</div>
               <input id="recInput"type="text" onChange={recChange.bind(this)}></input>
               {suggest_state.map((item,index)=>{
                   if( item==undefined || item["name"]==undefined){
                    return "";
                   }
                    return(<div className="suggest" onClick={loadReciepe.bind(this,index)}>{item["name"]}</div>)

               })}
               

           </div>

           <div>
               <div className="cover">
                   <div className="top-cover"></div>
                   <button className="tab1" onClick={ChangeTab.bind(this,1)} >Reciepe&#x1F468;&#x200D;&#x1F373; </button>
                   <button className="tab2" onClick={ChangeTab.bind(this,2)}>Details&#x1F4DC;</button>

                   <div id="paper" className="paper">
                      <ul id="r-list" style={{"display":"block"}}>
                          <li>Reciepe</li>
                      {r_chosen.map((item,index)=>{
                          if(index==(r_chosen.length-1) && item=="-1"){
                              return( <React.Fragment>
                                <li style={{"opacity":0}}> {item}</li>
                                  </React.Fragment>)
                          }
                          if(index==(r_chosen.length-1) ){
                            return( <React.Fragment>
                              <li style={{"opacity":1}}> {index+1}){item}</li>
                                </React.Fragment>)
                        }
                          if(item=="-1"){
                            return( <React.Fragment>
                                <li style={{"opacity":0}}>{item}</li>
                                 <hr></hr> </React.Fragment>)
                          }
                         return( <React.Fragment>
                                <li>{index+1}){item}</li>
                                 <hr></hr> </React.Fragment>)
                      })}
                      {/* <div className="line"></div> */}
                     <hr/>
                    </ul>
                    <div id="description"style={{"display":"none"}}>
                     <ul>
                         <li>Description</li>
                       <li><label>cook time</label><span> {desc_chose[0]["cook_time"]}</span></li> 
                       <hr></hr>
                       <li> <label> diet</label><span> {desc_chose[0]["diet"]}</span></li> 
                       <hr></hr>
                       <li> <label>flavor</label><span> {desc_chose[0]["flavor_profile"]}</span></li> 
                       <hr></hr>
                        <li> <label>state</label><span> {desc_chose[0]["state"]}</span></li> 
                        <hr></hr>
                        <li>  <label>prep-time</label><span>{desc_chose[0]["prep_time"]}</span></li> 
                        <hr></hr>
                        <li><label>course</label><span>{desc_chose[0]["course"]}</span></li> 
                        <hr></hr>
                        </ul>
                    </div>

                   </div>
               </div>

           </div>
        </div>
    )
}

export default Reciepe