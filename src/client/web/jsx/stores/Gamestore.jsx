var alt = require('../alt.js')
var TurnActions = require('../actions/TurnActions')
const GameClient = require('../../../../shared/clients/GameClient')

class GameStore {
  constructor() {

    this.selectedSlot = null

    this.gameClient = new GameClient()
    this.gameState = this.gameClient.gameState
    this.market = this.gameState.getMarket()
    this.marketTiles = this.market.getTiles()
    this.players = this.gameState.getPlayers()
    this.currentPlayer = this.gameState.getCurrentPlayer()

    this.bindListeners({
      handleSelectTile: TurnActions.SELECT_TILE,
      handleSelectSlot: TurnActions.SELECT_SLOT
    })
  }

  handleSelectTile({index: index}) {
    this.clearSelectedFromMarket()
    this.marketTiles[index].setSelected()
  }

  handleSelectSlot(slotIndex) {
    // if (this.slotIsSelected(slotIndex)) {
    //   this.selectedSlot = null
    // } else
    // this.selectedSlot = slotIndex
  }

// Helpers

  clearSelectedFromMarket() {
    this.marketTiles.forEach( (tile) => {
      tile.setUnselected()
    })
  }

  slotIsSelected(slotIndex) {
    return this.selectedSlot === slotIndex
  }
}

module.exports = alt.createStore(GameStore, 'GameStore')
