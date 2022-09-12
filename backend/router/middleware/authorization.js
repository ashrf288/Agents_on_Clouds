// this function to chick if user are authorize or not by checking if the user that is making the request is the owner 
//of the object or not

const authorization = (user, ObjectId) => {
  if (user === ObjectId.toString()) {
    return true
  }
  return false
  
}


module.exports = { authorization };