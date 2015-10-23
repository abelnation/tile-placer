const alt = require('../alt')

class TurnActions {

  selectTile(tileIndex) {
    this.dispatch(tileIndex)
  }

  selectSlot(slot) {
    this.dispatch(slot)
  }

  buyTile() {
    this.dispatch()
  }

}

module.exports = alt.createActions(TurnActions)
