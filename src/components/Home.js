import React from "react";
import IndividualIntervalsExample from './caroselhome'
import Productcar from "./productcaroHome"

export default function Home() {
  return (
    <div style={{ margin: 'auto', maxWidth: '800px', marginBottom: '200px' }}>
      <h1>Home</h1>
      <IndividualIntervalsExample />
      <Productcar/>
    </div>
  )
}
