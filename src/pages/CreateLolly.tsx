import React, { useState } from "react"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const CreateLolly = () => {
    const [to,setTo] = useState("")
    const [message,setMessage] = useState("")
    const [from,setFrom] = useState("")
  return (
    <div>
      <Layout>
        <Container>
          <Row>
            <Col>img</Col>
            <Col>
            <input placeholder="to" value={to} onChange={e => setTo(e.target.value)} />
            <input placeholder="message" value={message} onChange={e => setMessage(e.target.value)} />
            <input placeholder="from" value={from} onChange={e => setFrom(e.target.value)} />
            </Col>
          </Row>
          
        </Container>
      </Layout>
    </div>
  )
}

export default CreateLolly
