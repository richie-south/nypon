const destructo = require('destructo')
const abilityCalculator = require('./ability-calculator')
const ATTACK = 0
const HEAL = 1
const BLOCK = 2

const getBonus = (bonus, cardBonus) =>
  Object.assign({}, bonus, {
    attack: bonus.attack + cardBonus.bonusAttack,
    heal: bonus.heal + cardBonus.bonusHeal,
    block: bonus.block + cardBonus.bonusBlock,
  })


const emptyBonus = () => ({
  attack: 0,
  heal: 0,
  block: 0,
})

const _calculateChallange = (challangePart, playerOneRound, playerTwoRound, playerOneBonus, playerTwoBonus, counter = 0, abilitieRounds = []) => {
  if (counter === playerOneRound.length) {
    return abilitieRounds
  }

  const playerOneAbilitie = playerOneRound[counter]
  const playerTwoAbilitie = playerTwoRound[counter]

  const _ = () => {
    switch (true) {
      case playerOneAbilitie === playerTwoAbilitie:
        switch (playerOneAbilitie) {
          case ATTACK: {
            const result = {
              abilities: [ATTACK, ATTACK],
              roundResult: abilityCalculator.attackAndAttack(
                challangePart.playerOneProps.life,
                challangePart.playerOneCard.stats.attack.attack + playerOneBonus.attack,

                challangePart.playerTwoProps.life,
                challangePart.playerTwoCard.stats.attack.attack + playerTwoBonus.attack
              ),
            }
            challangePart.playerOneProps.life = result.roundResult[0]
            challangePart.playerTwoProps.life = result.roundResult[1]
            playerOneBonus = emptyBonus()
            playerTwoBonus = emptyBonus()
            return result
          }
          case HEAL: {
            const result = {
              abilities: [HEAL, HEAL],
              roundResult: abilityCalculator.healAndHeal(
                challangePart.playerOneProps.life,
                challangePart.playerOneCard.stats.heal.heal + playerOneBonus.heal,
                challangePart.playerOneProps.maxLife,

                challangePart.playerTwoProps.life,
                challangePart.playerTwoCard.stats.heal.heal + playerTwoBonus.heal,
                challangePart.playerTwoProps.maxLife
              ),
            }

            challangePart.playerOneProps.life = result.roundResult[0]
            challangePart.playerTwoProps.life = result.roundResult[1]
            playerOneBonus = getBonus(playerOneBonus, challangePart.playerOneCard.stats.heal)
            playerTwoBonus = getBonus(playerTwoBonus, challangePart.playerTwoCard.stats.heal)
            return result
          }
          case BLOCK: {
            const result = {
              abilities: [BLOCK, BLOCK],
              roundResult: abilityCalculator.blockAndBlock(
                challangePart.playerOneProps.life,
                0,
                challangePart.playerOneCard.stats.block.block + playerOneBonus.block,

                challangePart.playerTwoProps.life,
                0,
                challangePart.playerTwoCard.stats.block.block + playerTwoBonus.block
              ),
            }
            challangePart.playerOneProps.life = result.roundResult[0]
            challangePart.playerTwoProps.life = result.roundResult[1]
            playerOneBonus = getBonus(playerOneBonus, challangePart.playerOneCard.stats.block)
            playerTwoBonus = getBonus(playerTwoBonus, challangePart.playerTwoCard.stats.block)
            return result
          }
        }
        break // Check on this <--
      case (playerOneAbilitie === HEAL && playerTwoAbilitie === ATTACK): {
        const result = {
          abilities: [HEAL, ATTACK],
          roundResult: abilityCalculator.healAndAttack(
            challangePart.playerOneProps.life,
            challangePart.playerTwoProps.life,
            challangePart.playerTwoCard.stats.attack.attack + playerTwoBonus.attack
          ),
        }
        challangePart.playerOneProps.life = result.roundResult[0]
        challangePart.playerTwoProps.life = result.roundResult[1]
        playerOneBonus = emptyBonus()
        playerTwoBonus = getBonus(playerTwoBonus, challangePart.playerTwoCard.stats.attack)
        return result
      }
      case (playerOneAbilitie === ATTACK && playerTwoAbilitie === HEAL): {
        const result = {
          abilities: [ATTACK, HEAL],
          roundResult: abilityCalculator.attackAndHeal(
            challangePart.playerOneProps.life,
            challangePart.playerOneCard.stats.attack.attack + playerOneBonus.attack,
            challangePart.playerTwoProps.life
          ),
        }
        challangePart.playerOneProps.life = result.roundResult[0]
        challangePart.playerTwoProps.life = result.roundResult[1]
        playerOneBonus = getBonus(playerOneBonus, challangePart.playerOneCard.stats.attack)
        playerTwoBonus = emptyBonus()
        return result
      }
      case (playerOneAbilitie === HEAL && playerTwoAbilitie === BLOCK): {
        const result = {
          abilities: [HEAL, BLOCK],
          roundResult: abilityCalculator.healAndBlock(
            challangePart.playerOneProps.life,
            challangePart.playerOneCard.stats.heal.heal + playerOneBonus.heal,
            challangePart.playerOneProps.maxLife,

            challangePart.playerTwoProps.life,
            0,
            challangePart.playerTwoCard.stats.block.block + playerTwoBonus.block
          ),
        }
        challangePart.playerOneProps.life = result.roundResult[0]
        challangePart.playerTwoProps.life = result.roundResult[1]
        playerOneBonus = getBonus(playerOneBonus, challangePart.playerOneCard.stats.heal)
        playerTwoBonus = getBonus(playerTwoBonus, challangePart.playerTwoCard.stats.block)
        return result
      }

      case (playerOneAbilitie === BLOCK && playerTwoAbilitie === HEAL): {
        const result = {
          abilities: [BLOCK, HEAL],
          roundResult: abilityCalculator.blockAndHeal(
            challangePart.playerOneProps.life,
            0,
            challangePart.playerOneCard.stats.block.block + playerOneBonus.block,

            challangePart.playerTwoProps.life,
            challangePart.playerTwoCard.stats.heal.heal + playerTwoBonus.heal,
            challangePart.playerTwoProps.maxLife
          ),
        }
        challangePart.playerOneProps.life = result.roundResult[0]
        challangePart.playerTwoProps.life = result.roundResult[1]
        playerOneBonus = getBonus(playerOneBonus, challangePart.playerOneCard.stats.block)
        playerTwoBonus = getBonus(playerTwoBonus, challangePart.playerTwoCard.stats.heal)
        return result
      }

      case (playerOneAbilitie === ATTACK && playerTwoAbilitie === BLOCK): {
        const result = {
          abilities: [ATTACK, BLOCK],
          roundResult: abilityCalculator.attackAndBlock(
            challangePart.playerOneProps.life,
            challangePart.playerOneCard.stats.attack.attack + playerOneBonus.attack,

            challangePart.playerTwoProps.life,
            challangePart.playerTwoCard.stats.block.block + playerTwoBonus.block
          ),
        }
        challangePart.playerOneProps.life = result.roundResult[0]
        challangePart.playerTwoProps.life = result.roundResult[1]
        playerOneBonus = getBonus(playerOneBonus, challangePart.playerOneCard.stats.attack)
        playerTwoBonus = getBonus(playerTwoBonus, challangePart.playerTwoCard.stats.block)
        return result
      }

      case (playerOneAbilitie === BLOCK && playerTwoAbilitie === ATTACK): {
        const result = {
          abilities: [BLOCK, ATTACK],
          roundResult: abilityCalculator.attackAndBlock(
            challangePart.playerOneProps.life,
            challangePart.playerOneCard.stats.block.block + playerOneBonus.block,

            challangePart.playerTwoProps.life,
            challangePart.playerTwoCard.stats.attack.attack + playerTwoBonus.attack
          ),
        }
        challangePart.playerOneProps.life = result.roundResult[0]
        challangePart.playerTwoProps.life = result.roundResult[1]
        playerOneBonus = getBonus(playerOneBonus, challangePart.playerOneCard.stats.block)
        playerTwoBonus = getBonus(playerTwoBonus, challangePart.playerTwoCard.stats.attack)
        return result
      }
    }
  }

  const result = _()
  // TODO: check life?
  return _calculateChallange(challangePart, playerOneRound, playerTwoRound, playerOneBonus, playerTwoBonus, counter + 1, abilitieRounds.concat(result))
}

const calculateChallange = (challange, playerOneRound, playerTwoRound) => {
  const challangePart = destructo(challange.toObject(), 'playerOneCard', 'playerOneProps', 'playerTwoCard', 'playerTwoProps')
  let playerOneBonus = emptyBonus()
  let playerTwoBonus = emptyBonus()

  const abilitieRounds = _calculateChallange(
    challangePart,
    playerOneRound,
    playerTwoRound,
    playerOneBonus,
    playerTwoBonus
  )
  return abilitieRounds

  //const abilitieAgainstAbilitieRounds = []

  /**
   * gå igenom abilities (rounds)
   * ta abilitie mot abilitie + eventuell boost
   *   - om abilitie har boost och vinner lägg boost på minnet
   * 
   */

}


module.exports = {
  calculateChallange,
  _calculateChallange,
}