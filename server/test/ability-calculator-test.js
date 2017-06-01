const chai = require('chai')
const expect = require('chai').expect
const assert = require('chai').assert

const aC = require('../lib/ability-calculator.js')

describe('abillity calculations', function () {

  // attack
  it('attack: 40 on 100 life', function () {
    expect(aC.attack(100, 40)).to.equal(60)
  })

  it('attack: 1 on 100 life', function () {
    expect(aC.attack(100, 1)).to.not.equal(100)
  })

  it('attack: value below zero', function () {
    assert.throws(aC.attack.bind(null, 100, -1), TypeError, 'number below zero')
  })

  it('attack: value not number', function () {
    assert.throws(aC.attack.bind(null, 100, '1'), TypeError, 'argument not number')
  })

  it('attack: 1000 on 100 life', function () {
    expect(aC.attack(100, 1000)).to.equal(0)
  })

  it('attack: 0 on 100 life', function () {
    expect(aC.attack(100, 0)).to.equal(100)
  })

  // heal
  it('heal: 20 on 80 life', function () {
    expect(aC.heal(20, 80, 100)).to.equal(100)
  })

  it('heal: 1 on 80 life not equal 80', function () {
    expect(aC.heal(1, 80, 100)).to.not.equal(80)
  })

  it('heal: value below zero', function () {
    assert.throws(aC.heal.bind(null, -20, 80, 100), TypeError, 'number below zero')
  })

  it('heal: value not number', function () {
    assert.throws(aC.heal.bind(null, '20', 80, '100'), TypeError, 'argument not number')
  })

  it('heal: 500 on 80 life', function () {
    expect(aC.heal(500, 80, 100)).to.equal(100)
  })

  it('heal: 0 on 80 life', function () {
    expect(aC.heal(0, 80, 100)).to.equal(80)
  })

  // block
  it('block: 30 on 40 attack life 100', function () {
    expect(aC.block(100, 40, 30)).to.equal(90)
  })

  it('block: 1 on 40 attack life 100', function () {
    expect(aC.block(100, 40, 1)).to.not.equal(60)
  })

  it('block: value below zero', function () {
    assert.throws(aC.block.bind(null, 100, 40, -30), TypeError, 'number below zero')
  })

  it('block: value not number', function () {
    assert.throws(aC.block.bind(null, 100, '40', '100'), TypeError, 'argument not number')
  })

  it('block: 40 on 40 attack life 100', function () {
    expect(aC.block(100, 40, 40)).to.equal(100)
  })

  it('block: 50 on 40 attack life 100', function () {
    expect(aC.block(100, 40, 50)).to.equal(100)
  })

  it('block: 1 on 40 attack life 100', function () {
    expect(aC.block(100, 40, 1)).to.equal(61)
  })


  it('attack and attack', function () {
    expect(
      aC.attackAndAttack(100, 40, 100, 40)).to.deep.equal(
      [80, 80])
  })

  it('heal and heal', function () {
    expect(
      aC.healAndHeal(70, 30, 100, 60, 30, 100)).to.deep.equal(
      [100, 90])
  })

  it('block and block', function () {
    expect(
      aC.blockAndBlock(80, 0, 30, 70, 0, 30)).to.deep.equal(
      [80, 70])
  })

  it('attack and heal', function () {
    expect(
      aC.attackAndHeal(80, 40, 10)).to.deep.equal(
      [80, 0])
  })

  it('heal and attack', function () {
    expect(
      aC.healAndAttack(40, 10, 40)).to.deep.equal(
      [0, 10])
  })

  it('attack and block', function () {
    expect(
      aC.attackAndBlock(40, 40, 40, 30)).to.deep.equal(
      [40, 30])
  })

  it('block and attack', function () {
    expect(
      aC.blockAndAttack(100, 30, 40, 40)).to.deep.equal(
      [90, 40])
  })
})
