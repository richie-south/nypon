const Card = require('../model/card')
const User = require('./user-handler')
const colors = require('../lib/card-colors')

/**
 * [crates new card model for mongodb]
 * @param  {string} creatorId [id of creator of card]
 * @param  {string} name      [name of card]
 * @param  {strinf} avatar    [image for card]
 * @return {object}           [card]
 */
const createNewCard = (creatorId, name, avatar) =>
  new Card({
    _creator: creatorId,
    name,
    avatar,
    backgroundCardColor: colors.getRandomColor(),
  })

/**
 * [creates new card and saves it]
 * @param  {string} creatorId [user id card will belong to]
 * @param  {string} name      [name of card]
 * @param  {string} avatar    [image for card]
 * @return {oject}           [card props]
 */
const createNewCardSave = async (creatorId, name, avatar) => {
  try {
    const myCard = createNewCard(creatorId, name, avatar)
    return myCard
      .save()
  } catch (error) {
    throw error
  }
}

/**
 * [retrives all cards in mongodb]
 * @return {array} [all cards in array]
 */
const getAllCards = () => Card.find({})

/**
 * [returns one card with matching id]
 * @param  {string} id [id of a card]
 * @return {object}    [card object]
 */
const getCardByCardId = id => Card.findById(id)


/**
 * [same as getCardByCardId expet returns pure object and not a mongoose object]
 * @param  {string} id [id of a card]
 * @return {object}    [card object]
 */
const getCardByCardIdLean = id =>
  Card
    .findById(id)
    .lean()
    .exec()

const addXpToCard = (id, xp) =>
  Card
    .update({ _id: id }, { 'stats.xp': xp })
    .exec()

/**
 * [adds a user to cards past users]
 * @param  {string} fbId   [facebook id of a ]
 * @param  {string} cardId [card id of a card]
 * @return {promise}       [resolves to result of card save]
 */
const addUserToCardPastUsers = async (fbId, cardId) => {
  try {
    const [user, card] = await Promise.all([
      User.getUserByFbId(fbId),
      getCardByCardId(cardId)
    ])

    card.pastUsers.push(user)
    return card.save()
  } catch (error) {
    throw error
  }
}

const getUserByCardId = (cardId) =>
  User.findOne({ 'card': cardId })
    .exec()

const switchCards = async (userFbIdOne, cardIdOne, userFbIdTwo, cardIdTwo) => {
  try {
    const [userOne, userTwo] = await Promise.all([
      User.getUserByFbId(userFbIdOne),
      User.getUserByFbId(userFbIdTwo)
    ])

    const userOneCard = await User.getUserCardByFbId(userOne.fbId)
    const userTwoCard = await User.getUserCardByFbId(userTwo.fbId)

    userOne.card = userTwoCard
    userTwo.card = userOneCard

    return Promise.all([userOne.save(), userTwo.save()])
  } catch (error) {
    throw error
  }
}

module.exports = {
  createNewCard,
  createNewCardSave,
  getAllCards,
  getCardByCardId,
  getCardByCardIdLean,
  addXpToCard,

  addUserToCardPastUsers,
}