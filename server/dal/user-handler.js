const User = require('../model/user.js')
const Card = require('./card-handler.js')

/**
 * [creates new user model for mongodb]
 * @param  {string} fbId         [user id from facebook]
 * @param  {string} fbProfileImg [facebook profileimage]
 * @param  {string} firstName    [first name]
 * @param  {string} lastName     [last name]
 * @return {object}              [user]
 */
const createNewUser = (fbId, fbProfileImage, firstName, lastName) =>
  new User({
    fbId,
    fbProfileImage,
    name: {
      first: firstName,
      last: lastName,
    },
  })

/**
 * [retrives specifik user by fb id]
 * @param  {string} fbId [id from user on facebook]
 * @return {object}      [user props]
 */
const getUserByFbId = fbId =>
  User
    .findOne({ fbId: fbId })
    .exec()

const getFullUserByFbId = fbId =>
  User
    .findOne({ fbId: fbId })
    .populate('card')
    .populate({
      path: 'card',
      populate: {
        path: 'pastUsers',
        model: 'User',
      },
    })
    .exec()

/**
 * [gets all users]
 * @return {promise} [all user objects]
 */
const getAllUsers = () => User.find({})

/**
 * [gets all cards owned by user]
 * @param  {string} fbId [facebook id of a user]
 * @return {array}      [array of cards id]
 */
const getUserCardIdByFbId = async fbId => {
  try {
    const user = await User
      .findOne({ fbId: fbId })
      .select({ card: 1 })

    return user.card
  } catch (error) {
    throw error
  }
}


/**
 * [gets usr owned cards 'lean' pure object ]
 * @param  {string} fbId [facebook id of user]
 * @return {promise}      [resolves to array of card objects]
 */
const getUserCardByFbIdLean = fbId =>
  User
    .findOne({ fbId: fbId })
    .populate('card')
    .lean()
    .exec()

/**
 * [gets usr owned cards]
 * @param  {string} fbId [facebook id of user]
 * @return {promise}      [resolves to array of card objects]
 */
const getUserCardByFbId = async fbId => {
  const user = await User.findOne({ fbId }).exec()
  return Card.getCardByCardId(user.card)
}

/**
 * [Creates a new user and asigns a new card to that user]
 * @param  {string} fbId         [facebook id of user to be]
 * @param  {string} fbProfileImg [url to a image]
 * @param  {string} firstName    [first name of user]
 * @param  {string} lastName     [last name of user]
 * @return {promise}              [resolves to user object]
 */
const createNewPlayerWithCard = async (fbId, fbProfileImg, firstName, lastName) => {
  try {
    const user = createNewUser(fbId, fbProfileImg, firstName, lastName)
    const userDoc = await user.save()
    const card = Card.createNewCard(userDoc._id, firstName, userDoc.fbProfileImage)
    const cardDoc = await card.save()

    // TODO: Check 'user.card = card'
    user.card = card
    return user.save()
  } catch (error) {
    throw error
  }
}

module.exports = {
  createNewUser,
  getUserByFbId,
  getAllUsers,
  getUserCardIdByFbId,
  getFullUserByFbId,

  getUserCardByFbIdLean,
  getUserCardByFbId,
  createNewPlayerWithCard
}