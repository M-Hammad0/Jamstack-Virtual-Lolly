import React from "react"
//@ts-ignore
import img from "./bg.png"
import Image from 'react-bootstrap/Image'
import { Button } from "react-bootstrap"
import { Link } from 'gatsby';
import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/global.css'

export default function Home() {
  return <div>
    <div className='home-container'>
      <Layout>
      <Image className='home-lolly' src={img} fluid />
    <Button className='home-btn' size="lg">
    <Link className='btn-link' to='/CreateLollyPage/'>Make a new lolly to send to a friend</Link>
  </Button>
      </Layout>
    
  
    </div>
    
  </div>
}
