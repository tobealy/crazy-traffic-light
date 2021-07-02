import React from 'react'

export default function TrafficColor({ color, status }) {


  let myStyle = {
    width: "10vh",
    height: "10vh",
    backgroundColor: color,
    padding: "10px",
    borderRadius: "50%",
  };
  if (status === "on") {
    myStyle.filter = "brightness(200%)";
  }
  if (status === "off") {
    delete myStyle['filter'];
  }
  return (
    <div style={myStyle} > 

    </div>
  )
}
