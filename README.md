# Viesbutis_IS
## Sprendžiamo uždavinio aprašymas
### Sistemos paskirtis

Projekto tikslas – sukurti viešbučio rezervacijos sistemą, kuri leistų peržiūrėti bei rezervuotis pasirinktus viešbučio kambarius.
Vartotojas, naudojantis šia sistema, galės pasirinkti skirtingus viešbučio padalinius, tam tikro padalinio korpusą bei tinkamą kambarį. Jei pasirinktas kambarys yra laisvas, vartotojas galės jį rezervuoti. Vartotojas galės rūšiuoti kambarius pagal kainą, reitingą, jos tipą bei pagal pasirinktą padalinį arba korpusą.
### Funkciniai reikalavimai

#### Svečias sistemoje galės:
1.	Prisiregistruoti prie viešbučio rezervacijos sistemos.
2.	Rūšiuoti viešbučio kambarius pagal reitingą, kainą, tipą bei jos vietovę.
3.	Peržiūrėti pasirinkto kambario detalią informaciją.
#### Registruotas vartotojas sistemoje galės:
1.	Prisijungti prie sistemos.
2.	Atsijungti nuo sistemos.
3.	Rūšiuoti viešbučio kambarius pagal reitingą, kainą, tipą bei jos lokaciją.
4.	Peržiūrėti kambario informaciją.
5.	Rezervuoti laisvą kambarį:
     * 5.1.	Pridėti papildomą kambarį prie rezervacijos.
     * 5.2.	Atšaukti rezervaciją.
6.	Rašyti komentarus:
     * 6.1.	Peržiūrėti komentarus.
     * 6.2.	Redaguoti parašytą komentarą.
     * 6.3.	Ištrinti komentarą.
7.	Reitinguoti:
     * 7.1.	Peržiūrėti kambarių reitingus.
     * 7.2.	Koreguoti reitingą.
     * 7.3.	Šalinti reitingą.
#### Administratorius sistemoje galės:
1.	Pridėti naujus viešbučio padalinius, korpusus ir kambarius.
2.	Redaguoti kiekvieno objekto informaciją.
3.	Šalinti komentarus, reitingus, kambarius.
4.	Šalinti registruotus vartotojus.

## Sistemos architektūra

Viešbučio rezervacijos sistemos sudedamosios dalys:
*	Kliento pusė – naudojama React.js;
*	Serverio pusė – naudojama C#.
*	Domenų bazė – MySQL.

1 pav. pavaizduota programos diegimo diagrama. Programa ir jos duomenų bazė bus keliama į „Microsoft Azure“ serverį. Internetinė aplikacija bei „Viesbutis_IS“ API bus pasiekiami per HTTPS protokolą. „Viesbutis_IS“ API leis per TCP/IP ryšį pasiekti bei koreguoti programos duomenų bazę.

![alt text](https://github.com/SuveizdisT/Viesbutis_IS/blob/main/deployment.png?raw=true) 
1 pav. Sistemos „Viesbutis_IS“ diegimo diagrama

## Naudotojo sąsaja

## API specifikacija
