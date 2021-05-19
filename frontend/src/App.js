import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react"

function App() {
  const [state, setstate] = useState([{"name":"as"}]);
  useEffect(() => {

    fetch("/appstart/").then((res)=>{
      if(res.ok){
        console.log("ok i have returned")
        return res.json()
  
      }
    }).then(jsonres=>setstate((state)=>{
      var copy=[...state]
      console.log(jsonres)
      copy[0]["name"]=jsonres["name"]
      return copy
  
    }))
   
  },[])
  



  return (
    <div className="p">
     <p>{state[0]["name"]}</p>
    </div>
  );
}

export default App;
