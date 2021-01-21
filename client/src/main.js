import {
    Odgovori
} from "./odgovori.js"
import {
    Igrica
} from "./igrica.js"
import {
    Igraci
} from "./igraci.js";


(() => {
    const sock = io();

    const o = new Odgovori("", "", "", "");
    o.crtaj(document.body);

//    const igrica = new Igrica("", 60);
    const igrac = new Igraci(sock);
    igrac.crtaj(document.body);

    // igrica.dodajOdgovore(o);
    // igrica.dodajIgrace(igrac);
    // igrac.dodajIgrica(igrica);


})()