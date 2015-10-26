var alt = require('../alt.js')
var _ = require('underscore')

var TurnActions = require('../actions/TurnActions')
const GameClient = require('../../../../shared/clients/GameClient')

class GameStore {
  constructor() {

    this.gameClient = new GameClient()
    this.gameState = this.gameClient.gameState
    this.basicMarketTiles = this.gameState.getBasicMarketTiles()
    this.market = this.gameState.getMarket()
    this.marketTiles = this.market.getTiles()
    this.players = this.gameState.getPlayers()
    this.message = 'Select a tile, an empty space and then click `Buy Tile`'

    this.bindListeners({
      handleSelectTile: TurnActions.SELECT_TILE,
      handleSelectSlot: TurnActions.SELECT_SLOT,
      handleSelectBasicTile: TurnActions.SELECT_BASIC_TILE,
      handleBuyTile: TurnActions.BUY_TILE
    })
  }

  handleSelectBasicTile({index: index}) {
    this.basicMarketTiles.forEach( (tilePile) => {
      tilePile[0].setUnselected()
    }) // Basic Market is an array of tile arrays (unlike real estate market)
    let tile = this.basicMarketTiles[index][0]
    tile.setSelected()
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
    const player = this.gameState.getCurrentPlayer()
    const board = player.getBoard()

    const selectedSlot = board.getSelectedSlot()
    if(_.isUndefined(selectedSlot)) {
      this.message = 'You need to select a slot on your board!'
      return
    }
    const slotCoords = selectedSlot.getCoords()

    const marketPosition = this.market.getSelectedIndex()
    if (marketPosition < 0) {
      this.message = 'You need to select a tile from the market!'
      return
    }

    let result = this.gameState.buyTileFromMarket(player, slotCoords, marketPosition)
    if (result.type === 'BaseError') {
      this.message = result.getMessage()
    } else {
      this.message = 'Good Buy!'
      this.market.clearSelectedTiles()
      board.clearAll()
    }
  }
}

module.exports = alt.createStore(GameStore, 'GameStore')
