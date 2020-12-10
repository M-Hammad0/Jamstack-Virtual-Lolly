import React, { useState } from "react"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { gql, useMutation, useLazyQuery } from "@apollo/client"
import Lolly from "../components/Lolly"
import "rc-color-picker/assets/index.css"
//@ts-ignore
import ColorPicker from "rc-color-picker"
import { nanoid } from "nanoid"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import ShowLolly from "../components/ShowLolly"

const create_lolly = gql`
  mutation createLolly(
    $To: String!
    $message: String!
    $from: String!
    $flavourTop: String!
    $flavourMiddle: String!
    $flavourBottom: String!
    $url: String!
  ) {
    createLolly(
      To: $To
      message: $message
      from: $from
      flavourTop: $flavourTop
      flavourMiddle: $flavourMiddle
      flavourBottom: $flavourBottom
      url: $url
    ) {
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
  query($url: String!) {
    getLollyByURL(url: $url) {
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
  color: string
  alpha: string
  open: boolean
}

interface MyFormValues {
  To: string
  message: string
  from: string
  flavourTop: string
  flavourMiddle: string
  flavourBottom: string
  url: string
}

const CreateLollyPage = () => {
  const initialValues: MyFormValues = {
    To: "",
    message: "",
    from: "",
    flavourTop: "",
    flavourMiddle: "",
    flavourBottom: "",
    url: "",
  }

  const LollySchema = Yup.object().shape({
    To: Yup.string()
      .min(3, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    message: Yup.string().max(100, "Too Long!").required("Required"),
    from: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  })

  const [createLolly] = useMutation(create_lolly)
  const [top, setTop] = useState("#D52358")
  const [middle, setMiddle] = useState("#E55946")
  const [bottom, setBottom] = useState("#DBA543")
  const [url] = useState(nanoid())
  const [lollyData, setlollyData] = useState({
    To: "",
    message: "",
    from: "",
  })

  const [getLollybyURL, { data, loading }] = useLazyQuery(getLolly, {
    variables: {
      url,
    },
  })

  return (
    <div>
      {data && !loading ? (
        <ShowLolly
          flavourBottom={bottom}
          flavourMiddle={middle}
          flavourTop={top}
          url={url}
          To={lollyData.To}
          message={lollyData.message}
          from={lollyData.from}
        />
      ) : (
        <Layout>
          <Container>
            <Row>
              <Col>
                <Row>
                  <Col>
                  <div style={{float: "right"}}>
                  <Lolly
                      fillLollyTop={top}
                      fillLollyMiddle={middle}
                      fillLollyBottom={bottom}
                    />
                  </div>
                   
                  </Col>
                  <Col xs={3}>
                    <div className="color-select-container">
                      <div >
                        <ColorPicker
                          animation="slide-up"
                          color={"#D52358"}
                          onChange={({ color }: colorI) => setTop(color)}
                        />
                      </div>
                      <div>
                        <ColorPicker
                          animation="slide-up"
                          color={"#E55946"}
                          onChange={({ color }: colorI) => setMiddle(color)}
                        />
                      </div>
                      <div>
                        <ColorPicker
                          animation="slide-up"
                          color={"#DBA543"}
                          onChange={({ color }: colorI) => setBottom(color)}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col>
                <div className="form-container">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={LollySchema}
                    onSubmit={(values, actions) => {
                      setlollyData(values)
                      createLolly({
                        variables: {
                          ...values,
                          flavourTop: top,
                          flavourMiddle: middle,
                          flavourBottom: bottom,
                          url: url,
                        },
                      })
                      setTimeout(() => getLollybyURL(), 2000)

                      actions.setSubmitting(false)
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="field-container">
                        <Field className="form-field"
                          autoComplete="off"
                          id="To"
                          name="To"
                          placeholder="To"
                        />
                        {errors.To && touched.To ? (
                          <div className="error">{errors.To}</div>
                        ) : null}
                        <Field className="form-field"
                          id="message"
                          name="message"
                          placeholder="message"
                        />
                        {errors.message && touched.message ? (
                          <div className="error">{errors.message}</div>
                        ) : null}
                        <Field className="form-field" id="from" name="from" placeholder="from" />
                        {errors.from && touched.from ? (
                          <div className="error">{errors.from}</div>
                        ) : null}
                        </div>
                        <button className="home-btn" type="submit">Freeze Lolly</button>
                        
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        </Layout>
      )}
    </div>
  )
}

export default CreateLollyPage
