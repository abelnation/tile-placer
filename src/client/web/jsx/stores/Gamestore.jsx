var alt = require('../alt.js')
// var _ = require('underscore')

var TurnActions = require('../actions/TurnActions')
const GameClient = require('../../../../shared/clients/GameClient')

class GameStore {
  constructor() {

    this.gameClient = new GameClient()
    this.gameState = this.gameClient.gameState
    this.market = this.gameState.getMarket()
    this.marketTiles = this.market.getTiles()
    this.players = this.gameState.getPlayers()
    this.message = 'Select a tile, an empty space and then click `Buy Tile`'

    this.bindListeners({
      handleSelectTile: TurnActions.SELECT_TILE,
      handleSelectSlot: TurnActions.SELECT_SLOT,
      handleBuyTile: TurnActions.BUY_TILE
    })
  }

  handleSelectTile({index: index}) {
    this.market.clearSelectedTiles()
    this.marketTiles[index].setSelected()
  }

  handleSelectSlot({coords: coords}) {
    let board = this.gameState.getCurrentPlayer().getBoard()
    board.clearSelectedSlots()

    let slot = board.getSlotByCoords(coords)
    slot.setSelected()
  }

  handleBuyTile() {
    console.log('starting buy')
    const player = this.currentPlayer
    const coords = player.getBoard().getSelectedSlot().getCoords()
    const marketPosition = this.market.getSelectedIndex()
    let result = this.gameState.buyTileFromMarket(player, coords, marketPosition)
    if (result.type === 'BaseError') {
      this.message = result.getMessage()
    } else {
      console.log('Buy Successful')
      this.message = 'Good Buy!'
      this.market.clearSelectedTiles()
      board.clearAll()
    }
  }
}

module.exports = alt.createStore(GameStore, 'GameStore')
