import * as msal from '@azure/msal-browser'

const name = 'auth-msal'
const authData = {
  authenticated: false,
  accountId: undefined,
  username: undefined,
};
let config = null
let msalApp = null

function setConfig (newConfig) {
  config = newConfig
  msalApp = new msal.PublicClientApplication(config.msalConfig)
}

function checkInit () {
  if (msalApp === null) {
    console.error('AuthMSAL module has not been initialized. Make sure you ' +
      'call the setConfig function when you add the AuthMSAL provider.')
    return false
  }
  return true
}

function redirectOnAuthSuccess() {
  window.location.href = '/'
}

async function acquireTokenSilent() {
  if (!checkInit()) {
    return
  }

  const account = msalApp.getAllAccounts()[0]
  const tokenReq = {
    scopes: ['user.read'],
    account: account
  }
  return await msalApp.acquireTokenSilent(tokenReq).then(function(tokenRes) {
    return tokenRes.accessToken
  }).catch(function (error) {
    if(error.errorMessage === undefined) {
      console.error(error)
    }
    else if(error.errorMessage.indexOf('interaction_required') !== -1) {
      msalApp.acquireTokenPopup(tokenReq).then(function(tokenRes) {
        // Token acquired with interaction
        return tokenRes.accessToken
      }).catch(function(error) {
        // Token retrieval failed
        return undefined
      })
    }
    return undefined
  })
}

function selectAccount () {
  if (!checkInit()) {
    return
  }

  const accounts = msalApp.getAllAccounts()
  if(accounts.length === 0) {
    return
  }
  // Select the 1st account if more than one is detected
  if(accounts.length > 1) {
    console.warn('Several accounts detected, using the first one by default.')
  }

  authData.authenticated = true
  authData.accountId = accounts[0].homeAccountId
  authData.username = accounts[0].name
  redirectOnAuthSuccess()
}

function handleResponse(response) {
  if (response !== null) {
    authData.authenticated = true
    authData.accountId = response.account.homeAccountId
    authData.username = response.account.name
    redirectOnAuthSuccess()
  } else {
    selectAccount()
  }
}

function signIn () {
  if (!checkInit()) {
    return
  }

  msalApp.loginPopup(config.loginRequest)
    .then(handleResponse)
    .catch(error => {
      console.error(error)
      // Error handling
      if (error.errorMessage) {
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          msalApp.loginPopup(config.b2cPolicies.authorities.forgotPassword)
            .then(response => {
              window.alert('Password has been reset successfully. \nPlease sign-in with your new password.')
            })
        }
      }
  })
}

function signOut () {
  if (!checkInit()) {
    return
  }

  const logoutRequest = {
    account: msalApp.getAccountByHomeId(authData.accountId)
  }
  msalApp.logout(logoutRequest)
}

function isAsync () {
  return false
}

async function isUserSignedIn() {
  // Return true if already authenticated
  if(authData.authenticated) {
    return true
  }
  // Otherwise, try to acquire a token silently to implement SSO
  const accessToken = await acquireTokenSilent()
  if(accessToken !== undefined) {
    return true
  }
  return false
}

function getUserName() {
  if (!checkInit()) {
    return
  }

  if(authData.username !== undefined) {
    return authData.username
  }
  const account = msalApp.getAllAccounts()[0]
  if(account !== undefined) {
    return account.name
  }
  return undefined
}

function getUserId() {
  return authData.accountId
}

function getUserPicUrl() {
  return undefined
}

const AuthMSAL = {
  name,
  signIn,
  signOut,
  isUserSignedIn,
  getUserName,
  getUserId,
  getUserPicUrl,
  isAsync,
  setConfig
}
export default AuthMSAL