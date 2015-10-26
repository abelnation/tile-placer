const alt = require('../alt')

class TurnActions {

  selectTile(tileIndex) {
    this.dispatch(tileIndex)
  }

  selectSlot(slot) {
    this.dispatch(slot)
  }

  selectBasicTile(tileIndex) {
    this.dispatch(tileIndex)
  }

  buyTile() {
    this.dispatch()
  }
}

module.exports = alt.createActions(TurnActions)
