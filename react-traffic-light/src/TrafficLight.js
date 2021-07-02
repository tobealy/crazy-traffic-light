import React from 'react'
import './TrafficLight.css'
import TrafficColor from './TrafficColor'

export default function TrafficLight() {

  // let crazy = false

  const [status, setState] = React.useState({green: "off", yellow: "off", red: "off"})
  const crazy = React.useRef(false)
  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:8080/stream")
    eventSource.onmessage = e => {
      let status = JSON.parse(e.data)
      if (status.green === status.yellow && status.yellow === status.red){
        crazy.current = true
      }else{
        crazy.current = false
      }

      setState(() => {console.log("Traffic Light Set Status to "+ e.data); return status})
      console.log(status.green)
    } 
  }, [])

    return (
        <div className="body">
            <TrafficColor color="darkgreen" status={status.green}/>
            <TrafficColor color="goldenrod" status={status.yellow}/>
            <TrafficColor color="darkred" status={status.red}/>
            { crazy.current && <div style={{ "font-weight": "bold" }} >CRAZY</div> }
        </div>
    )
}
