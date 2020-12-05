import React from 'react'

 interface LollyProps {
     pageContext: {
         name: string
     }
 }

const LollyTemplate = ({pageContext}: LollyProps) => {
    return (
        <div>
            this is dynamically generated page {pageContext.name}
        </div>
    )
}

export default LollyTemplate
