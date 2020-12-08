import AuthDev from '..'

// Functions to read & write from storage.
// Notes : local storage works on Chromium but not on Firefox if "Delete
// cookies and site data when Firefox is closed" is selected (for more
// details, see https://bugzilla.mozilla.org/show_bug.cgi?id=1453699)

function writeToStorage (key, value) {
  localStorage.setItem(key, value)
}
function readFromStorage (key) {
  return localStorage.getItem(key)
}
function clearFromStorage (key) {
  localStorage.removeItem(key)
}

// Currently selected provider
let currentProvider
const onAuthChangeCallbacks = []

const providers = {
  authDev: 'auth-dev'
}

function setProvider (newProvider) {
  switch (newProvider) {
    case providers.authDev:
      currentProvider = AuthDev
      break
    default:
      console.error('Unknown provider "' + newProvider + '"')
      currentProvider = undefined
  }

  if (currentProvider !== undefined) {
    // Update callbacks for the new provider
    if (currentProvider.setAuthChangeCallbacks) {
      currentProvider.setAuthChangeCallbacks(onAuthChangeCallbacks)
    }
    // Store the provider used in local storage
    writeToStorage('authProvider', newProvider)
  }
}

// If no provider is currently selected but local storage has the information
// of a provider used (in another tab or before a page refresh, for instance),
// this provider will be selected
function initProviderIfNull () {
  if (currentProvider === undefined) {
    const newProvider = readFromStorage('authProvider')
    if (newProvider !== undefined && newProvider !== null) {
      setProvider(newProvider)
    }
  }
}

function signIn () {
  return currentProvider.signIn()
}

function signOut () {
  // Clear last auth provider used from local storage
  clearFromStorage('authProvider')
  return currentProvider.signOut()
}

function onAuthStateChanged (newCallback) {
  onAuthChangeCallbacks.push(newCallback)
}

function isAsync () {
  initProviderIfNull()
  if (currentProvider && currentProvider.isAsync) {
    return currentProvider.isAsync()
  }

  return false
}

function isUserSignedIn (callback) {
  initProviderIfNull()
  if (currentProvider === undefined) {
    return false
  }
  return currentProvider.isUserSignedIn(callback)
}

function getUserName () {
  if (currentProvider === undefined) {
    return undefined
  }
  return currentProvider.getUserName()
}

function getUserId () {
  if (currentProvider === undefined) {
    return undefined
  }
  return currentProvider.getUserId()
}

function getUserPicUrl () {
  if (currentProvider === undefined) {
    return undefined
  }
  return currentProvider.getUserPicUrl()
}

const auth = {
  setProvider,
  signIn,
  signOut,
  onAuthStateChanged,
  isUserSignedIn,
  getUserName,
  getUserId,
  getUserPicUrl,
  providers,
  isAsync
}
export default auth
