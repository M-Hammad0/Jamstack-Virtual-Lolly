import React from 'react'
import Layout from '../components/Layout'

 interface LollyProps {
     pageContext: {
         data : Object
     }
 }

const LollyTemplate = ({pageContext}: LollyProps) => {
    console.log(pageContext.data)
    return (
        <div>
            <Layout>
                
            </Layout>
        </div>
    )
}

export default LollyTemplate
