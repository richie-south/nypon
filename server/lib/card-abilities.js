
const _defaultObject = {
  heal: 0,
  bonusHeal: 0,

  attack: 0,
  bonusAttack: 0,

  block: 0,
  bonusBlock: 0,
}

const ATTACK = Object.assign({}, _defaultObject, {
  attack: 40,
})

const HEAL = Object.assign({}, _defaultObject, {
  bonusAttack: 10,
  heal: 20,
})

const BLOCK = Object.assign({}, _defaultObject, {
  block: 30,
})

module.exports = {
  ATTACK,
  HEAL,
  BLOCK,
}