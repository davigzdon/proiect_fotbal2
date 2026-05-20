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
    // VALIDARE LA SUBMIT (Corectată pentru Backend)
    // ==========================================
    const formulare = document.querySelectorAll("form");
    
    formulare.forEach(function(formular) {
        formular.addEventListener("submit", function(eveniment) {
            
            // MODIFICAREA CHEIE: Căutăm bulinele DOAR în formularul curent, nu pe toată pagina!
            let toateBulinele = formular.querySelectorAll(".bulina-validare");
            let formularValid = true;

            // Dacă formularul are buline (Înregistrare), le verificăm. Dacă nu are (Login), sare peste.
            if (toateBulinele.length > 0) {
                toateBulinele.forEach(function(bulina) {
                    if (!bulina.classList.contains("valid")) {
                        formularValid = false;
                    }
                });

                if (!formularValid) {
                    eveniment.preventDefault(); 
                    alert("⚠ Eroare! Te rugăm să completezi corect toate câmpurile înainte de a trimite.");
                } 
                // Notă: Am șters alert-ul cu "Datele sunt completate corect" 
                // pentru că acum lăsăm PHP-ul să ne arate mesajele de succes pe ecran, fără pop-up-uri.
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

    // ==========================================
    // EXERCIȚIUL 5: SLIDESHOW CONTROLAT (Play/Pause, Repeat, Viteza)
    // ==========================================
    const containerSlider = document.getElementById("slider-jucatori");

    if (containerSlider !== null) {
        const thumbs = containerSlider.querySelectorAll(".thumb");
        const pozeMari = containerSlider.querySelectorAll(".large-img");
        const btnPlay = document.getElementById("btn-play-pause");
        const checkRepetare = document.getElementById("check-repetare");
        const selectInterval = document.getElementById("select-interval");

        let indexSlider = 0;
        let estePornit = false;
        let timerSlider;

        function schimbaImaginea(index) {
            // Curățăm starea activă de la toate pozele
            pozeMari.forEach(img => img.classList.remove("js-active"));
            thumbs.forEach(t => t.classList.remove("js-active-thumb"));

            // Activăm poza nouă
            indexSlider = index;
            
            // Verificăm limitele pentru repetare
            if (indexSlider >= pozeMari.length) {
                if (checkRepetare.checked) {
                    indexSlider = 0; // O ia de la capăt
                } else {
                    opresteSlideshow(); // Se oprește la ultima poză
                    return;
                }
            }

            pozeMari[indexSlider].classList.add("js-active");
            thumbs[indexSlider].classList.add("js-active-thumb");
        }

        function pornesteSlideshow() {
            estePornit = true;
            btnPlay.innerHTML = '<i class="fas fa-pause"></i> Pause';
            
            // Luăm valoarea intervalului din combobox
            const intervalMilisecunde = parseInt(selectInterval.value);

            timerSlider = setInterval(function() {
                schimbaImaginea(indexSlider + 1);
            }, intervalMilisecunde);
        }

        function opresteSlideshow() {
            estePornit = false;
            btnPlay.innerHTML = '<i class="fas fa-play"></i> Play';
            clearInterval(timerSlider);
        }

        // Eveniment: Buton Play/Pause
        btnPlay.addEventListener("click", function() {
            if (estePornit) opresteSlideshow();
            else pornesteSlideshow();
        });

        // Eveniment: Schimbare viteză în timp ce rulează
        selectInterval.addEventListener("change", function() {
            if (estePornit) {
                opresteSlideshow();
                pornesteSlideshow();
            }
        });
        
        // Permitem și click-ul manual pe thumbnail să reseteze poziția în slideshow
        thumbs.forEach((t, i) => {
            t.addEventListener("click", () => schimbaImaginea(i));
        });
    }

    // ==========================================
    // CERINȚĂ NOUĂ: MODAL IMAGINE TABEL
    // ==========================================
    const imaginiTabel = document.querySelectorAll(".img-tabel");
    const modalJucator = document.getElementById("modal-jucator");

    if (imaginiTabel.length > 0 && modalJucator) {
        const imgMare = document.getElementById("img-modal-mare");
        const infoDetalii = document.getElementById("info-modal-detalii");
        const btnInchide = document.querySelector(".close-modal");

        imaginiTabel.forEach(img => {
            img.style.cursor = "zoom-in"; // Schimbăm cursorul pentru a indica interactivitatea

            img.addEventListener("click", function() {
                // 1. Preluăm sursa imaginii
                imgMare.src = this.src;

                // 2. Navigăm în DOM pentru a lua informațiile din același rând (tr)
                const rand = this.closest("tr");
                const infoNumePozitie = rand.cells[1].innerText; // A doua celulă
                const infoStatistici = rand.cells[2].innerText;  // A treia celulă

                // 3. Injectăm datele în modal
                infoDetalii.innerHTML = `
                    <h3>${infoNumePozitie}</h3>
                    <p>${infoStatistici}</p>
                `;

                // 4. Afișăm modalul
                modalJucator.style.display = "block";
            });
        });

        // Închidere la click pe X
        btnInchide.onclick = () => modalJucator.style.display = "none";

        // Închidere la click oriunde în afara ferestrei albe
        window.onclick = (event) => {
            if (event.target == modalJucator) {
                modalJucator.style.display = "none";
            }
        };
    }

    // --- EXERCIȚIUL 1: SLIDER VERTICAL CU CONTROL STOP ---
    if ($('#slider-vertical').length > 0) {
        let inaltimeElement = 250; 
        let timerSliderJq = null; // Inițializăm cu null

        function initializeazaSlider() {
            let nrVizibile = parseInt($('#set-vizibile').val());
            $('.jq-viewport').css('height', (nrVizibile * inaltimeElement) + 'px');
            
            // Pornim automat la aplicarea setărilor
            pornesteTimerJq();
        }

        function slideSus() {
            $('.jq-lista-elemente').animate({
                marginTop: -inaltimeElement + 'px'
            }, 600, function() {
                $(this).find('li:last').after($(this).find('li:first'));
                $(this).css({ marginTop: '0' });
            });
        }

        function slideJos() {
            $('.jq-lista-elemente').find('li:first').before($('.jq-lista-elemente').find('li:last'));
            $('.jq-lista-elemente').css({ marginTop: -inaltimeElement + 'px' });
            $('.jq-lista-elemente').animate({ marginTop: '0' }, 600);
        }

        function pornesteTimerJq() {
            // Curățăm orice timer activ înainte de a porni unul nou (evităm accelerarea)
            if (timerSliderJq !== null) {
                clearInterval(timerSliderJq);
            }
            
            let secunde = parseInt($('#set-secunde').val());
            timerSliderJq = setInterval(slideSus, secunde * 1000);
            
            // Feedback vizual pe butoane
            $('#btn-stop-slider').text("Stop").css("opacity", "1");
            $('#btn-aplica-setari').text("Actualizează");
        }

        // LOGICA DE OPRIRE (STOP)
        $('#btn-stop-slider').click(function() {
            if (timerSliderJq !== null) {
                clearInterval(timerSliderJq); // Oprește execuția repetitivă
                timerSliderJq = null; // Resetăm variabila
                
                // Feedback vizual: schimbăm textul butonului
                $(this).text("Slider Oprit").css("opacity", "0.5");
                $('#btn-aplica-setari').text("Repornește");
            }
        });

        $('#btn-aplica-setari').click(function() {
            initializeazaSlider();
        });

        // Control manual prin săgeți (Oprește timer-ul automat pentru a nu se bate cap în cap cu click-ul)
        $('.jq-sus').click(function() {
            clearInterval(timerSliderJq);
            slideJos();
            pornesteTimerJq(); 
        });

        $('.jq-jos').click(function() {
            clearInterval(timerSliderJq);
            slideSus();
            pornesteTimerJq();
        });

        initializeazaSlider();
    }

    $(document).ready(function() {
    // Selector custom pentru căutare case-insensitive (ne-sensibilă la litere mari/mici)
    $.expr[":"].containsNC = $.expr.createPseudo(function(arg) {
        return function(elem) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    function aplicaFiltrele() {
        const textCautat = $('#cauta-jucator').val();
        
        // Luăm toate valorile de la checkbox-urile bifate (AND)
        let conditiiAND = [];
        $('.filtru-and:checked').each(function() {
            conditiiAND.push($(this).val());
        });

        // Luăm valoarea de la radio button (OR)
        const conditieOR = $('.filtru-or:checked').val();

        // Parcurgem fiecare rând din tabel (tbody tr)
        $('#tabel-jucatori tbody tr').each(function() {
            const rand = $(this);
            const textNume = rand.find('td:eq(1)').text(); // Coloana 2
            const textDetalii = rand.find('td:eq(2)').text(); // Coloana 3
            const textComplet = textNume + " " + textDetalii;

            // 1. Verificare text (Căutare în 2 coloane)
            const matchText = textComplet.toUpperCase().indexOf(textCautat.toUpperCase()) > -1;

            // 2. Verificare AND (Trebuie să conțină toate cuvintele bifate)
            let matchAND = true;
            conditiiAND.forEach(cond => {
                if (textComplet.indexOf(cond) === -1) matchAND = false;
            });

            // 3. Verificare OR (Dacă e "toate" e true, altfel verifică dacă conține tag-ul)
            // Notă: "Senior" și "Promovat" sunt în tooltips (info-extra)
            let matchOR = (conditieOR === "toate") || (textComplet.indexOf(conditieOR) > -1);

            // Afișăm rândul doar dacă trece de TOATE cele 3 mari filtre
            if (matchText && matchAND && matchOR) {
                rand.show();
            } else {
                rand.hide();
            }
        });
    }

    // Declanșăm filtrarea la orice schimbare a input-urilor
    $('#cauta-jucator').on('keyup', aplicaFiltrele);
    $('.filtru-and, .filtru-or').on('change', aplicaFiltrele);
});

// --- EXERCIȚIUL 2: LIVE SEARCH IN SELECT ---
    $('.jq-select-header').click(function() {
        $('.jq-select-dropdown').slideToggle(200); // Deschidem/Închidem lista
        $('#input-search-select').focus();
    });

    $('#input-search-select').on('keyup', function() {
        const valoare = $(this).val().toLowerCase();
        
        // Filtrăm elementele <li> folosind selectorul :containsNC creat mai sus
        $('#lista-abonati li').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(valoare) > -1);
        });
    });

    // Selectarea unui element
    $('#lista-abonati li').click(function() {
        const textSelectat = $(this).text();
        $('#select-label').text(textSelectat);
        $('.jq-select-dropdown').hide();
    });
   // --- EXERCIȚIUL 3: FUNCȚIONALITATE CREATIVĂ (ACORDEON <-> TABURI) ---
    // Verificăm dacă suntem pe pagina juniori.html
    if ($('#scouting-juniori').length > 0) {
        
        // 1. Evenimentul de click pe numele jucătorului (PENTRU AMBELE MODURI)
        $('.jq-nume-junior').off('click').on('click', function() {
            let panouCurent = $(this).next('.jq-detalii-scout');
            let iconita = $(this).find('i');

            if (panouCurent.is(':visible')) {
                // Dacă dai click pe cel deja deschis, îl închidem
                panouCurent.slideUp(300);
                iconita.css('transform', 'rotate(0deg)');
                $(this).removeClass('tab-activ'); 
            } else {
                // Dacă e închis, mai întâi ascundem TOT ce e deschis pe pagină
                $('.jq-detalii-scout').slideUp(300);
                $('.jq-nume-junior i').css('transform', 'rotate(0deg)');
                $('.skill-bar').css('width', '0'); // Resetăm barele la 0
                $('.jq-nume-junior').removeClass('tab-activ'); // Resetăm tab-urile

                // Acum îl deschidem strict pe cel pe care ai dat click
                $(this).addClass('tab-activ'); 

                panouCurent.slideDown(400, function() {
                    // Când termină de coborât, animăm barele verzi
                    panouCurent.find('.skill-bar').each(function() {
                        let valoareTinta = $(this).attr('data-valoare'); 
                        $(this).animate({ width: valoareTinta }, 800);
                    });
                });
                
                iconita.css('transform', 'rotate(180deg)'); 
            }
        });

        // 2. Evenimentul de click pe butonul de Switch (Schimbare de aspect)
        $('#btn-switch-format').off('click').on('click', function() {
            let containerLista = $('.jq-lista-juniori');
            let buton = $(this);

            // Adăugăm/scoatem clasa care controlează CSS-ul
            containerLista.toggleClass('mod-taburi');

            // Verificăm în ce stare am ajuns pentru a actualiza butonul
            if (containerLista.hasClass('mod-taburi')) {
                // SUNTEM ÎN MOD TAB-URI
                buton.html('<i class="fas fa-list"></i> Revino la Acordeon');
                buton.css('background', '#e67e22'); 
                
            } else {
                // SUNTEM ÎN MOD ACORDEON (Vertical)
                buton.html('<i class="fas fa-columns"></i> Schimbă în Mod Tab-uri');
                buton.css('background', '#3498db');
            }
        });
    }
});

// ==========================================
// AJAX 1: Rezervare Bilete
// ==========================================
const formRezervare = document.getElementById('form-rezervare');

if (formRezervare) {
    formRezervare.addEventListener('submit', function(e) {
        e.preventDefault(); // OPREȘTE REFRESH-UL PAGINII!
        
        const meciSelectat = document.getElementById('meci-rezervare').value;
        const numarBilete = document.getElementById('nr-bilete').value;
        const containerMesaj = document.getElementById('mesaj-rezervare');

        containerMesaj.innerHTML = "Se procesează...";
        containerMesaj.style.color = "blue";

        fetch('rezervare_ajax.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ meci: meciSelectat, bilete: numarBilete })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'succes') {
                containerMesaj.style.color = "green";
                containerMesaj.innerHTML = data.mesaj;
            } else {
                containerMesaj.style.color = "red";
                containerMesaj.innerHTML = data.mesaj;
            }
        })
        .catch(error => {
            console.error("Eroare AJAX Rezervare:", error);
            containerMesaj.innerHTML = "A apărut o eroare de rețea.";
        });
    });
}

// ==========================================
// AJAX 2: Adăugare/Eliminare Favorite (Toggle)
// ==========================================
const butoaneFavorite = document.querySelectorAll('.btn-favorit');

butoaneFavorite.forEach(buton => {
    buton.addEventListener('click', function() {
        const idJucator = this.getAttribute('data-id');
        const butonCurent = this;
        const spanText = butonCurent.querySelector('.text-buton');

        // Facem cererea AJAX
        fetch('favorite_ajax.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_jucator: idJucator })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'succes') {
                if (data.actiune === 'adaugat') {
                    butonCurent.style.background = "#e74c3c";
                    spanText.innerHTML = "⭐ Elimină";
                } else if (data.actiune === 'sters') {
                    butonCurent.style.background = "#f39c12";
                    spanText.innerHTML = "☆ Adaugă la Favorite";
                }
            } else if (data.status === 'neautentificat') {
                // Dacă PHP-ul zice că nu e logat, îi dăm un alert și îl trimitem la login
                alert(data.mesaj);
                window.location.href = 'autentificare.php';
            } else {
                alert("Eroare: " + data.mesaj);
            }
        })
        .catch(error => console.error("Eroare AJAX Favorite:", error));
    });
});