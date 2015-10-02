'use strict'

//
// JsonSocketWrapper
// Created by aallison on 9/30/15.
//

const SocketWrapper = require('./SocketWrapper')

class JsonSocketWrapper extends SocketWrapper {
    constructor(socket) {
        super(socket)
    }

    onData(data) {

        console.log('JsonSocketWrapper.onData')
        if (!data) {
            console.log('null data')
            return
        }

        const jsonStr = data.toString().trim()
        console.log(`str: ${ jsonStr }`)

        try {
            let json = JSON.parse(data.toString().trim())
            console.log(`json: ${ JSON.stringify(json) }`)
            this.emit('json', json)
        } catch (e) {
            console.log(e.stack)
            this.onError(new Error('error parsing json'))
            return
        }
    }

    writeJson(json) {
        console.log('JsonSocketWrapper.writeJson')
        if (!json || typeof json === 'string') {
            this.socket.write(json)
        } else {
            this.socket.write(JSON.stringify(json))
        }
    }
}
module.exports = JsonSocketWrapper
