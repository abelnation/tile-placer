'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')
const _ = require('underscore')
const BasicMarket = require('./BasicMarket')
const RealEstateMarket = require('./RealEstateMarket')
/* eslint-enable no-unused-vars */


const TurnActions = require('../../actions/TurnActions')

export default class Markets extends React.Component {
  constructor(props) {
    super(props)

    // this.setSelected = this.setSelected.bind(this)
    // this.renderTile = this.renderTile.bind(this)
  }

  render() {
    return (
      <div>
        <BasicMarket tiles={this.props.basicTiles}/>
        <div className='clearfix'></div>
        <RealEstateMarket tiles={this.props.realEstateTiles}/>
        <hr />
      </div>
    )
  }

}
