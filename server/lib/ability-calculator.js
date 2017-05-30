const R = require('ramda')
const validation = require('./validation.js')
const validate = validation.validateIsNumberAndOverZero

const curry = R.curry

const compose = R.compose

const divide = R.divide
const subtract = R.subtract
const add = R.add

const divideByTwo = divide(R.__, 2)
const subtractOne = subtract(R.__, 1)

const getZeroIfBelowZero = curry((fn, b, c) =>
  fn(b, c) < 0 ? 0 : fn(b, c))(subtract)

/**
 * [removes x from life, if value becomes < 0, 0 is returned]
 * @param  {[number]} life [value to remove from]
 * @param  {[number]} value [remove amount]
 * @return {[number]}       [new life value]
 */
const attack = curry((fn, life, value) =>
  fn(life, value))(getZeroIfBelowZero)

/**
 * [adds x to life, of x > max then max is returned]
 * @param  {[number]} life [current life value]
 * @param  {[number]} value[value to add to life]
 * @param  {[number]} max  [max value of life]
 * @return {[number]}      [new life value]
 */
const heal = curry((fn, f, life, value, max) =>
  fn(max, life) < value ? max : f(life, value))(subtract, add)

/**
 * [removes block nr from attack]
 * @param  {[number]} life           [current life]
 * @param  {[number]} attackValue    [value to remove from life]
 * @param  {[number]} blockValue     [value to block attackValue with]
 * @return {[number]}                [new life value]
 */
const block = curry((fn, f, life, attackValue, blockValue) =>
  fn(life, f(attackValue, blockValue)))(attack, getZeroIfBelowZero)



// TODO: work on this more!











// /**
//  * [challanger and opponent both attack]
//  * @param  {[number]} cLife  [current life of challanger]
//  * @param  {[number]} cValue [attack value of challanger]
//  * @param  {[number]} cCards [attack cards of challanger]
//  * @param  {[number]} oLife  [current life of opponent]
//  * @param  {[number]} oValue [attack value of opponent]
//  * @param  {[number]} oCards [attack cards of opponent]
//  * @return {[object]}        [new lifes and nr of cards]
//  */
// const composeDoubbleAttack = (a, d, c) => (cLife, cValue, cCards, oLife, oValue, oCards) => {
//   return {
//     cAttackCards: c(cCards),
//     cLife: a(cLife, d(oValue)),
//     oAttackCards: c(oCards),
//     oLife: a(oLife, d(cValue)),
//   }
// }
// const doubbleAttack = composeDoubbleAttack(attack, divideByTwo, subtractOne)

// /**
//  * [challanger and opponent both heal]
//  * @param  {[number]} cLife  [current life of challanger]
//  * @param  {[number]} cValue [heal value of challanger]
//  * @param  {[number]} cMax   [max life of challanger]
//  * @param  {[number]} cCards [heal cards of challanger]
//  * @param  {[number]} oLife  [current life of opponent]
//  * @param  {[number]} oValue [heal value of opponent]
//  * @param  {[number]} oMax   [max life of opponent]
//  * @param  {[number]} oCards [heal cards of opponent]
//  * @return {[object]}        [new lifes and nr of cards]
//  */
// const composeDoubbleHeal = (h, a) => (cLife, cValue, cMax, cCards, oLife, oValue, oMax, oCards) => {
//   return {
//     cHealCards: a(cCards),
//     cLife: h(cLife, cValue, cMax),
//     oHealCards: a(oCards),
//     oLife: h(oLife, oValue, oMax),
//   }
// }
// const doubbleHeal = composeDoubbleHeal(heal, subtractOne)

// /**
//  * [challanger and opponent both block]
//  * @param  {[number]} cCards [block cards of challanger]
//  * @param  {[number]} oCards [block cards of opponent]
//  * @return {[object]}        [new cards numbers]
//  */
// const composeDoubbleBlock = (a) => (cCards, oCards) => {
//   return {
//     cBlockCards: a(cCards),
//     oBlockCards: a(oCards),
//   }
// }

// const doubbleBlock = composeDoubbleBlock(subtractOne)

// /**
//  * [challanger or opponent attack and the other one block]
//  * @param  {[number]} attackValue [value of attack]
//  * @param  {[number]} life        [value of current life]
//  * @param  {[number]} blockValue  [value of block]
//  * @param  {[number]} cCards      [nr of cards]
//  * @param  {[number]} oCards      [nr of cards]
//  * @return {[object]}             [new life and nr of cards]
//  */
// const composeAttackAndBlock = (a, b, attackCards, blockCards, lifeProp) => (attackValue, life, blockValue, cCards, oCards) => {
//   return {
//     [attackCards]: b(cCards),

//     [blockCards]: b(oCards),
//     [lifeProp]: a(life, attackValue, blockValue),
//   }
// }
// const attackOnBlock = composeAttackAndBlock(block, subtractOne, 'cAttackCards', 'oBlockCards', 'oLife')
// const blockOnAttack = composeAttackAndBlock(block, subtractOne, 'oAttackCards', 'cBlockCards', 'cLife')



// /**
//  * [challanger or opponent block and the other one heal]
//  * @param  {[number]} life   [current life]
//  * @param  {[number]} value  [value to heal]
//  * @param  {[number]} max    [max life]
//  * @param  {[number]} cCards [nr of cards]
//  * @param  {[number]} oCards [nr of cards]
//  * @return {[object]}        [new life and cards]
//  */
// const composeBlockAndHeal = (a, b, blockCards, healCards, lifeProp) => (life, value, max, cCards, oCards) => {
//   return {
//     [blockCards]: b(cCards),
//     [healCards]: b(oCards),
//     [lifeProp]: a(life, value, max),
//   }
// }

// const blockOnHeal = composeBlockAndHeal(heal, subtractOne, 'cBlockCards', 'oHealCards', 'oLife')
// const healOnBlock = composeBlockAndHeal(heal, subtractOne, 'oBlockCards', 'cHealCards', 'cLife')


// /**
//  * [challanger or opponent attack and the other one heal]
//  * @param  {[number]} life        [current life]
//  * @param  {[number]} attackValue [value to remove from life]
//  * @param  {[number]} cCards      [nr of cards]
//  * @param  {[number]} oCards      [nr of cards]
//  * @return {[object]}             [new life and cards]
//  */
// const composeAttackAndHeal = (a, b, healCards, attackCards, lifeProp) => (life, attackValue, cCards, oCards) => {
//   return {
//     [healCards]: b(cCards),
//     [lifeProp]: a(life, attackValue),
//     [attackCards]: b(oCards),
//   }
// }

// const healOnAttack = composeAttackAndHeal(attack, subtractOne, 'cHealCards', 'oAttackCards', 'cLife')
// const attackOnHeal = composeAttackAndHeal(attack, subtractOne, 'oHealCards', 'cAttackCards', 'oLife')

module.exports = {
  attack: validate.bind(null, attack),
  heal: validate.bind(null, heal),
  block: validate.bind(null, block),

  /*doubbleAttack: validate.bind(null, doubbleAttack),
  doubbleHeal: validate.bind(null, doubbleHeal),
  doubbleBlock: validate.bind(null, doubbleBlock),

  attackOnBlock: validate.bind(null, attackOnBlock),
  blockOnAttack: validate.bind(null, blockOnAttack),

  blockOnHeal: validate.bind(null, blockOnHeal),
  healOnBlock: validate.bind(null, healOnBlock),

  attackOnHeal: validate.bind(null, attackOnHeal),
  healOnAttack: validate.bind(null, healOnAttack),*/
}