const alt = require('../alt')

class TurnActions {

  selectTile(tileIndex) {
    this.dispatch(tileIndex)
  }

  selectSlot(slot) {
    this.dispatch(slot)
  }

}

module.exports = alt.createActions(TurnActions)
