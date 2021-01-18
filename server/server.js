const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const redis = require('redis')

const REDIS_PORT = 6379;
const REDIS_IP = '127.0.0.1'
const client = redis.createClient(REDIS_PORT)

const app = express()
app.use(express.static(`${__dirname}/../client`))

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (sock) => {

})

server.listen(8081, () => {
    console.log("server is ready")
})

server.on('error', () => {
    console.error('err')
})

const createRound = (time, answers) => {
    let start=false
    var players = []
    var fields = ['drzava', 'grad', 'jezeo', 'plainne', 'reka', 'zivotnija', 'biljka', 'more', 'predmet']
    var answers=[...answers]
    const addPlayer = (name) => {
        players.push({
            name: name,
            points: 0
        })
    }

    const submitAnswers = (name, answers) => {
        if(!start) return
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
                                pOduzimanje=2
                                break;
                            case 2:
                                p = 2
                                pOduzimanje=1
                                break;
                            default:
                                p = 1
                                pOduzimanje=1
                                break;
                        }
                        player.points += p
                        playerAnswerArray.forEach(p => {
                            p.player.points-=pOduzimanje
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
            calculateCategory(ansCategory,fields[ind])
        })
       return players
    }

    const startRound=async ()=>{
        start=true
        await setTimeout(calculateResults,time+1000);
        return await players
    }

    return {
        addPlayer,
        submitAnswers,
        printAnswers,
        calculateResults,
        startRound
    }
}

const c = createRound(2000,[['a'],['b','f'],['c','d']]);

const start=async()=>{
    const f=await c.startRound()
    await console.log('f', f)
}
c.addPlayer('igor');
c.addPlayer('ifgor');
start()
c.submitAnswers('igor', ['a', 'b', 'c'])
c.submitAnswers('ifgor', ['a', 'f', 'd'])

// c.calculateResults([['a'],['b','f'],['c','d']])
c.printAnswers('igor')
c.printAnswers('ifgor')

// const log=(msg)=>{
//     console.log('msg', msg)
// }

// setTimeout(log,1000,"hello");
