document.addEventListener("DOMContentLoaded", function() {

    // --- FUNCȚIE COMUNĂ ---
    function schimbaBulina(idBulina, isValid) {
        let bulina = document.getElementById(idBulina);
        if (bulina) {
            bulina.className = isValid ? "bulina-validare valid" : "bulina-validare invalid";
        }
    }

    // ==========================================
    // EXERCIȚIUL 1: VALIDĂRI (Doar pe Autentificare)
    // ==========================================
    // Verificăm dacă există primul element. Dacă există, suntem pe pagina corectă!
    const inputUser = document.getElementById("username");
    
    if (inputUser !== null) { 
        const regexTextMic = /^[a-z0-9]+$/;

        inputUser.addEventListener("input", function() {
            schimbaBulina("bulina-user", this.value.length > 0 && regexTextMic.test(this.value));
        });

        document.getElementById("referinta").addEventListener("input", function() {
            schimbaBulina("bulina-ref", this.value.length > 0 && regexTextMic.test(this.value));
        });

        const regexParola = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*!).+$/;
        document.getElementById("parola-lab").addEventListener("input", function() {
            schimbaBulina("bulina-parola", regexParola.test(this.value));
        });

        document.getElementById("email-lab").addEventListener("input", function() {
            let email = this.value;
            let valid = /^[a-zA-Z0-9.@]+$/.test(email) && 
                        (email.match(/@/g) || []).length === 1 && 
                        (email.match(/\./g) || []).length >= 1;
            schimbaBulina("bulina-email", email.length > 0 && valid);
        });

        const regexTelefon = /^\(\+40\) [0-9]{3} [0-9]{3} [0-9]{3}$/;
        document.getElementById("telefon-lab").addEventListener("input", function() {
            schimbaBulina("bulina-tel", regexTelefon.test(this.value));
        });

        function valideazaData(dataStr, format) {
            let elementeData = dataStr.split('/');
            let elementeFormat = format.split('/');
            if (elementeData.length !== 3 || elementeFormat.length !== 3) return false;

            let zi = 0, luna = 0, an = 0;
            for (let i = 0; i < 3; i++) {
                let valoare = parseInt(elementeData[i], 10);
                let tip = elementeFormat[i].toLowerCase();
                if (isNaN(valoare)) return false;
                if (tip === 'zz') zi = valoare;
                else if (tip === 'll') luna = valoare;
                else if (tip === 'aaaa') an = valoare;
                else if (tip === 'aa') an = valoare < 100 ? valoare + 2000 : valoare;
            }

            if (luna < 1 || luna > 12) return false;
            let ultimaZiDinLuna = new Date(an, luna, 0).getDate();
            return zi >= 1 && zi <= ultimaZiDinLuna;
        }

        function verificaData() {
            let textData = document.getElementById("data-lab").value;
            let formatData = document.getElementById("format-data").value;
            schimbaBulina("bulina-data", textData.length > 0 && valideazaData(textData, formatData));
        }

        document.getElementById("data-lab").addEventListener("input", verificaData);
        document.getElementById("format-data").addEventListener("change", verificaData);
    } // Final verificare Exercițiul 1


    // ==========================================
    // EXERCIȚIUL 2: DROPDOWN-URI (Doar pe Administrare)
    // ==========================================
    const selectJudet = document.getElementById("judet-select");
    const selectOras = document.getElementById("oras-select");

    // Verificăm dacă suntem pe pagina de Administrare
    if (selectJudet !== null && selectOras !== null) {
        
        const dateLocatii = {
            "Cluj": ["Cluj-Napoca", "Turda", "Dej", "Câmpia Turzii", "Gherla"],
            "Bucuresti": ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6"],
            "Timis": ["Timișoara", "Lugoj", "Sânnicolau Mare", "Jimbolia"],
            "Iasi": ["Iași", "Pașcani", "Târgu Frumos", "Hârlău"]
        };

        selectJudet.addEventListener("change", function() {
            let judetSelectat = this.value;
            
            // Golim orașele și punem opțiunea default
            selectOras.innerHTML = '<option value="">-- Alege Orașul --</option>';

            if (judetSelectat !== "") {
                // Deblocăm orașul
                selectOras.removeAttribute("disabled");
                
                let orase = dateLocatii[judetSelectat];
                for (let i = 0; i < orase.length; i++) {
                    let nouaOptiune = document.createElement("option");
                    nouaOptiune.value = orase[i];
                    nouaOptiune.textContent = orase[i];
                    selectOras.appendChild(nouaOptiune);
                }
            } else {
                // Blocăm la loc dacă se alege județul gol
                selectOras.setAttribute("disabled", "disabled");
                selectOras.innerHTML = '<option value="">-- Alege întâi județul --</option>';
            }
        });
    }

    // ==========================================
    // VALIDARE LA SUBMIT (Valabil pe orice formular de pe site)
    // ==========================================
    const formulare = document.querySelectorAll("form");
    
    formulare.forEach(function(formular) {
        formular.addEventListener("submit", function(eveniment) {
            let toateBulinele = document.querySelectorAll(".bulina-validare");
            let formularValid = true;

            // Verificăm bulinele doar dacă formularul le conține
            if (toateBulinele.length > 0) {
                toateBulinele.forEach(function(bulina) {
                    if (!bulina.classList.contains("valid")) {
                        formularValid = false;
                    }
                });

                if (!formularValid) {
                    eveniment.preventDefault(); 
                    alert("⚠ Eroare! Te rugăm să completezi corect toate câmpurile înainte de a trimite.");
                } else {
                    alert("Datele sunt completate corect!");
                }
            }
        });
    });

    // ==========================================
    // EXERCIȚIUL 3: TABEL SORTABIL (Cod Reutilizabil)
    // ==========================================
    // Căutăm toate tabelele de pe pagină pentru a face codul complet reutilizabil
    const tabele = document.querySelectorAll("table");

    tabele.forEach(function(tabel) {
        // Luăm capul de tabel (antetul) și corpul tabelului
        const headers = tabel.querySelectorAll("thead th");
        const tbody = tabel.querySelector("tbody");

        // Dacă tabelul nu are tbody sau th, îl ignorăm (ne protejăm de erori)
        if (!tbody || headers.length === 0) return;

        headers.forEach(function(header, index) {
            // Facem cursorul să arate ca un deget (link) pentru a indica interactivitatea
            header.style.cursor = "pointer";
            header.title = "Apasă pentru a sorta!";
            
            // Setăm o direcție inițială ascunsă pe element (crescător)
            header.setAttribute("data-directie", "asc");

            // Adăugăm funcția la CLICK pe antet
            header.addEventListener("click", function() {
                const directieCurenta = this.getAttribute("data-directie");
                
                // Multiplicatorul ne ajută să inversăm sortarea matematic
                const multiplicator = (directieCurenta === "asc") ? 1 : -1;

                // Luăm toate rândurile <tr> din <tbody> și le transformăm într-un Array adevărat
                const randuri = Array.from(tbody.querySelectorAll("tr"));

                // Folosim funcția nativă de sortare a array-urilor
                randuri.sort(function(randA, randB) {
                    // Extragem textul din celula <td> corespunzătoare coloanei pe care am dat click
                    let celulaA = randA.querySelectorAll("td")[index].innerText.trim().toLowerCase();
                    let celulaB = randB.querySelectorAll("td")[index].innerText.trim().toLowerCase();

                    // Dacă textele sunt numere (ex: la un tabel de statistici), le convertim ca să le sorteze matematic, nu alfabetic
                    let valA = isNaN(parseFloat(celulaA)) ? celulaA : parseFloat(celulaA);
                    let valB = isNaN(parseFloat(celulaB)) ? celulaB : parseFloat(celulaB);

                    // Comparația propriu-zisă
                    if (valA < valB) return -1 * multiplicator;
                    if (valA > valB) return 1 * multiplicator;
                    return 0;
                });

                // RE-ATAȘĂM RÂNDURILE: browser-ul le va muta automat în noua ordine!
                randuri.forEach(function(rand) {
                    tbody.appendChild(rand);
                });

                // Inversăm direcția pentru următorul click
                this.setAttribute("data-directie", directieCurenta === "asc" ? "desc" : "asc");

                // --- Bonus vizual (Săgeți de ordonare) ---
                // Curățăm vechile săgeți de pe toate capetele de coloană
                headers.forEach(h => {
                    h.innerHTML = h.innerHTML.replace(" ↑", "").replace(" ↓", "");
                });
                
                // Adăugăm săgeata pe coloana care tocmai a fost sortată
                this.innerHTML += directieCurenta === "asc" ? " ↑" : " ↓";
            });
        });
    });

    // ==========================================
    // EXERCIȚIUL 4: LISTĂ ȘTIRI (Slider Text)
    // ==========================================
    const listaStiri = document.getElementById("lista-stiri");
    
    // Rulăm codul doar dacă lista de știri există pe pagină (doar în index.html)
    if (listaStiri !== null) {
        const stiri = listaStiri.querySelectorAll("li");
        const btnPrev = document.getElementById("btn-prev");
        const btnNext = document.getElementById("btn-next");
        
        let indexStireCurenta = 0;
        const timpTranzitie = 5000; // n = 5 secunde (5000 milisecunde)
        let timerStiri; // Variabila care ține evidența timpului

        // Funcția de bază care schimbă știrea
        function afiseazaStire(index) {
            // 1. Ascundem știrea curentă
            stiri[indexStireCurenta].classList.remove("stire-activa");
            
            // 2. Calculăm noul index (asigurăm circularitatea)
            indexStireCurenta = index;
            if (indexStireCurenta < 0) {
                indexStireCurenta = stiri.length - 1; // Dacă dăm 'Prev' de la prima, mergem la ultima
            } else if (indexStireCurenta >= stiri.length) {
                indexStireCurenta = 0; // Dacă dăm 'Next' de la ultima, mergem la prima
            }
            
            // 3. Afișăm noua știre
            stiri[indexStireCurenta].classList.add("stire-activa");
        }

        // Funcție pentru pornirea automată a slider-ului
        function startTimer() {
            // Curățăm timer-ul anterior (ca să nu se "bâlbâie" dacă dăm click manual)
            clearInterval(timerStiri);
            
            timerStiri = setInterval(function() {
                afiseazaStire(indexStireCurenta + 1); // Trecem la următoarea din 5 în 5 sec.
            }, timpTranzitie);
        }

        // Atașăm evenimente pe butoanele manuale
        btnNext.addEventListener("click", function() {
            afiseazaStire(indexStireCurenta + 1);
            startTimer(); // Resetăm timer-ul ca să o ia de la capăt cele 5 secunde
        });

        btnPrev.addEventListener("click", function() {
            afiseazaStire(indexStireCurenta - 1);
            startTimer(); // Resetăm timer-ul
        });

        // La final, pornim mecanismul automat când se încarcă pagina
        startTimer();
    }

});