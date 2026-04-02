# ⚽ FC Programare Web - Management Club Fotbal

Acest proiect reprezintă o platformă de management sportiv dezvoltată pentru laboratoarele de Programare Web. [cite_start]Accentul este pus pe manipularea DOM-ului folosind **Vanilla JavaScript**, fără biblioteci externe precum jQuery[cite: 3].

---

## 📂 Structura Proiectului
* `index.html` - Dashboard principal: Știri automate, Lotul de seniori și Galerie foto.
* [cite_start]`autentificare.html` - Formular de înregistrare cu validări complexe[cite: 4].
* [cite_start]`administrare.html` - Panou pentru staff: Adăugare jucători și selecție locație[cite: 18].
* `stil.css` - Arhitectura vizuală și design responsiv.
* `script.js` - Logica de interactivitate și manipulare a datelor.

---

## ⚙️ Implementare Laborator 3 - JavaScript

### 1. Validarea Datelor din Formulare (3p)
[cite_start]Sistemul de validare oferă feedback vizual instat prin buline colorate (roșu pentru invalid, verde pentru valid) la fiecare schimbare a conținutului[cite: 6, 8, 11].
* [cite_start]**Input-uri Text**: Acceptă exclusiv litere mici și cifre[cite: 5].
* [cite_start]**Parolă**: Trebuie să conțină litere mari, litere mici, cifre și caracterul special `!`[cite: 7, 8].
* [cite_start]**E-mail**: Permite litere, cifre și punct; trebuie să conțină exact un caracter `@` și cel puțin un punct[cite: 9, 10].
* [cite_start]**Telefon**: Respectă formatul strict `(+40) 777 777 777`, acceptând caracterele `+`, `(`, `)` și cifre[cite: 12].
* [cite_start]**Data Calendaristică**: Funcție de validare care suportă formatele `zz/ll/aaaa`, `ll/zz/aaaa` și `zz/ll/aa`[cite: 13, 16]. [cite_start]Aceasta verifică logic corectitudinea datei (ex: respinge 29 februarie în ani nebisecți)[cite: 15].
* [cite_start]**Validare la Submit**: La apăsarea butonului de trimitere, toate datele sunt verificate conform regulilor impuse[cite: 17].

### 2. Dropdown-uri Dinamice (1p)
* [cite_start]Pe pagina de administrare au fost create două liste derulante construite dinamic[cite: 18].
* [cite_start]Primul meniu conține județe, iar al doilea se actualizează automat cu orașele corespunzătoare județului selectat[cite: 19, 20].

### 3. Sortarea Tabelului (2p)
* [cite_start]S-a implementat o logică de sortare reutilizabilă pentru orice tabel din site care nu are `colspan`/`rowspan`[cite: 21, 23].
* [cite_start]La click pe o celulă din antet (Header), rândurile se sortează crescător sau descrescător în funcție de valorile de pe coloana respectivă[cite: 21, 22].

### 4. Lista de Știri cu Tranziție (2p)
* [cite_start]Secțiunea "Ultimele Noutăți" utilizează o listă (`<ul>`) unde fiecare element conține text (`<div>`) și un link "Read more" (`<a>`)[cite: 24, 25].
* [cite_start]Elementele sunt ascunse inițial prin CSS, cu excepția primului[cite: 26, 27].
* [cite_start]**Automatizare**: Afișarea următorului element se face printr-un efect de tranziție după $n$ secunde[cite: 28].
* [cite_start]**Control Manual**: Butoanele "Next" și "Previous" permit navigarea printre știri fără a aștepta intervalul de timp[cite: 29].

### 5. Slider de Imagini Avansat (2p)
[cite_start]Upgrade-ul slider-ului din laboratorul de CSS include acum următoarele funcționalități JS[cite: 30]:
* [cite_start]Buton de **Play / Pauză** pentru derularea automată[cite: 30].
* [cite_start]Checkbox de **Repetare** care, odată bifat, reia slideshow-ul după ultima imagine[cite: 30].
* [cite_start]Combobox (dropdown) pentru selectarea **intervalului de timp** la care se schimbă imaginile[cite: 30].

---

## 🚀 Instrucțiuni de Rulare
1.  Descărcați arhiva proiectului.
2.  Asigurați-vă că toate imaginile și fișierele `.css` / `.js` sunt în același director sau în căile specificate.
3.  Deschideți `index.html` în orice browser modern.