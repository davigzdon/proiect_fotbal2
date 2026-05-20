# ⚽ FC Programare Web - Sistem de Management Club Fotbal

Acesta este un proiect universitar full-stack dezvoltat pentru laboratoarele de Programare Web (Sesiuni, PHP, MySQL, AJAX). Aplicația reprezintă un portal de prezentare și management pentru un club de fotbal, oferind funcționalități dinamice bazate pe roluri de utilizator.

## 🚀 Funcționalități Principale

### 1. Sistem de Autentificare și Sesiuni (PHP)
* **Înregistrare și Login:** Sistem securizat cu parole criptate (`password_hash`).
* **Managementul Sesiunii:** Utilizarea `$_SESSION` pentru menținerea stării de autentificare.
* **Controlul Accesului (Roluri):** * `User`: Poate interacționa cu site-ul (rezervări bilete, salvare favorite).
  * `Admin`: Are acces exclusiv la un panou de control (Administrare Lot).

### 2. Sistem CRUD Complet (Management Lot)
Administratorii pot gestiona lotul de seniori direct din interfața web, datele fiind sincronizate cu baza de date MySQL:
* **C (Create):** Adăugare de jucători noi în baza de date dintr-un formular.
* **R (Read):** Generarea dinamică a listei de jucători pe prima pagină.
* **U (Update):** Formular precompletat inteligent pentru modificarea statisticilor jucătorilor existenți.
* **D (Delete):** Eliminarea jucătorilor din lot.

### 3. Integrare AJAX Asincronă
Cerințe avansate de interfață rezolvate prin interogări în fundal (`fetch API`), fără reîncărcarea paginii:
* **Rezervare Bilete:** Procesează cererile de bilete doar pentru utilizatorii autentificați.
* **Echipa mea Favorită (Toggle):** Sistem de adăugare/eliminare jucători dintr-o listă personalizată (salvată în sesiune), cu actualizare vizuală imediată a butoanelor.

## 🛠️ Tehnologii Utilizate
* **Frontend:** HTML5, CSS3, JavaScript (ES6+), jQuery
* **Backend:** PHP 8+
* **Bază de date:** MySQL
* **Arhitectură:** Procedural PHP combinat cu endpoint-uri REST API minimaliste pentru AJAX.

## ⚙️ Instalare și Configurare (Localhost)

Pentru a rula acest proiect local, ai nevoie de un server web precum [XAMPP](https://www.apachefriends.org/).

1. **Clonează repository-ul:**
   ```bash
   git clone [https://github.com/username-ul-tau/proiect-fotbal-web.git](https://github.com/username-ul-tau/proiect-fotbal-web.git)