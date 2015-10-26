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
      handleSelectPlacement: TurnActions.SELECT_PLACEMENT,
      handleBuyTile: TurnActions.BUY_TILE
    })
  }

  handleSelectBasicTile({index: index}) {
    let tile = this.basicMarketTiles[index][0]

    if (tile.isSelected()) {
      tile.setUnselected()
    } else { // Basic Market is an array of tile arrays (unlike real estate market)
      this.clearPlacements()
      this.clearBasicTiles()
      tile.setSelected()
    }
  }

  handleSelectTile({index: index}) {
    let tile = this.marketTiles[index]

    if (tile.isSelected()) {
      tile.setUnselected()
    } else {
      this.clearPlacements()
      this.market.clearSelectedTiles()
      tile.setSelected()
    }
  }

  handleSelectSlot({coords: coords}) {
    const board = this.gameState.getCurrentPlayer().getBoard()
    let slot = board.getSlotByCoords(coords)

    if (slot.isSelected()) {
      slot.setUnselected()
    } else {
      this.clearPlacements()
      board.clearSelectedSlots()
      slot.setSelected()
    }
  }

  handleSelectPlacement({coords: coords}) {
    const board = this.gameState.getCurrentPlayer().getBoard()
    const placement = board.getPlacementByCoords(coords)
    let tile = placement.getTile()

    if (tile.isSelected()) {
      tile.setUnselected()
    } else {
      this.clearAllSelected()
      tile.setSelected()
    }
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

    let tilePile = _.find(this.basicMarketTiles, tilePile => {
      return tilePile[0].isSelected()
    })

    let result
    if (_.isUndefined(tilePile)) { // There is no basic tile selceted, do real estate buy
      result = this.gameState.buyTileFromMarket(player, slotCoords, marketPosition)
    } else { // There is a basic tile selected, do lake or basic buy
      let basicTile = tilePile[0]
      if (basicTile.getName() === 'Lake') {
        result = this.gameState.placeLake(player, slotCoords, marketPosition)
      } else {
        result = this.gameState.buyBasicTile(player, slotCoords, `basic${basicTile.getCategory()}`, marketPosition)
      }
    }

    if (result.type === 'BaseError') {
      this.message = result.getMessage()
    } else {
      this.message = 'Good Buy!'
      this.clearAllSelected()
    }
  }

  clearAllSelected() {
    const board = this.gameState.getCurrentPlayer().getBoard()
    this.market.clearSelectedTiles()
    this.clearBasicTiles()
    board.clearAll()
  }

  clearPlacements() {
    const board = this.gameState.getCurrentPlayer().getBoard()
    console.log('clearing placements')
    board.getPlacements().forEach( placement => {
      placement.getTile().setUnselected()
    })
  }

  clearBasicTiles() {
    this.basicMarketTiles.forEach( tilePile => {
      tilePile[0].setUnselected()
    })
  }
}

module.exports = alt.createStore(GameStore, 'GameStore')
