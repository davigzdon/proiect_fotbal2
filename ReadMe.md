# ⚽ FC Programare Web - Management Club Fotbal

Acest proiect reprezintă o platformă de management sportiv dezvoltată pentru laboratoarele de Programare Web. Accentul este pus pe manipularea DOM-ului folosind **Vanilla JavaScript**, fără biblioteci externe precum jQuery.

---

## 📂 Structura Proiectului
* `index.html` - Dashboard principal: Știri automate, Lotul de seniori și Galerie foto.
* `autentificare.html` - Formular de înregistrare cu validări complexe.
* `administrare.html` - Panou pentru staff: Adăugare jucători și selecție locație.
* `stil.css` - Arhitectura vizuală și design responsiv.
* `script.js` - Logica de interactivitate și manipulare a datelor.

---

## ⚙️ Implementare Laborator 3 - JavaScript

### 1. Validarea Datelor din Formulare
Sistemul de validare oferă feedback vizual instat prin buline colorate (roșu pentru invalid, verde pentru valid) la fiecare schimbare a conținutului.
* **Input-uri Text**: Acceptă exclusiv litere mici și cifre.
* **Parolă**: Trebuie să conțină litere mari, litere mici, cifre și caracterul special `!`.
* **E-mail**: Permite litere, cifre și punct; trebuie să conțină exact un caracter `@` și cel puțin un punct.
* **Telefon**: Respectă formatul strict `(+40) 777 777 777`, acceptând caracterele `+`, `(`, `)` și cifre.
* **Data Calendaristică**: Funcție de validare care suportă formatele `zz/ll/aaaa`, `ll/zz/aaaa` și `zz/ll/aa`. Aceasta verifică logic corectitudinea datei (ex: respinge 29 februarie în ani nebisecți).
* **Validare la Submit**: La apăsarea butonului de trimitere, toate datele sunt verificate conform regulilor impuse.

### 2. Dropdown-uri Dinamice
* Pe pagina de administrare au fost create două liste derulante construite dinamic.
* Primul meniu conține județe, iar al doilea se actualizează automat cu orașele corespunzătoare județului selectat.

### 3. Sortarea Tabelului
* S-a implementat o logică de sortare reutilizabilă pentru orice tabel din site care nu are `colspan`/`rowspan`.
* La click pe o celulă din antet (Header), rândurile se sortează crescător sau descrescător în funcție de valorile de pe coloana respectivă.

### 4. Lista de Știri cu Tranziție
* Secțiunea "Ultimele Noutăți" utilizează o listă (`<ul>`) unde fiecare element conține text (`<div>`) și un link "Read more" (`<a>`).
* Elementele sunt ascunse inițial prin CSS, cu excepția primului.
* **Automatizare**: Afișarea următorului element se face printr-un efect de tranziție după un interval de timp setat.
* **Control Manual**: Butoanele "Next" și "Previous" permit navigarea printre știri fără a aștepta intervalul de timp.

### 5. Slider de Imagini Avansat
Upgrade-ul slider-ului include acum următoarele funcționalitătii JS:
* Buton de **Play / Pauză** pentru derularea automată.
* Checkbox de **Repetare** care, odată bifat, reia slideshow-ul după ultima imagine.
* Combobox (dropdown) pentru selectarea **intervalului de timp** la care se schimbă imaginile.

---

## 🚀 Instrucțiuni de Rulare
1.  Descărcați arhiva proiectului.
2.  Asigurați-vă că toate imaginile și fișierele `.css` / `.js` sunt în același director.
3.  Deschideți `index.html` în browser.