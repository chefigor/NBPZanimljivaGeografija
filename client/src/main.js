

import {
    CountDownTimer
} from "./countdown-timer.js"

const letters = ['a', 'b', 'c', 'č', 'ć', 'd', 'dž', 'đ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'j', 'm', 'n', 'n', 'nj', 'o', 'p', 'r', 's', 'š', 't', 'u', 'v', 'z', 'ž']
let username;
let key;
let time;
let numPlayers


(() => {
    const sock = io();

    const btncreate = document.getElementById('btn-create')

    btncreate.onclick = () => {
        username = document.getElementById('username-create').value
        key = document.getElementById('code-create').value;
        time = document.getElementById('time-create').value;
        numPlayers = document.getElementById('numPlayers-create').value
        sock.emit('create', {
            username: username,
            numPlayers: numPlayers,
            time: time,
            key: key
        })
        const table = document.getElementById('table');
        table.classList.remove('hidden')
        const input_container = document.getElementById('input-container')
        input_container.classList.remove('hidden')
        const form = document.querySelector('.form-wrapper')
        form.remove();

        const res = document.getElementById('res')
        const startbutton = document.getElementById('button-start')
        startbutton.classList.remove('hidden')
        startbutton.onclick = () => {
            sock.emit('start', { username: username, key: key })
            submit.disabled = false;
            startbutton.disabled = true;
        }
        const submit = document.getElementById('btn-submit')
        submit.onclick = () => {
            const drzava = document.getElementById('drzava').value ?? ""
            const grad = document.getElementById('grad').value ?? ""
            const jezero = document.getElementById('jezero').value ?? ""
            const planina = document.getElementById('planina').value ?? ""
            const reka = document.getElementById('reka').value ?? ""
            const zivotinja = document.getElementById('zivotinja').value ?? ""
            const biljka = document.getElementById('biljka').value ?? ""
            const more = document.getElementById('more').value ?? ""
            const predmet = document.getElementById('predmet').value ?? ""
            const answers = [drzava, grad, jezero, planina, reka, zivotinja, biljka, more, predmet]
            sock.emit('submitAnswers', { answers: answers, key: key, username: username })
            submit.disabled = true;
        }
        sock.on(`gameStart:${key}`, ({ time, letter }) => {
            console.log('time', time)
            console.log('parseInt(time)', parseInt(time))
            const info = document.getElementById('info')
            info.innerHTML += `<h1>   Generisano slovo ${letters[letter - 1]}  </h1>`

            const display = document.getElementById('time')
            var timer = new CountDownTimer(parseInt(time))
            timer.onTick(format).onTick(restart).start();
            function format(minutes, seconds) {
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                display.textContent = minutes + ':' + seconds;
            }
            function restart() {
                if (this.expired()) {
                    submit.click();
                }
            }

        })
        sock.on(`results:${key}`, ({ results }) => {
            console.log('results', results)
            res.innerHTML = ""
            for (const player of results) {
                const row = document.createElement('tr')
                const name = document.createElement('td')
                name.innerHTML = player.name;
                row.appendChild(name)
                console.log('player.answers', player.answers)
                let i = 0
                for (const ans of player.answers.ans) {
                    const td = document.createElement('td')
                    td.innerHTML = ans ?? "";
                    if (player.answers.cor[i] === '1')
                        td.classList.add('bg-primary')
                    else if (player.answers.cor[i] === '0')
                        td.classList.add('bg-danger')
                    ++i
                    row.appendChild(td);
                }
                const points = document.createElement('td')
                points.innerHTML = player.points
                row.appendChild(points)
                res.appendChild(row)
            }
        })
        sock.on(`playerJoined:${key}`, ({
            players,
            numPlayers
        }) => {
            res.innerHTML = ""
            for (const player of players) {
                const row = document.createElement('tr')
                const name = document.createElement('td')
                name.innerHTML = player.name;
                row.appendChild(name)
                for (const ans of player.answers.ans) {
                    const td = document.createElement('td')
                    td.innerHTML = ans ?? "";
                    row.appendChild(td);
                }
                const points = document.createElement('td')
                points.innerHTML = player.points
                row.appendChild(points)
                res.appendChild(row)
            }
            const info = document.getElementById('info')
            info.innerHTML = `<h1> Max broj igraca ${numPlayers}</h1>`
            info.innerHTML += `<h1>Kljuc za sobu je ${key}</h1>`

        })
    }

    const btnjoin = document.getElementById('btn-join')
    btnjoin.onclick = () => {
        username = document.getElementById('username-join').value
        key = document.getElementById('code-join').value;
        const table = document.getElementById('table');
        table.classList.remove('hidden')
        const input_container = document.getElementById('input-container')
        input_container.classList.remove('hidden')
        const form = document.querySelector('.form-wrapper')
        form.remove();
        const res = document.getElementById('res')
        const submit = document.getElementById('btn-submit')
        sock.emit('join', { username: username, key: key })
        submit.disabled = false;
        submit.onclick = () => {
            const drzava = document.getElementById('drzava').value ?? ""
            const grad = document.getElementById('grad').value ?? ""
            const jezero = document.getElementById('jezero').value ?? ""
            const planina = document.getElementById('planina').value ?? ""
            const reka = document.getElementById('reka').value ?? ""
            const zivotinja = document.getElementById('zivotinja').value ?? ""
            const biljka = document.getElementById('biljka').value ?? ""
            const more = document.getElementById('more').value ?? ""
            const predmet = document.getElementById('predmet').value ?? ""
            const answers = [drzava, grad, jezero, planina, reka, zivotinja, biljka, more, predmet]
            sock.emit('submitAnswers', { answers: answers, key: key, username: username })
            submit.disabled = true;
        }
        sock.on(`gameStart:${key}`, ({ time, letter }) => {
            console.log('time', time)
            console.log('parseInt(time)', parseInt(time))
            const info = document.getElementById('info')
            info.innerHTML += `<h1>   Generisano slovo ${letters[letter - 1]}  </h1>`

            const display = document.getElementById('time')
            var timer = new CountDownTimer(parseInt(time))
            timer.onTick(format).onTick(restart).start();
            function format(minutes, seconds) {
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                display.textContent = minutes + ':' + seconds;
            }
            function restart() {
                if (this.expired()) {
                    submit.click();
                }
            }

        })
        sock.on(`results:${key}`, ({ results }) => {
            console.log('results', results)
            res.innerHTML = ""
            for (const player of results) {
                const row = document.createElement('tr')
                const name = document.createElement('td')
                name.innerHTML = player.name;
                row.appendChild(name)
                console.log('player.answers', player.answers)
                let i = 0
                for (const ans of player.answers.ans) {
                    const td = document.createElement('td')
                    td.innerHTML = ans ?? "";
                    if (player.answers.cor[i] === '1')
                        td.classList.add('bg-primary')
                    else if (player.answers.cor[i] === '0')
                        td.classList.add('bg-danger')
                    ++i
                    row.appendChild(td);
                }
                const points = document.createElement('td')
                points.innerHTML = player.points
                row.appendChild(points)
                res.appendChild(row)
            }
        })
        sock.on(`playerJoined:${key}`, ({
            players,
            numPlayers
        }) => {
            res.innerHTML = ""
            for (const player of players) {
                const row = document.createElement('tr')
                const name = document.createElement('td')
                name.innerHTML = player.name;
                row.appendChild(name)
                for (const ans of player.answers.ans) {
                    const td = document.createElement('td')
                    td.innerHTML = ans ?? "";
                    row.appendChild(td);
                }
                const points = document.createElement('td')
                points.innerHTML = player.points
                row.appendChild(points)
                res.appendChild(row)
            }
            const info = document.getElementById('info')
            info.innerHTML = `<h1> Max broj igraca ${numPlayers}</h1>`
            info.innerHTML += `<h1>Kljuc za sobu je ${key}</h1>`
        })
    }
})()