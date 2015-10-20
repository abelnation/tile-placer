const alt = require('../../alt')

class TurnActions {
  updateLocations(locations) {
    this.dispatch(locations)
  }
}

module.exports = alt.createActions(TurnActions)
