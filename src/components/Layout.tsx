import React, { ReactNode } from "react"
type LayoutProps = {
  children: ReactNode
}

export default ({ children }: LayoutProps) => {
  return (
    <div style={{marginTop: "7%"}}>
      <h1>virtual lollipop</h1>
      <h3>because we all know someone who deserves some sugar.</h3>

      {children}
    </div>
  )
}
