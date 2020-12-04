import React from "react"
//@ts-ignore
import img from "./bg.png"
import './../global.css'
import Image from 'react-bootstrap/Image'
import Header from "../components/Header"
import { Button } from "react-bootstrap"

export default function Home() {
  return <div className="a">
    <div className='home-container'>
      <Header />
    <Image className='home-lolly' src={img} fluid />
    <Button className='home-btn' size="lg" disabled>
    Make a new lolly to send to a friend
  </Button>
    </div>
    
  </div>
}
