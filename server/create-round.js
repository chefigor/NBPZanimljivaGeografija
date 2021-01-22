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
            answers: [],
            points: 0
        })
    }
    const addPlayer = (name) => {
        if (players.length >= numPlayers || players.filter(p => p.name === name).length > 0) return
        players.push({
            name: name,
            admin: false,
            answers: [],
            points: 0
        })
    }
    const isAdmin = (name) => {
        if (players.find(p => p.name === name).admin) return true
        return false
    }
    const submitAnswers = (name, answers) => {
        if (!start) return
        console.log('start', start)
        let p = players.find(p => p.name === name)
        answers.forEach((ans, ind) => p.answers.push(ans))
    }

    const printAnswers = (name) => {
        console.log(players.find(p => p.name === name))
    }

    const calculateCategory = (answers, index) => {
        let collectedAnswers = []
        console.log('answers', answers)
        console.log('index', index)

        for (const player of players) {
            for (const ans of answers) {
                if (player.answers[index].toLowerCase() === ans) {
                    console.log('object', player.answers[index])
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


    const calculateResults = () => {

        answers.forEach((ansCategory, ind) => {
            calculateCategory(ansCategory, ind)
        })
        return players
    }

    const startRound = async () => {
        start = true
        console.log('time', time)
        await delay(time * 1000 + 1000);
        calculateResults()
        return players

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

module.exports = createRound;