export class Igraci {

    constructor(socket, username, status, poeni, timer) {
        this.username = username;
        this.status = 0;
        this.poeni = 0;
        this.mini_kontejner = null;
        this.timer = timer;
        this.nizIgrica = [];
        this.sock = socket;
        this.slova = ["a", "b", "c", "č", "ć", "d", "dž", "đ"];
        this.numPlayers;
        this.key;
    }


    dodajIgrica(igraci, num) {
        this.obrisiTabelu()
        this.numPlayers = num;
        this.nizIgrica = igraci;
        this.Kreiraj_Tablicu()
    }

    obrisiTabelu() {

        const d = document.querySelector('.div_statistika').innerHTML = ""
    }



    flag = true;

    size = 0;

    NizSelectOpcija = ["1", "2", "3", "4"];

    crtaj(rod) {
        if (!rod) {
            throw new exception("Greska");
        }

        const mini_kontejner = document.createElement("div");
        this.mini_kontejner = mini_kontejner;
        mini_kontejner.className = "mini_kontejner";
        rod.appendChild(mini_kontejner);
        mini_kontejner.style.height = this.size;

        const donji_kontejner = document.createElement("div");
        donji_kontejner.className = "donji_kontejner";
        mini_kontejner.appendChild(donji_kontejner);


        const desni_kontejner = document.createElement("div");
        desni_kontejner.className = "desni_kontejner";
        mini_kontejner.appendChild(desni_kontejner);



        const dugme_prijava_za_igru = document.createElement("button");
        dugme_prijava_za_igru.className = "dugme_prijava_za_igru";
        donji_kontejner.appendChild(dugme_prijava_za_igru);
        dugme_prijava_za_igru.innerHTML = "Log in";
        this.Kreiraj_Tablicu();

        // dugme_prijava_za_igru.onclick = (e) => {
        //     if (this.flag == true)

        //     {

        mini_kontejner.style.height = "300px";
        const labela = document.createElement("label");
        labela.className = "labela_dobrodosli";
        labela.innerHTML = "Dobrodosli u nasu nacionalnu geografiju!"
        donji_kontejner.appendChild(labela);

        const div_username = document.createElement("div");
        div_username.className = "div_username";

        const labela_Ime = document.createElement("label");
        labela_Ime.className = "labela_Ime";
        labela_Ime.innerHTML = "Unesite vas username";

        div_username.appendChild(labela_Ime);
        donji_kontejner.appendChild(div_username);




        const input_username = document.createElement("input");
        input_username.type = "text";
        input_username.className = "username";
        input_username.value = this.username;
        input_username.disabled = false;
        donji_kontejner.appendChild(input_username);


        dugme_prijava_za_igru.style.display = "none";

        const labela_vreme = document.createElement("label");
        labela_vreme.className = "labela_vreme";
        labela_vreme.innerHTML = "Koliko ce trajati jedna vasa runda? (sec)";



        donji_kontejner.appendChild(labela_vreme);

        const input_vreme = document.createElement("input");
        input_vreme.type = "text";
        input_vreme.className = "input_vreme"
        donji_kontejner.appendChild(input_vreme);

        const div_za_Igraca = document.createElement("div");
        div_za_Igraca.className = "div_za_Igraca";

        const labela_brIgraca = document.createElement("label");
        labela_brIgraca.className = "labela_brIgraca";
        labela_brIgraca.innerHTML = "Broj Igraca:";


        div_za_Igraca.appendChild(labela_brIgraca);

        const broj_igraca = document.createElement("select");
        broj_igraca.className = "broj_igraca";

        this.NizSelectOpcija.forEach((element, index) => {

            const opcije = document.createElement("option");
            opcije.value = element;
            opcije.innerHTML = element;
            opcije.className = "opcije";
            broj_igraca.appendChild(opcije);
            div_za_Igraca.appendChild(broj_igraca);

        })


        const labela_postavi_sifru_za_sobu = document.createElement("label");
        labela_postavi_sifru_za_sobu.className = "labela_postavi_sifru_za_sobu";
        labela_postavi_sifru_za_sobu.innerHTML = "Sifra hosta"

        donji_kontejner.appendChild(labela_postavi_sifru_za_sobu);


        const input_za_sifru = document.createElement("input");
        input_za_sifru.type = "text";

        donji_kontejner.appendChild(input_za_sifru);



        donji_kontejner.appendChild(div_za_Igraca);
        const dugme_ready = document.createElement("button");
        dugme_ready.className = "dugme_ready";
        dugme_ready.innerHTML = "Spreman sam!";
        donji_kontejner.appendChild(dugme_ready);


        const join = document.createElement("button");
        join.className = "join";
        join.innerHTML = "Join";

        donji_kontejner.appendChild(join);


        join.onclick = (e) => {

            const div_forma_join = document.createElement("div");
            div_forma_join.className = "div_forma_join";
            div_forma_join.style.opacity = 1;


            const unos_sifre = document.createElement("input");
            unos_sifre.className = "unos";


            div_forma_join.appendChild(unos_sifre);

            const dugme_joinaj = document.createElement("button");
            dugme_joinaj.innerHTML = "Joinaj!"


            div_forma_join.appendChild(dugme_joinaj);

            rod.appendChild(div_forma_join);

            join.disabled = true;
            input_vreme.disabled = true;
            input_za_sifru.disabled = true;
            broj_igraca.disabled = true;
            dugme_ready.disabled = true;

            dugme_joinaj.onclick = (e) => {
                this.key = unos_sifre.value
                this.sock.emit('join', {
                    username: input_username.value,
                    key: this.key
                })
                this.sock.on(`playerJoined:${this.key}`, ({
                    players,
                    letter,
                    numPlayers
                }) => {
                    console.log('joined')
                    this.dodajIgrica(players, numPlayers);
                    this.prikaziSlovo(letter)
                })

                input_username.disabled = true;
                dugme_joinaj.disabled = true;
                unos_sifre.disabled = true;
                this.Kreiraj_Tablicu();
            }
        }
        dugme_ready.onclick = (e) => {
            this.key = input_za_sifru.value
            this.sock.emit('create', {
                username: input_username.value,
                numPlayers: broj_igraca.value,
                time: input_vreme,
                key: input_za_sifru.value
            })
            this.sock.on(`playerJoined:${this.key}`, ({
                players,
                letter,
                numPlayers
            }) => {
                console.log('joined')
                this.dodajIgrica(players, numPlayers);
                this.prikaziSlovo(letter)
            })
            input_username.disabled = true;
            input_vreme.disabled = true;
            broj_igraca.disabled = true;
            dugme_ready.disabled = true;
            input_za_sifru.disabled = true;
            join.disabled = true;
        }
    }



    prikaziSlovo(letter) {
        const h = document.createElement('h1')
        h.innerText = this.slova[letter - 1]
        document.body.prepend(h)

    }
    Kreiraj_Tablicu() {


        const desni_kontejner = document.querySelector(".desni_kontejner");

        const div_statistika = document.createElement("div");
        div_statistika.className = "div_statistika";
        div_statistika.style.opacity = 0;

        desni_kontejner.appendChild(div_statistika);
        this.status += 1;

        var q = this.mini_kontejner.querySelector(".div_statistika");

        q.style.opacity = 1;

        const div_statistika2 = document.createElement("div");

        div_statistika2.className = "div_statistika2";
        q.appendChild(div_statistika2);

        const div_red = document.createElement("div_red");
        div_red.className = "div_red";

        const username = document.createElement("label");
        username.innerHTML = "Username: ";
        username.className = "labela_user";


        const poeni = document.createElement("div");
        poeni.className = "labela_poeni";
        poeni.innerHTML = "Poeni";

        div_red.appendChild(username);
        div_red.appendChild(poeni);


        if (this.key) {
            const key = document.createElement('div');
            key.classList = "labela_key"
            key.innerText = this.key;
            div_red.appendChild(key);
        }



        //div za info igraca 


        for (const el of this.nizIgrica) {
            var br_Igraca = this.mini_kontejner.querySelector(".broj_igraca") ?? 0;
            const div_podaci = document.createElement("div");
            div_podaci.className = "div_podaci";



            const labela_user = document.createElement("label");
            labela_user.innerHTML = el.name;
            div_podaci.appendChild(labela_user);

            const labela_poeni = document.createElement("label");
            labela_poeni.innerHTML = el.points;
            labela_poeni.className = "labela_poeni";

            const labela_status = document.createElement("label");
            labela_status.className = "labela_status";

            labela_status.innerHTML = this.nizIgrica.length + "/" + this.numPlayers;


            const dugme_start = document.createElement("button");
            dugme_start.className = "dugme_start";
            dugme_start.innerHTML = "Start";

            //this.proslediVreme();

            div_podaci.appendChild(labela_poeni);
            div_podaci.appendChild(labela_status);
            div_podaci.appendChild(dugme_start);
            q.appendChild(div_red);
            q.appendChild(div_podaci);

            if (this.status != br_Igraca) {
                dugme_start.disabled = true;
            } else {
                dugme_start.disabled = false;
                dugme_start.onclick = (e) => {

                    this.nizIgrica.forEach(element => {

                        element.crtaj(this.mini_kontejner);
                        dugme_start.disabled = true;
                    })
                }
            }
        }






    }

    // proslediVreme() {
    //     var vreme = parseInt(this.mini_kontejner.querySelector(".input_vreme").value);

    //     this.nizIgrica.forEach(element => {
    //         element.ucitajVreme(vreme);
    //     })
    // }



}