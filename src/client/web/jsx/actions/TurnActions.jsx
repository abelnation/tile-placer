const alt = require('../alt')

class TurnActions {

  selectTile(tileIndex) {
    this.dispatch(tileIndex)
  }

  selectSlot(coords) {
    this.dispatch(coords)
  }

  selectPlacement(coords) {
    this.dispatch(coords)
  }

  selectBasicTile(tileIndex) {
    this.dispatch(tileIndex)
  }

  buyTile() {
    this.dispatch()
  }
}

module.exports = alt.createActions(TurnActions)
