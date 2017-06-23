import config from '../../../config'


// https://graph.facebook.com/v2.9/me?fields=id%2Cfirst_name%2Cpicture%7Burl%7D%2Clast_name&access_token=
 
export const getFacebookProfile =(accessToken) =>
  new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/v2.9/me?fields=id%2Cfirst_name%2Cpicture.width(480).height(480)%7Burl%7D%2Clast_name&access_token=${accessToken}`
    fetch(url)
    .then(response => {
      setTimeout(() => null, 0) // react native bugg workaround
      return response.json()
    })
    .then((credentials) => resolve(credentials))
    .catch((e) => reject(e))  
  })
  
 
/**
 * [gets user information from server]
 * @param  {[string]} fbId [facebook id]
 * @return {[promise]}      [resolves to object of user information]
 */
export const getUserCredentials = (fbId) =>
  new Promise((resolve, reject) => {
    const url = config.url + '/user/' + fbId
    fetch(url)
      .then(response => {
        setTimeout(() => null, 0) // react native bugg workaround
        return response.json()
      })
      .then((credentials) => resolve(credentials))
      .catch((e) => reject(e))
  })

/**
 * [sends user data to server to make new user, ]
 * @param  {[string]} fbId         [facebook id]
 * @param  {[string]} fbProfileImg [url to profile image]
 * @param  {[string]} firstName    [first name of user]
 * @param  {[string]} lastName     [last name of user]
 * @return {[promise]}              [resolves to new user object ]
 */
export const createNewUser = (fbId, fbProfileImg, firstName, lastName) =>
  new Promise(function (resolve, reject) {
    fetch(config.url + '/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/text, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fbId, fbProfileImg, firstName, lastName })
    })
      .then(response => {
        setTimeout(() => null, 0) // react native bugg workaround
        return response.json()
      })
      .then(result => resolve(result))
      .catch(e => reject(e))
  })

/**
 * [gets user cards from server]
 * @param  {[string]} fbId [facebook id from facebbok]
 * @return {[promise]}      [resolves to array of object user cards]
 */
export const getUserCard = (fbId) =>
  new Promise((resolve, reject) => {
    const url = config.url + '/user/card/' + fbId
    fetch(url)
      .then(response => {
        setTimeout(() => null, 0) // react native bugg workaround
        return response.json()
      })
      .then((myCards) => resolve(myCards))
      .catch((e) => reject(e))
  })



