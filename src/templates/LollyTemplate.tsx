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
        <div style={{ color: "#bbbfca" }}>
      <Layout>
        <Container>
          <Row>
            <Col>
              <div style={{ float: "right" }}>
                <Lolly
                  fillLollyTop={flavourTop}
                  fillLollyMiddle={flavourMiddle}
                  fillLollyBottom={flavourBottom}
                />
              </div>
            </Col>
            <Col xs={3}></Col>
            <Col>
              <p style={{ marginTop: "20px"}}>
              Your lolly is freezing. Share it with this link(Freezing takes a minute or two atleast):
              </p>
              <p className="lolly-link">{`https://virtual-lolly-mh.netlify.app/lolly/${url}`}</p>
              <div className="form-container" style={{ padding: "2% 0" }}>
                <div style={{ marginLeft: "15px" }}>
                  <li>{To}</li>
                  <li>{message}</li>
                  <li>--{from}</li>
                </div>
              </div>
              <p style={{marginTop: "30px"}}>{`${from} made this virtual lollipop for you. You can make your own to send to a friend who deserve some sugary treat which won't rot their teeth...`}</p>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
    )
}

export default LollyTemplate
