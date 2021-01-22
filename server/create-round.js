const createRound = (time, n, l) => {
    let start = false
    let letter = l
    let numPlayers = n;
    var players = []
    var fields = ['drzava', 'grad', 'jezero', 'planina', 'reka', 'zivotnija', 'biljka', 'more', 'predmet']

    const getTime = () => time;
    const getLetter = () => letter;
    const getPlayers = () => players;
    const getNumPlayers = () => numPlayers;
    const addAdmin = (name) => {
        players.push({
            name: name,
            admin: true,
            answers: {
                ans: Array(9),
                cor: Array(9).fill('0')
            },
            points: 0
        })
    }
    const addPlayer = (name) => {
        if (players.length >= numPlayers || players.filter(p => p.name === name).length > 0) return
        players.push({
            name: name,
            admin: false,
            answers: {
                ans: Array(9),
                cor: Array(9).fill('0')
            },
            points: 0
        })
    }
    const isAdmin = (name) => {
        if (players.find(p => p.name === name).admin) return true
        return false
    }
    const submitAnswers = (name, answers) => {
        if (!start) return
        console.log('gameSubmitAnswers')
        console.log('start', start)
        let p = players.find(p => p.name === name)
        console.log('p', p)
        let i = 0
        for (const ans of answers) {
            p.answers.ans[i] = ans
            ++i
        }
        //nswers.forEach((ans, ind) => { p.answers[ind][0] = 1; console.log('p.answers[ind][0]', p.answers[ind][0]) })
        console.log('p', p)
    }

    const printAnswers = (name) => {
        console.log(players.find(p => p.name === name))
    }

    const calculateCategory = (answers, index) => {
        let collectedAnswers = []

        for (const player of players) {
            for (const ans of answers) {
                if (player.answers.ans[index].toLowerCase() === ans.toLowerCase()) {
                    player.answers.cor[index] = '1'
                    const playerAnswerArray = collectedAnswers.filter(c => c.answer === ans)
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
                        answer: ans,
                        player: player
                    })
                }
            }
        }
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));


    const calculateResults = (answers) => {

        answers.forEach((ansCategory, ind) => {
            calculateCategory(ansCategory, ind)
        })
        return players
    }

    const startRound = async (answers) => {
        start = true
        console.log('letter', letter)
        console.log('answers', answers)

        console.log('time', time)
        await delay(time * 1000 + 1000);
        calculateResults(answers)
        return players

    }



    return {
        getTime,
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

module.exports = createRound;