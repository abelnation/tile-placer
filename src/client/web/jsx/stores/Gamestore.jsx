var alt = require('../alt.js')
var TurnActions = require('../actions/TurnActions')
const GameClient = require('../../../../shared/clients/GameClient')

class GameStore {
  constructor() {

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
    this.market.clearSelectedTiles()
    this.marketTiles[index].setSelected()
  }

  handleSelectSlot({coords: coords}) {
    let board = this.currentPlayer.getBoard()
    board.clearSelectedSlots()

    console.log("coords:" +coords)

    let slot = board.getSlotByCoords(coords)
    console.log(slot)
    slot.setSelected()
  }
}

module.exports = alt.createStore(GameStore, 'GameStore')
