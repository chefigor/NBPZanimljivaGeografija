export class Odgovori {
    constructor(username, drzava, gradovi, jezera, planine, reke, zivotinje, biljke, mora, predmeti) {
        this.username = username;
        this.drzava = drzava;
        this.gradovi = gradovi;
        this.jezera = jezera;
        this.planine = planine;
        this.reke = reke;
        this.zivotinje = zivotinje;
        this.biljke = biljke;
        this.mora = mora;
        this.predmeti = predmeti;
        this.mini_kontejner = null;
    }

    brojac = 0;
    Niz = ["username", "drzava", "gradovi", "jezera", "planine", "reke", "zivotinje", "biljke", "mora", "predmeti"];

    crtaj(rod) {

        if (!rod) {
            throw new exception("Greska prilikom ucitavanja odgovora");
        }

        const mini_kontejner = document.createElement("div");
        this.mini_kontejner = mini_kontejner;
        mini_kontejner.className = "mini";
        rod.appendChild(mini_kontejner);

        const pregled_Odgovora = document.createElement("div");
        pregled_Odgovora.className = "pregled_Odgovora";
        mini_kontejner.appendChild(pregled_Odgovora);



        this.Niz.forEach((element, index) => {

            const polja = document.createElement("div");
            polja.className = element;
            polja.id = "polje";
            pregled_Odgovora.appendChild(polja);

            const labela = document.createElement("label");
            labela.innerHTML = element;
            polja.appendChild(labela);



            const odgovori_igraca = document.createElement("div");
            odgovori_igraca.className = element;
            odgovori_igraca.style.opacity = 1;
            odgovori_igraca.innerHTML = "";

            polja.appendChild(odgovori_igraca);

        })
    }




    napraviRed(username, drzava, gradovi, jezera, planine, reke, zivotinje, biljke, mora, predmeti) {


        var username_div = this.mini_kontejner.querySelector(".username");
        var drzava_div = this.mini_kontejner.querySelector(".drzava");
        var gradovi_div = this.mini_kontejner.querySelector(".gradovi");
        var jezera_div = this.mini_kontejner.querySelector(".jezera");
        var planine_div = this.mini_kontejner.querySelector(".planine");
        var reke_div = this.mini_kontejner.querySelector(".reke");
        var zivotinje_div = this.mini_kontejner.querySelector(".zivotinje");
        var biljke_div = this.mini_kontejner.querySelector(".biljke");
        var mora_div = this.mini_kontejner.querySelector(".mora");
        var predmeti_div = this.mini_kontejner.querySelector(".predmeti");

        var d = this.mini_kontejner.querySelector(".drzava");
        var g = this.mini_kontejner.querySelector(".gradovi");
        var j = this.mini_kontejner.querySelector(".jezera");
        var p = this.mini_kontejner.querySelector(".planine");
        var r = this.mini_kontejner.querySelector(".reke");
        var z = this.mini_kontejner.querySelector(".zivotinje");
        var b = this.mini_kontejner.querySelector(".biljke");
        var m = this.mini_kontejner.querySelector(".mora");
        var pr = this.mini_kontejner.querySelector(".predmeti");

        const div0 = document.createElement('div')
        div.className = "div"
        div.innerHTML = username;
        username_div.appendChild(div0)



        const div = document.createElement("div");
        div.className = "div";
        div.innerHTML = drzava;

        drzava_div.appendChild(div);


        const div2 = document.createElement("div");
        div2.className = "div";
        div2.innerHTML = gradovi;
        gradovi_div.appendChild(div2);

        const div3 = document.createElement("div");
        div3.className = "div";
        div3.innerHTML = jezera;
        jezera_div.appendChild(div3);

        const div4 = document.createElement("div");
        div4.className = "div";
        div4.innerHTML = planine;
        planine_div.appendChild(div4);

        const div5 = document.createElement("div");
        div5.className = "div";
        div5.innerHTML = reke;
        reke_div.appendChild(div5);

        const div6 = document.createElement("div");
        div6.className = "div";
        div6.innerHTML = zivotinje;
        zivotinje_div.appendChild(div6);

        const div7 = document.createElement("div");
        div7.className = "div";
        div7.innerHTML = biljke;
        biljke_div.appendChild(div7);

        const div8 = document.createElement("div");
        div8.className = "div";
        div8.innerHTML = mora;
        mora_div.appendChild(div8);

        const div9 = document.createElement("div");
        div9.className = "div";
        div9.innerHTML = predmeti;
        predmeti_div.appendChild(div9);

    }




}