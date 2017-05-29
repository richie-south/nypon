const ATTACK = 'ATTACK'
const HEAL = 'HEAL'
const BLOCK = 'BLOCK'

const types = [ATTACK, HEAL, BLOCK]

const getTypeFromNr = nr => types[nr]

module.exports = {
  getTypeFromNr,
  types,

  ATTACK,
  HEAL,
  BLOCK,
}