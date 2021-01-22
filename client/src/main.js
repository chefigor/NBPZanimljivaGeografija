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


    const igraci = new Igraci(sock);
    igraci.crtaj(document.body);


})()