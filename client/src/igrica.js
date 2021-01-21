export class Igrica {
    constructor(ime_Igraca) {
        this.ime_Igraca = ime_Igraca;
        this.timer = 0;
        this.nizOdgovora = [];
        this.kontejner = null;
        this.nizIgraca = [];
    }

    dodajIgrace(igraci) {
        this.nizIgraca.push(igraci);

    }


   


    dodajOdgovore(odgovori) {
        this.nizOdgovora.push(odgovori);
    }

    Niz = ["drzava", "gradovi", "jezera", "planine", "reke", "zivotinje", "biljke", "mora", "predmeti"];
    slova = ["a", "b", "v", "g", "d", "đ", "e", "ž"];
    random = parseInt((Math.random() * 8));

    crtaj(host) {
        if (!host) {
            throw new exception("Greska pri ucitavanju hosta");
        }

        const kontejner = document.createElement("div");
        this.kontejner = kontejner;
        kontejner.className = "kontejner";


        host.appendChild(kontejner);

        this.Niz.forEach((element, index) => {

            const red = document.createElement("div");
            red.className = "red1";

            const labela = document.createElement("label");
            labela.innerHTML = element;

            const input = document.createElement("input");
            input.id = index;
            input.type = "number";

            input.className = element;
            input.type = "text";



            kontejner.appendChild(red);
            kontejner.appendChild(labela);
            kontejner.appendChild(input);




        });

        
        


        const div_dugme_vreme = document.createElement("div");

        const dugme = document.createElement("button");
        dugme.className = "dugme";

        const vreme = document.createElement("label");
        vreme.className = "vreme";



        dugme.innerHTML = "Potvrdi Odgovore";
        div_dugme_vreme.appendChild(dugme);
        div_dugme_vreme.appendChild(vreme);
        kontejner.appendChild(div_dugme_vreme);

        dugme.onclick = (e) => {

            this.prosledi_odgovore();
            var d = document.querySelector(".drzava");
            d.disabled = true;

            var g = document.querySelector(".gradovi");
            g.disabled = true;

            var j = document.querySelector(".jezera");
            j.disabled = true;

            var plani = document.querySelector(".planine");
            plani.disabled = true;

            var r = document.querySelector(".reke");
            r.disabled = true;


            var z = document.querySelector(".zivotinje");
            z.disabled = true;

            var b = document.querySelector(".biljke");
            b.disabled = true;

            var m = document.querySelector(".mora");
            m.disabled = true;


            var pred = document.querySelector(".predmeti");
            pred.disabled = true;
            dugme.disabled = true;


        }



        const nova_runda = document.createElement("button");
        nova_runda.className = "nova_runda";
        nova_runda.innerHTML = "Nova runda";
        nova_runda.disabled = true;
        kontejner.appendChild(nova_runda);

        const div_za_slovo = document.createElement("div");
        div_za_slovo.className = "div_za_slovo";


        const labelaa = document.createElement("label");
        labelaa.className = "labelaa";
        labelaa.innerHTML = "generisano slovo=" + this.slova[this.random];

        div_za_slovo.appendChild(labelaa);



        kontejner.appendChild(div_za_slovo);

        nova_runda.onclick = (e) => {
            this.Nova_runda();
        }

        
        this.startTimer();

    }

ucitajVreme(v)
{
    this.timer = v;
}

    startTimer() {
        var af = this.timer;
        var self = this;
        var a = setInterval(function () {
            var za_hideovanje_dugmeta = document.querySelector(".dugme");
            var vreme = document.querySelector(".vreme");
            vreme.innerHTML = "Vreme:" + af;

            af = af - 1;

            if (af == -1 && za_hideovanje_dugmeta.disabled == false) {


                za_hideovanje_dugmeta.disabled = true;
                vreme.innerHTML = "Vreme je isteklo!";

                var nova_runda = document.querySelector(".nova_runda");
                nova_runda.disabled = false;


                //disableovi

                var d = document.querySelector(".drzava");
                d.disabled = true;

                var g = document.querySelector(".gradovi");
                g.disabled = true;

                var j = document.querySelector(".jezera");
                j.disabled = true;

                var plani = document.querySelector(".planine");
                plani.disabled = true;

                var r = document.querySelector(".reke");
                r.disabled = true;


                var z = document.querySelector(".zivotinje");
                z.disabled = true;

                var b = document.querySelector(".biljke");
                b.disabled = true;

                var m = document.querySelector(".mora");
                m.disabled = true;


                var pred = document.querySelector(".predmeti");
                pred.disabled = true;

                self.prosledi_odgovore()
                clearInterval(a);




            }

            if (af == -1) {
                clearInterval(a);
                var v = document.querySelector(".nova_runda");
                v.disabled = false;
            }








        }, 1000);

    }


    Nova_runda() {

        var random = parseInt((Math.random() * 8));
        var l = this.kontejner.querySelector(".labelaa");
        l.innerHTML = "generisano slovo=" + this.slova[random];

        var d = document.querySelector(".drzava");
        d.disabled = false;


        var g = document.querySelector(".gradovi");
        g.disabled = false;


        var j = document.querySelector(".jezera");
        j.disabled = false;




        var plani = document.querySelector(".planine");
        plani.disabled = false;

        var r = document.querySelector(".reke");
        r.disabled = false;


        var z = document.querySelector(".zivotinje");
        z.disabled = false;



        var b = document.querySelector(".biljke");
        b.disabled = false;

        var m = document.querySelector(".mora");
        m.disabled = false;



        var pred = document.querySelector(".predmeti");
        pred.disabled = false;




        var v = document.querySelector(".nova_runda");
        v.disabled = true;

        var n = document.querySelector(".dugme");
        n.disabled = false;
        this.OcistiInput();
        this.startTimer();


    }
    

    OcistiInput() {
        var input_drzava = this.kontejner.querySelector(".drzava");
        input_drzava.value = "";

        var input_gradovi = this.kontejner.querySelector(".gradovi");
        input_gradovi.value = "";

        var input_jezera = this.kontejner.querySelector(".jezera");
        input_jezera.value = "";


        var input_planine = this.kontejner.querySelector(".planine");
        input_planine.value = "";

        var input_reke = this.kontejner.querySelector(".reke");
        input_reke.value = "";

        var input_zivotinje = this.kontejner.querySelector(".zivotinje");
        input_zivotinje.value = "";

        var input_biljke = this.kontejner.querySelector(".biljke");
        input_biljke.value = "";

        var input_mora = this.kontejner.querySelector(".mora");
        input_mora.value = "";

        var input_predmeti = this.kontejner.querySelector(".predmeti");
        input_predmeti.value = "";

    }

    prosledi_odgovore() {



        var drzava = this.kontejner.querySelector(".drzava").value;
        console.log(drzava);

        

        
        var gradovi = this.kontejner.querySelector(".gradovi").value;
        console.log(gradovi);

        var jezera = this.kontejner.querySelector(".jezera").value;
        console.log(jezera);

        var planine = this.kontejner.querySelector(".planine").value;
        console.log(planine);

        var reke = this.kontejner.querySelector(".reke").value;
        console.log(reke);

        var zivotinje = this.kontejner.querySelector(".zivotinje").value;
        console.log(zivotinje);

        var biljke = this.kontejner.querySelector(".biljke").value;
        console.log(biljke);

        var mora = this.kontejner.querySelector(".mora").value;
        console.log(mora);

        var predmeti = this.kontejner.querySelector(".predmeti").value;
        console.log(predmeti);




        this.nizOdgovora.forEach(element => {

            element.napraviRed(drzava, gradovi, jezera, planine, reke, zivotinje, biljke, mora, predmeti);
        });



    }

}