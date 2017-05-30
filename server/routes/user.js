const router = require('express').Router()
const userHandler = require('../dal/user-handler')


router
  .get('/', (req, res) => {

    //fbId, fbProfileImg, firstName, lastName

    userHandler.createNewPlayerWithCard(
      'my__fbId',
      'my__fbProfileImage',
      'richard',
      'soderman'
    ).then((a) => {
      res.json(a.toObject())
    }).catch(error => console.log('error', error))




  })

module.exports = router