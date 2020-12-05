import React, { useState } from "react"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { gql,useMutation } from '@apollo/client'
import Lolly from "../components/Lolly"
import 'rc-color-picker/assets/index.css';
//@ts-ignore
import ColorPicker from 'rc-color-picker';
import { nanoid } from 'nanoid'

const create_lolly = gql`
mutation createLolly($To: String!, $message:String!,$from:String!,$flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!, $url: String!){
    createLolly(To: $To,message: $message, from: $from, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom, url: $url){
      To
      message
      from
      flavourTop
      flavourMiddle
      flavourBottom
      url
    }
  }
`

interface colorI {
    color: string,
    alpha: string,
    open: boolean
}


const CreateLollyPage = () => {
    
    const url = nanoid()

    const [To,setTo] = useState("")
    const [message,setMessage] = useState("")
    const [from,setFrom] = useState("")
    const [createLolly] = useMutation(create_lolly)
    const [top,setTop] = useState("#D52358")
    const [middle,setMiddle] = useState("#E55946")
    const [bottom,setBottom] = useState("#DBA543")


  return (
    <div>
      <Layout>
      
        <Container>
          <Row>
            <Col>
            <Row>
                <Col>
                <Lolly fillLollyTop={top} fillLollyMiddle={middle} fillLollyBottom={bottom} />
                </Col>
                <Col>
                <ColorPicker
      animation="slide-up"
      color={'#D52358'}
      onChange={({color}:colorI) => setTop(color)}
    />
    <ColorPicker
      animation="slide-up"
      color={'#E55946'}
      onChange={({color}:colorI) => setMiddle(color)}
    />
    <ColorPicker
      animation="slide-up"
      color={'#DBA543'}
      onChange={({color}:colorI) => setBottom(color)}
    />
                </Col>
            </Row>
            </Col>
            <Col>
            <input placeholder="to" value={To} onChange={e => setTo(e.target.value)} />
            <input placeholder="message" value={message} onChange={e => setMessage(e.target.value)} />
            <input placeholder="from" value={from} onChange={e => setFrom(e.target.value)} />
            <button onClick={() => {
                createLolly({
                    variables: {
                        To,
                        message,
                        from,
                        flavourTop: top,
                        flavourMiddle: middle,
                        flavourBottom: bottom,
                        url
                    }
                })
                setTo("")
                setMessage("")
                setFrom("")
                setTop("#D52358")
                setMiddle("#E55946")
                setBottom("#DBA543")
            }}>create lolly!</button>
            </Col>
          </Row>
          
        </Container>
      </Layout>
    </div>
  )
}

export default CreateLollyPage
