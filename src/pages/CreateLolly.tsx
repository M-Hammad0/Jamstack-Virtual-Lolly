import React, { useState } from "react"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { gql,useMutation,useLazyQuery } from '@apollo/client'
import Lolly from "../components/Lolly"
import 'rc-color-picker/assets/index.css';
//@ts-ignore
import ColorPicker from 'rc-color-picker';
import { nanoid } from 'nanoid'
import {Formik,Form,Field} from 'formik';

const create_lolly = gql`
mutation createLolly($To:String!, $message:String!, $from:String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom:String!, $url: String!){
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

 const getLolly = gql`
 query($url: String!){
  getLollyByURL(url: $url){
    url
  }
 }
 `



interface colorI {
    color: string,
    alpha: string,
    open: boolean
}

interface MyFormValues {
    To: string,
    message: string,
    from: string,
    flavourTop: string,
    flavourMiddle: string,
    flavourBottom: string,
    url: string,
}


const CreateLollyPage = () => {
    
    
  const initialValues: MyFormValues = { 
    To: '',
    message:  '',
    from:  '',
    flavourTop: '',
    flavourMiddle:  '',
    flavourBottom:  '',
    url:  ''
   };

    
    const [createLolly] = useMutation(create_lolly)
    const [top,setTop] = useState("#D52358")
    const [middle,setMiddle] = useState("#E55946")
    const [bottom,setBottom] = useState("#DBA543")
    const [url] = useState(nanoid())

    const [getLollybyURL,{data}] = useLazyQuery(getLolly,{
      variables: {
        url
      }
    })

    console.log('key',url)
    console.log(data)

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
            <div>
            <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
          createLolly({
            variables: {
                ...values,
                flavourTop: top,
                flavourMiddle: middle,
                flavourBottom: bottom,
                url: url
            }
        })
        setTimeout(() => getLollybyURL(),2000)

        setTop("#D52358")
        setMiddle("#E55946")
        setBottom("#DBA543")
           actions.setSubmitting(false);
         }}
       >
         <Form>
           <Field id="To" name="To" placeholder="To" />
           <Field id="message" name="message" placeholder="message" />
           <Field id="from" name="from" placeholder="from" />
           <button type="submit">Submit</button>
         </Form>
       </Formik>
            </div>
            </Col>
          </Row>
          <button onClick={() => getLollybyURL() }>HAAAAAAAA</button>
        </Container>
      </Layout>
    </div>
  )
}

export default CreateLollyPage
