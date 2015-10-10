'use strict'

/*eslint-disable no-unused-vars */
//
// GameClient-spec
// Created by aallison on 10/6/15.
//

const net = require('net')
const Promise = require('bluebird')
const assert = require('chai').assert
const assertJsonEqual = require('../../util/json').assertJsonEqual

const Constants = require('../../../shared/Constants')
const Logger = require('../../../shared/log/Logger')
const SimpleState = require('../../../shared/models/game/SimpleState')
const LiveClient = require('../../../shared/network/liveclient/LiveClient')
const GameClient = require('../../../shared/clients/GameClient')

const BaseError = require('../../../shared/models/error/BaseError')
const BaseCommand = require('../../../shared/models/commands/BaseCommand')
const EchoCommand = require('../../../shared/models/game/commands/EchoCommand')
const AddGuessCommand = require('../../../shared/models/game/commands/AddGuessCommand')
const GetStateCommand = require('../../../shared/models/game/commands/GetStateCommand')

describe('GameClient', () => {

    let gameServer
    let gameState
    let client

    beforeEach(done => {

        // 1. Create new global gamestate
        gameState = new SimpleState()

        // 2. Create new game server
        gameServer = net.createServer()
        gameServer.listen(Constants.TCP_SERVER_PORT, () => {
            Logger.debug('SERVER: game server listening on ' + gameServer.address().port)

            gameServer.on('connection', socket => {

                console.log('tcp server received connection')
                let client = LiveClient.fromSocket(socket)
                client.handle((req, res) => {
                    const cmd = req.getContent()
                    if (cmd instanceof BaseCommand) {
                        cmd.executeAsync(gameState).then(result => {
                            res.ok(result)
                        }).catch(err => {
                            Logger.error('error executing command', err.stack)
                            res.error(err)
                        })
                    } else {
                        res.error(new BaseError('cmd not instance of PingCommand'))
                    }
                })

            })

            // 3. Create new connected client
            GameClient.connectTCP('localhost', Constants.TCP_SERVER_PORT, (err, gameClient) => {
                if (err) {
                    return done(err)
                }

                client = gameClient
                done()
            })
        })


    })

    afterEach(done => {
        client.disconnect()
        gameServer.close(() => {
            done()
        })
    })

    it('simple echo', done => {
        client.echoAsync('test').then(result => {
            assertJsonEqual({ echo: 'test'}, result)
            done()
        }).catch(err => {
            done(err)
        })
    })

    it('add some guesses', done => {

        const guesses = [ 3, 5, 2, 7, 9, 23, 1 ]
        let p = Promise.resolve(null)

        // Make multiple serial addGuess calls
        for (let guess of guesses) {
            p = p.then(() => {
                return client.addGuessAsync(guess)
            })
        }

        p.then(() => {
            return client.getStateAsync()
        }).then(gameState => {
            Logger.debug('getState result', gameState)

            const lastGuess = guesses[guesses.length - 1]

            assert.equal(lastGuess, gameState.getCurrentGuess().getGuess())
            // assert.equal(guesses, gameState.getPastGuesses())
        }).then(() => {
            // Add an already-guessed guess
            return client.addGuessAsync(guesses[0])
        }).then(() => {
            done(new BaseError('should have thrown error'))
        }).catch(err => {
            Logger.info('error response', err)
            assert.equal(`${ guesses[0] } has already been guessed`, err.getMessage())
            done()
        }).catch(err => {
            Logger.error('Error thrown', err)
            done(err)
        })
    })
})
