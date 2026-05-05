# ⚽ FC Programare Web - Management Club Fotbal

Acest proiect reprezintă o platformă web interactivă pentru managementul unui club de fotbal și al academiei de juniori, dezvoltată progresiv pe parcursul laboratoarelor de Programare Web.

**Tehnologii utilizate:** HTML5, CSS3 (Flexbox, Animații), Vanilla JavaScript (Lab 3), jQuery (Lab 4).

---

## 📂 Structura Proiectului
* `index.html` - Dashboard principal: Știri automate, Lotul de seniori, Slider jQuery și panou de filtrare.
* `juniori.html` - Pagina academiei: Sistem de scouting interactiv (evaluare live).
* `autentificare.html` - Formular de înregistrare cu validări complexe în timp real.
* `administrare.html` - Panou pentru staff: Dropdown-uri dinamice înlănțuite.
* `stil.css` - Arhitectura vizuală, variabile CSS și design responsiv.
* `script.js` - Motorul de interactivitate (conține atât module Vanilla JS, cât și module jQuery).

---

## ⚙️ Implementări Anterioare (Lab 2 & Lab 3)
* **Validare Formulare (Vanilla JS):** Verificări bazate pe Expresii Regulate (RegEx) pentru validarea formatelor (email, parole complexe, numere de telefon) și un algoritm de validare logică a datelor calendaristice (inclusiv ani bisecți).
* **Interacțiune pe Tabele:** Algoritm de sortare lexicografică și numerică aplicabil pe orice structură de tip tabel (ascendent/descendent).
* **Manipulare DOM Nativă:** Slideshow de știri controlat prin `setInterval` și actualizarea dinamică a dropdown-urilor (județ-oraș) pe baza unui dicționar de date.

---

## 🚀 Implementare Laborator 4 - Ecosistemul jQuery

În această etapă s-a făcut tranziția de la Vanilla JS la biblioteca jQuery, implementând funcționalități complexe prin lanțuri de metode și manipulare asincronă a DOM-ului.

### 1. Slider Vertical Complex (Concept de Array Circular)
S-a construit un slider mixt (imagini și video) care simulează o listă infinită.
* **Logica de tranziție:** S-a utilizat metoda `.animate()` pe axa Y. Pentru a menține circularitatea, la finalizarea animației (prin *callback*), primul nod din DOM este mutat fizic la finalul listei folosind `.after()`.
* **Control:** Utilizatorul poate altera înălțimea ferestrei de vizualizare (viewport) și intervalul de rulare. S-a implementat și controlul memoriei prin utilizarea `clearInterval()` pentru funcțiile de Stop și navigație manuală.

### 2. Motor de Filtrare Avansată (Predicat Logic pe DOM)
Pentru tabelul lotului s-a dezvoltat un sistem de filtrare în timp real (Live Search), fără acționare prin buton (submit).
* **Custom Case-Insensitive Selector:** S-a extins biblioteca jQuery cu o pseudo-clasă `:containsNC` pentru a permite căutarea de tip text indiferent de capitalizare.
* **Logică AND/OR combinată:** Filtrarea evaluează fiecare rând (`<tr>`) pe baza a 3 teste simultane:
  1. *String matching* (căutare în mai multe coloane concomitent).
  2. *Reuniune (OR)* evaluată pe radio buttons (ex: apartenența la o categorie).
  3. *Intersecție (AND)* evaluată prin verificarea unui set de condiții (checkbox-uri).

### 3. Autocomplete / Live Select
* S-a înlocuit tag-ul standard `<select>` cu o structură personalizată pentru a permite căutarea în timp real în interiorul opțiunilor.
* Metoda `.filter()` din jQuery rutează ascunderea sau afișarea nodurilor de listă (`<li>`) strict pe baza potrivirii subșirului de caractere introdus, cu feedback vizual susținut de `.slideToggle()`.

### 4. Funcționalitate Creativă: Sistem de Scouting Interactiv
Pe pagina `juniori.html` a fost integrat un panou de evaluare de tip *Accordion* cu animații asincrone.
* **Navigare Ierarhică:** S-a evitat hardcodarea ID-urilor prin folosirea funcțiilor relative precum `$(this).next()` și `.find()`.
* **Sincronizare Callback:** Declanșarea barelor de progres se face exclusiv după ce animația de `.slideDown()` a containerului părinte s-a terminat, demonstrând gestionarea corectă a cozii de execuție din JavaScript.
* **Data-Binding:** Valorile de lățime pentru barele animate sunt extrase dinamic direct din atributele HTML5 (`data-valoare`).

---

## 💡 Instrucțiuni de Rulare
1. Clonați sau descărcați arhiva proiectului.
2. Nu sunt necesare procese de build (ex: npm, webpack) deoarece jQuery este importat prin CDN. Aceasta impune necesitatea unei conexiuni active la internet la prima încărcare.
3. Deschideți `index.html` pentru interfața principală și `juniori.html` pentru demonstrația sistemului de scouting.