const R = require('ramda')
const validation = require('./validation.js')
const validate = validation.validateIsNumberAndOverZero

const curry = R.curry
const subtract = R.subtract
const add = R.add
const divide = R.divide
const divideByTwo = divide(R.__, 2)

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

// TODO: comment down below


const attackAndAttack = curry((aLife, aAttackValue, bLife, bAttackValue) =>
  [
    attack(aLife, divideByTwo(bAttackValue)),
    attack(bLife, divideByTwo(aAttackValue)),
  ])

const healAndHeal = curry((aLife, aValue, aMaxLife, bLife, bValue, bMaxLife) =>
  [
    heal(aLife, aValue, aMaxLife),
    heal(bLife, bValue, bMaxLife),
  ])

const blockAndBlock = curry((aLife, aAttackValue, aBlockValue, bLife, bAttackValue, bBlockValue) =>
  [
    block(aLife, aAttackValue, aBlockValue),
    block(bLife, bAttackValue, bBlockValue),
  ])

const blockAndHeal = curry((aLife, aAttackValue, aBlockValue, bLife, bValue, bMaxLife) =>
  [
    block(aLife, aAttackValue, aBlockValue),
    heal(bLife, bValue, bMaxLife),
  ])

const healAndBlock = curry((bLife, bValue, bMaxLife, aLife, aAttackValue, aBlockValue) =>
  blockAndHeal(aLife, aAttackValue, aBlockValue, bLife, bValue, bMaxLife).reverse())


const attackAndHeal = curry((aLife, aAttackValue, bLife) =>
  [
    aLife,
    attack(bLife, aAttackValue),
  ])

const healAndAttack = curry((bLife, aLife, aAttackValue) =>
  attackAndHeal(aLife, aAttackValue, bLife).reverse())

const attackAndBlock = curry((aLife, aAttackValue, bLife, bBlockValue) =>
  [
    aLife,
    block(bLife, aAttackValue, bBlockValue),
  ])

const blockAndAttack = curry((bLife, bBlockValue, aLife, aAttackValue) =>
  attackAndBlock(aLife, aAttackValue, bLife, bBlockValue).reverse())

module.exports = {
  heal: validate(heal),
  block: validate(block),
  attack: validate(attack),

  healAndHeal: validate(healAndHeal),
  healAndBlock: validate(healAndBlock),
  blockAndHeal: validate(blockAndHeal),
  attackAndHeal: validate(attackAndHeal),
  healAndAttack: validate(healAndAttack),
  blockAndBlock: validate(blockAndBlock),
  attackAndBlock: validate(attackAndBlock),
  blockAndAttack: validate(blockAndAttack),
  attackAndAttack: validate(attackAndAttack),
}