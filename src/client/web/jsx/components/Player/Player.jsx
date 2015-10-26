'use strict'

//
// Player
// Created by dpekar on 10/19/15.
//


/* eslint-disable no-unused-vars */
const React = require('react')

const _ = require('underscore')

const PlayerBoard = require('./PlayerBoard')
const PlayerStats = require('./PlayerStats')
const PlayerControls = require('./PlayerControls')

/* eslint-enable no-unused-vars */

const TurnActions = require('../../actions/TurnActions')

export default class Player extends React.Component {

    render() {
      const player = this.props.player

      return (
        <div>
          <div className='clearfix' />
          <div className='row'>
              <div className='col-md-2'>
                  <h3>{player.getUser().getName()}</h3>
              </div>
              <div className='col-md-8' style={{paddingTop: '20px'}}>
                  <h5>{this.props.message}</h5>
              </div>
              <div className='col-md-2' style={{paddingTop: '20px'}}>
                <PlayerControls />
              </div>
          </div>
          <PlayerStats stats={player.getStats()} />
          <hr />
          <PlayerBoard board={player.getBoard()} />
        </div>
      )
    }

}
