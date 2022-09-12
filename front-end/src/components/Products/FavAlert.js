import React from 'react'
import Alert from 'react-bootstrap/Alert';

export default function FavAlert({SetshowAlert}) {
  return (
    <Alert variant="success" onClose={() => SetshowAlert(false)} dismissible>
    <Alert.Heading>Added to Favorites</Alert.Heading>
    <p>
     Awasome now you can see this product in the favorite section 
    </p>
  </Alert>
  )
}
