import React, { useState } from "react"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { gql,useMutation } from '@apollo/client'
import Lolly from "../components/Lolly"


const create_lolly = gql`
mutation createLolly($To: String!, $message:String!,$from:String!){
    createLolly(To: $To,message: $message, from: $from){
      To
      message
      from
    }
  }
`





const CreateLollyPage = () => {
    
    const [To,setTo] = useState("")
    const [message,setMessage] = useState("")
    const [from,setFrom] = useState("")
    const [createLolly] = useMutation(create_lolly)

  return (
    <div>
      <Layout>
        <Container>
          <Row>
            <Col><Lolly fillLollyTop="black" fillLollyMiddle="white" fillLollyBottom="orange" /></Col>
            <Col>
            <input placeholder="to" value={To} onChange={e => setTo(e.target.value)} />
            <input placeholder="message" value={message} onChange={e => setMessage(e.target.value)} />
            <input placeholder="from" value={from} onChange={e => setFrom(e.target.value)} />
            <button onClick={() => {
                createLolly({
                    variables: {
                        To,
                        message,
                        from
                    }
                })
                setTo("")
                setMessage("")
                setFrom("")
            }}>create lolly!</button>
            </Col>
          </Row>
          
        </Container>
      </Layout>
    </div>
  )
}

export default CreateLollyPage
