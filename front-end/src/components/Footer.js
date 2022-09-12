import React from 'react'

export default function Footer() {
  return (
    <div style={footerStyle} >Agents on Clouds Task</div>
  )
}
const footerStyle={
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '60px',
    lineHeight: '60px',
    backgroundColor: 'black',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5rem',
    
    
}