const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const redis = require('redis')
const createRound = require('./create-round')
const {
    promisify
} = require("util");
const {
    stringify
} = require('querystring');
const {
    count
} = require('console');


const REDIS_PORT = 6379;
const REDIS_IP = '127.0.0.1'

const app = express()
app.use(express.static(`${__dirname}/../client`))
const client = redis.createClient(REDIS_PORT)

const server = http.createServer(app)
const io = socketio(server)
const lrangeAsync = promisify(client.lrange).bind(client);

let games = new Map()

io.on('connection', (sock) => {

    sock.on('create', ({
        username,
        numPlayers,
        time,
        key
    }) => createRoundP(username, numPlayers, time, key))

    sock.on('start', ({
        username,
        key
    }) => startRoundP(username, key))

    sock.on('join', ({
        username,
        key
    }) => joinRoundP(username, key))
    sock.on('submitAnswers', ({
        answers: answers,
        username: username,
        key: key
    }) => submitAnswersS(answers, username, key))
})

const submitAnswersS = (answers, username, key) => {
    const game = games.get(key)
    console.log('username', username)
    console.log('key', key)
    console.log('answers', answers)
    if (!game) return; //io.emit(`noexist:${key}`,`game ${key} doesnt exist` );
    else {
        console.log('answers', answers)
        game.submitAnswers(username, answers);
        // io.emit(`answersSubmited:${key}`,)
        //sock.emit('answersSubmited')
    }
}

const startRoundP = async (username, key) => {
    console.log('startRoundP')
    const game = games.get(key)
    if (!game) return; //io.emit(`noexist:${key}`,`game ${key} doesnt exist` );
    else {
        if (!game.isAdmin(username)) return;
        console.log('game.getTime()', game.getTime())
        io.emit(`gameStart:${key}`, { time: game.getTime(), letter: game.getLetter() })
        const niz = ['drzave', 'gradovi', 'jezera', 'planine', 'reke', 'zivotinje', 'biljke', 'mora', 'predmeti']
        let answers = []
        for (field of niz) {
            await lrangeAsync(`${field}:${game.getLetter()}`, 0, -1)
                .then(data => {
                    if (data) {
                        answers.push(data)
                    } else throw "err"
                }).catch(err => {
                    throw err
                })
        }
        const res = await game.startRound(answers)
        await console.log('counting down!')
        console.log('res', res)
        await io.emit(`results:${key}`, {
            results: res,
        })
    }
}
const joinRoundP = (username, key) => {
    let game = games.get(key)
    if (!game) io.emit(`noexist:${key}`, `game ${key} doesnt exist`);
    else {
        game.addPlayer(username)
        io.emit(`playerJoined:${key}`, {
            players: game.getPlayers(),
            numPlayers: game.getNumPlayers(),
            letter: game.getLetter()
        })
    }
}
const createRoundP = async (username, numPlayers, time, k) => {
    if (!username || !numPlayers || !time || !k) return;
    let key = k
    if (games.has(key))
        joinRoundP(username, key)
    else {
        console.log('username', username)
        console.log('numPlayers', numPlayers)
        console.log('time', time)
        const slovo = Math.floor(Math.random() * 30 + 1)



        //console.log('answers', answers)

        const c = createRound(time, numPlayers, slovo)
        c.addAdmin(username)
        games.set(key, c)
        io.emit(`playerJoined:${key}`, {
            players: c.getPlayers(),
            numPlayers: c.getNumPlayers(),
            letter: slovo
        })
    }

}

server.listen(8080, () => {
    console.log("server is ready")
})

server.on('error', () => {
    console.error('err')
})



// const c = createRound(20, [
//     ['a'],
//     ['b', 'f'],
//     ['c', 'd']
// ], 20, 1)
// const start = async () => {
//     const f = await c.startRound()
//     await console.log('f', f)
// }
// c.addPlayer('igor');
// c.addPlayer('ifgor');
// start()
// c.submitAnswers('igor', ['a', 'b', 'c'])
// c.submitAnswers('ifgor', ['a', 'f', 'd'])

// // c.calculateResults([['a'],['b','f'],['c','d']])
// c.printAnswers('igor')
// c.printAnswers('ifgor')

// const log=(msg)=>{
//     console.log('msg', msg)
// }

// setTimeout(log,1000,"hello");