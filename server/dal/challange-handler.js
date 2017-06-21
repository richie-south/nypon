const Challange = require('../model/challange.js')

/**
 * [makes new challange mongoose object]
 * @param  {Object} challanger     [description]
 * @param  {Object} challangerCard [description]
 * @param  {Object} opponent       [description]
 * @param  {Object} opponentCard   [description]
 * @return {object}                [result of new]
 */
const newChallange = (playerOne, playerOneCard, playerTwo, playerTwoCard) =>
  new Challange({
    playerOne,
    playerOneCard,
    playerTwo,
    playerTwoCard,
  })


/**
 * [retrives callange object from id]
 * @param  {string} id [id of object]
 * @return {prmise}    [resolves to object of a challange]
 */
const getChallangeById = (id) =>
  Challange.findOne({ _id: id })
    .populate('playerOneCard')
    .populate('playerOne')
    .populate('playerTwo')
    .populate('playerTwoCard')
    .populate('playerOneRounds')
    .populate('playerTwoRounds')
    .exec()

/**
 * [retrives callange object from id, lean from]
 * @param  {string} id [id of object]
 * @return {prmise}    [resolves to object of a challange]
 */
const getChallangeByIdLean = (id) =>
  Challange.findOne({ _id: id })
    .populate('palyerOneCard')
    .populate('playerOne')
    .populate('playerTwo')
    .populate('playerTwoCard')
    .populate('playerOneRounds')
    .populate('playerTwoRounds')
    .lean()
    .exec()

const getChallangeByIdNoPopulate = (id) =>
  Challange.findOne({ _id: id })
    .exec()

const updateLife = (id, playerOneLife, playerTwoLife) =>
  Challange.update({ _id: id }, {
    'playerOneProps.life': playerOneLife,
    'playerTwoProps.life': playerTwoLife,
  })
    .exec()

const updateAbilitieCards = (id,
  playerOneAttackCards, playerOneHealCards, playerOneBlockCards,
  playerTwoAttackCards, playerTwoHealCards, playerTwoBlockCards
) =>
  Challange.update({ _id: id }, {
    'playerOneProps.healCards': playerOneHealCards,
    'playerOneProps.attackCards': playerOneAttackCards,
    'playerOneProps.blockCards': playerOneBlockCards,

    'playerTwoProps.healCards': playerTwoHealCards,
    'playerTwoProps.attackCards': playerTwoAttackCards,
    'playerTwoProps.blockCards': playerTwoBlockCards,
  })
    .exec()

const getAllChallanges = () => Challange.find({})

const getCardsInChallange = (id) => Challange.findOne({ _id: id }, 'playerOneCard playerTwoCard')

module.exports = {
  newChallange,
  getChallangeById,
  getChallangeByIdLean,
  getChallangeByIdNoPopulate,
  getAllChallanges,
  updateAbilitieCards,
  updateLife,
  getCardsInChallange,
}