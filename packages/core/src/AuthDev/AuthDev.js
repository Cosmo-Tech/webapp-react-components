const name = 'auth-dev'
let authData = null

function setDefaultUser () {
  authData = {
    userId: 1,
    userName: 'le dev'
  }
}

function signIn () {
  setDefaultUser()
  window.location.href = '/'
}

function signOut () {
  window.location.href = '/'
}

function isAsync () {
  return true
}

function isUserSignedIn (callback) {
  setDefaultUser()
  callback(authData !== null)
}

function getUserName () {
  if (authData) {
    return authData.userName
  }
  return undefined
}

function getUserId () {
  if (authData) {
    return authData.userId
  }
  return undefined
}

function getUserPicUrl () {
  return undefined
}

const AuthDev = {
  name,
  signIn,
  signOut,
  isUserSignedIn,
  getUserName,
  getUserId,
  getUserPicUrl,
  isAsync
}
export default AuthDev
