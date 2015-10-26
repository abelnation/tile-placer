'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')
const _ = require('underscore')
const Tile = require('./Tile')
/* eslint-enable no-unused-vars */

const TurnActions = require('../../actions/TurnActions')

export default class BasicMarket extends React.Component {
  constructor(props) {
    super(props)

    this.setSelected = this.setSelected.bind(this)
    this.renderTile = this.renderTile.bind(this)
  }

  render() {
    const topTiles = _.map(this.props.tiles, (tiles) => {return tiles[0]})
    console.log('topTiles', topTiles)
    return (
      <div>
        <h3>Basic Market</h3>
          {_.map(topTiles, this.renderTile)}
      </div>
    )
  }

  renderTile(tile, index) {
    return (
      <div key={`${tile.getName()}_${index}`}>
          <div onClick={this.setSelected.bind(this,index)}>
            <Tile tile={tile} index={index} basic={true}/>
          </div>
      </div>
    )
  }
  setSelected(index) {
    TurnActions.selectBasicTile({index})
  }
}
