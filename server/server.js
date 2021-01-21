const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const redis = require('redis')
const {
    promisify
} = require("util");
const {
    stringify
} = require('querystring');
const { count } = require('console');


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
    }) => startRound(username, key))

    sock.on('join', ({ username, key }) => joinRoundP(username, key))
    sock.on('submitAnswers', ({ answers: answers, username: username, key: key }) => submitAnswersS(answers, username, key))
})

const submitAnswersS = (answers, username, key) => {
    const game = games.get(key)
    if (!game) return; //io.emit(`noexist:${key}`,`game ${key} doesnt exist` );
    else {
        game.submitAnswers(username, answers);
        // io.emit(`answersSubmited:${key}`,)
        sock.emit('answersSubmited')
    }
}

const startRound = async (username, key) => {
    console.log('key', key)
    const game = games.get(key)
    if (!game) return; //io.emit(`noexist:${key}`,`game ${key} doesnt exist` );
    else {
        if (!game.isAdmin(username)) return;
        const res = await game.startRound()
        sock.emit(`results:${key}`, {
            results: res
        })
    }
}
const joinRoundP = (username, key) => {
    console.log('joined')
    console.log('key', key)
    let game = games.get(key)
    console.log('game', game)
    if (!game) io.emit(`noexist:${key}`, `game ${key} doesnt exist`);
    else {
        game.addPlayer(username)
        io.emit(`playerJoined:${key}`, {
            players: game.getPlayers(),
            numPlayers: game.getNumPlayers(),
            letter: 1
        })
    }
}
const createRoundP = async (username, numPlayers, time, k) => {
    //const slovo=Math.floor(Math.random()*30+1)
    let key = k
    if (games.has(key))
        joinRoundP(username, key)
    else {
        console.log('username', username)
        console.log('numPlayers', numPlayers)
        console.log('time', time)
        const slovo = 1;
        const niz = ['drzave', 'gradovi', 'jezera', 'planine', 'reke', 'zivotinje', 'biljke', 'mora', 'predmeti']
        let answers = []
        for (field of niz) {
            await lrangeAsync(`${field}:${slovo}`, 0, -1)
                .then(data => {
                    if (data) {
                        answers.push(data)
                    } else throw "err"
                }).catch(err => {
                    throw err
                })
        }

        console.log('answers', answers)

        const c = createRound(time, answers, numPlayers)
        c.addAdmin(username)
        games.set(key, c)
        console.log('games.get(key)', games.get(key))
        io.emit(`playerJoined:${key}`, {
            players: c.getPlayers(),
            numPlayers: c.getNumPlayers(),
            letter: slovo
        })
    }

}
const saveAnswersPlayer = (player) => {
    console.log('player', player)
    //  c.addPlayer(player.name);

}
server.listen(8080, () => {
    console.log("server is ready")
})

server.on('error', () => {
    console.error('err')
})

const createRound = (time, answers, n, l) => {
    let start = false
    let letter = l
    let numPlayers = n;
    var players = []
    var fields = ['drzava', 'grad', 'jezero', 'planina', 'reka', 'zivotnija', 'biljka', 'more', 'predmet']
    var answers = [...answers]

    const getLetter = () => letter;
    const getPlayers = () => players;
    const getNumPlayers = () => numPlayers;
    const addAdmin = (name) => {
        players.push({
            name: name,
            admin: true,
            points: 0
        })
    }
    const addPlayer = (name) => {
        if (players.length === numPlayers || players.filter(p => p.name === name).length > 0) return
        players.push({
            name: name,
            admin: false,
            points: 0
        })
    }
    const isAdmin = (name) => {
        if (player.find(p => p.name === name).admin) return true
        return false
    }
    const submitAnswers = (name, answers) => {
        if (!start) return
        console.log('start', start)
        let p = players.find(p => p.name === name)
        answers.forEach((ans, ind) => p[`${fields[ind]}`] = ans)
    }

    const printAnswers = (name) => {
        console.log(players.find(p => p.name === name))
    }

    const calculateCategory = (answers, field) => {
        let collectedAnswers = []
        console.log('answers', answers)
        players.forEach(player => {
            answers.forEach(a => {
                if (player[`${field}`].toLowerCase() === a) {
                    const playerAnswerArray = collectedAnswers.filter(c => c.answer === a)
                    if (playerAnswerArray.length > 0) {
                        let p;
                        let pOduzimanje;
                        switch (playerAnswerArray.length) {
                            case 1:
                                p = 3
                                pOduzimanje = 2
                                break;
                            case 2:
                                p = 2
                                pOduzimanje = 1
                                break;
                            default:
                                p = 1
                                pOduzimanje = 1
                                break;
                        }
                        player.points += p
                        playerAnswerArray.forEach(p => {
                            p.player.points -= pOduzimanje
                        });
                    } else {
                        player.points += 5
                    }
                    collectedAnswers.push({
                        answer: a,
                        player: player
                    })
                }
            })
        })
    }

    const calculateResults = () => {
        answers.forEach((ansCategory, ind) => {
            calculateCategory(ansCategory, fields[ind])
        })
        return players
    }

    const startRound = async () => {
        start = true
        await setTimeout(calculateResults, time + 1000);
        return await players
    }



    return {
        getNumPlayers,
        isAdmin,
        getLetter,
        getPlayers,
        addPlayer,
        addAdmin,
        submitAnswers,
        printAnswers,
        calculateResults,
        startRound
    }
}

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