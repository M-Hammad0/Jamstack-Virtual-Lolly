import React from 'react'
import Layout from '../components/Layout'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Lolly from '../components/Lolly'

 interface LollyProps {
     pageContext: {
         data : {
             To: string,
             message: string,
             from: string,
             flavourTop: string,
             flavourMiddle: string,
             flavourBottom: string,
             url: string
         }
     }
 }

const LollyTemplate = ({pageContext : {data: {To,message,from,flavourBottom,flavourMiddle,flavourTop,url}}}: LollyProps) => {
    return (
        <div style={{color: "#fff"}}>
            <Layout>
                <Container>
                   <Row>
                       <Col>
                       <Lolly fillLollyTop={flavourTop} fillLollyMiddle={flavourMiddle} fillLollyBottom={flavourBottom} />
                       </Col>
                       <Col>
                       <h5>Your lolly is freezing. Share it with this link:</h5>
                       <h5>{`https://bla${url}`}</h5>
                        <li>{To}</li>
                        <li>{message}</li>
                        <li>{from}</li>
                        <p>{`${from} made this virtual lollipop for you. You can make your own to send to a friend who deserve some sugary treat which won't rot their teeth...`}</p>
                       </Col>
                   </Row>
                </Container>
            </Layout>
        </div>
    )
}

export default LollyTemplate
