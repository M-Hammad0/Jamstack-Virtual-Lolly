import React from "react"
//@ts-ignore
import img from "./bg.png"
import './../styles/global.css'
import Image from 'react-bootstrap/Image'
import Header from "../components/Header"
import { Button } from "react-bootstrap"
import { Link } from 'gatsby';

export default function Home() {
  return <div>
    <div className='home-container'>
      <Header />
    <Image className='home-lolly' src={img} fluid />
    <button onClick={() => <Link to='/CreateLolly' />} className='home-btn' size="lg">
    Make a new lolly to send to a friend
  </button>
    </div>
    
  </div>
}
