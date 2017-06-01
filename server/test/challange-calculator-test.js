const expect = require('chai').expect

const cC = require('../lib/challange-calculator')
const helperObjects = require('./helper/challange-calculator-objects.json')

describe('challange calculations', function () {

  it('block on block', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.blockOnBlock

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })

  it('attack on attack', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.attackOnAttack

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })

  it('heal on heal', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.healOnHeal

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })

  it('attack, attack, attack, on block, block, block', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.a000111

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })

  it('heal, attack, attack, on block, attack, attack', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.a100200

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })

  it('heal, heal, attack, on block, block, attack', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.a110220

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })

  it('heal, block, attack, on block, block, attack', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.a120220

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })

  it('attack, heal, attack, on attack, heal, attack', function () {
    const {
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo,
      expected,
    } = helperObjects.a010010

    expect(cC._calculateChallange(
      challange,
      playerOneRounds,
      playerTwoRounds,
      bonusPlayerOne,
      bonusPlayerTwo
    )).to.deep.equal(expected)
  })
})
