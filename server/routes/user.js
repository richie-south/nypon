const router = require('express').Router()
const userHandler = require('../dal/user-handler')
const gameRoundHandler = require('../dal/game-round-handler')

router
  .get('/', (req, res) => {

    //fbId, fbProfileImg, firstName, lastName

    /*userHandler.createNewPlayerWithCard(
      'my__fbId',
      'my__fbProfileImage',
      'richard',
      'soderman'
    ).then((a) => {
      res.json(a.toObject())
    }).catch(error => console.log('error', error))
*/

    gameRoundHandler.newRoundData([0, 1, 2])
      .save()
      .then((a) => {
        res.json(a.toObject())
      }).catch(error => console.log('error', error))

  })

/**
 * [creates new user]
 * @param  {[route]} '/user/create' []
 * @return {[object]}                [newly created user object]
 */
router.route('/user/create')
  .post((req, res) => {

    if (!req.body.hasOwnProperty('fbId') ||
      !req.body.hasOwnProperty('fbProfileImg') ||
      !req.body.hasOwnProperty('firstName') ||
      !req.body.hasOwnProperty('lastName')) {
      res.status(400).send({ status: 'failed', message: 'invalid props' })
    }
    userHandler.createNewPlayerWithCard(
      req.body.fbId,
      req.body.fbProfileImg,
      req.body.firstName,
      req.body.lastName
    )
      .then(result => res.json(result))
      .catch(() => res.status(500).send('500'))

  })

/**
 * [get user by its fbId]
 * @param  {[route]} '/user/:fbid' [id of a user]
 * @return {[object]}         [object of user information]
 */
router.route('/user/:fbid')
  .get((req, res) => {

    userHandler.getAllUserDataByFbId(req.params.fbid)
      .then(result => {
        if (!result) {
          return res.status(404).send('404')
        }
        res.json(result)
      })
      .catch(() => res.status(500).send('500'))
  })

/**
 * [get user cards by its fbId]
 * @param  {[reoute]} '/user/cards/:fbid' [id of user]
 * @return {[array]}   [array of object with user cards]
 */
router.route('/user/card/:fbid')
  .get((req, res) => {
    userHandler.getUserCardByFbId(req.params.fbid)
      .then(result => {
        if (!result) {
          return res.status(404).send('404')
        }
        res.json(result)
      })
      .catch(() => res.status(404).send('404'))
  })

module.exports = router