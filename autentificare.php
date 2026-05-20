<?php
// Pornim sesiunea pentru a putea salva mesaje de succes/eroare sau starea de logare 
session_start();

// Importăm conexiunea la baza de date
require_once 'conexiune.php';

$mesaj_inregistrare = "";

// Verificăm dacă s-a trimis formularul de înregistrare (dacă s-a dat click pe butonul cu name="btn_inregistrare")
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['btn_inregistrare'])) {
    
    // Preluăm datele și le curățăm de posibile atacuri (securitate de bază)
    $nume = mysqli_real_escape_string($conn, $_POST['nume']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    
    // CRUCIAL pentru mate-info: NICIODATĂ nu salvăm parolele în clar (text) în baza de date!
    // Folosim un algoritm de hashing (BCrypt) pentru a o cripta ireversibil.
    $parola_criptata = password_hash($_POST['parola'], PASSWORD_DEFAULT);

    // Verificăm dacă email-ul există deja în baza de date
    $sql_verificare = "SELECT * FROM utilizatori WHERE email = '$email'";
    $rezultat_verificare = mysqli_query($conn, $sql_verificare);

    if (mysqli_num_rows($rezultat_verificare) > 0) {
        $mesaj_inregistrare = "<div style='color: red; margin-bottom: 15px;'>Acest email este deja folosit!</div>";
    } else {
        // Dacă nu există, inserăm noul utilizator 
        // Rolul va fi pus automat 'user' de către baza de date, conform setării noastre de la pasul anterior
        $sql_insert = "INSERT INTO utilizatori (nume, email, parola) VALUES ('$nume', '$email', '$parola_criptata')";
        
        if (mysqli_query($conn, $sql_insert)) {
            $mesaj_inregistrare = "<div style='color: green; margin-bottom: 15px;'>Cont creat cu succes! Acum te poți autentifica.</div>";
        } else {
            $mesaj_inregistrare = "<div style='color: red; margin-bottom: 15px;'>Eroare la creare cont: " . mysqli_error($conn) . "</div>";
        }
    }
}

// --- LOGICA PENTRU AUTENTIFICARE (LOGIN) ---
$mesaj_login = "";

// Verificăm dacă s-a dat click pe butonul de Login (name="btn_login")
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['btn_login'])) {
    
    $email_login = mysqli_real_escape_string($conn, $_POST['login_email']);
    $parola_login = $_POST['login_pass'];

    // Căutăm utilizatorul după email
    $sql_login = "SELECT * FROM utilizatori WHERE email = '$email_login'";
    $rezultat_login = mysqli_query($conn, $sql_login);

    // Dacă am găsit exact un utilizator cu acest email
    if (mysqli_num_rows($rezultat_login) === 1) {
        $user = mysqli_fetch_assoc($rezultat_login);
        
        // Verificăm dacă parola introdusă se potrivește cu cea criptată din DB
        if (password_verify($parola_login, $user['parola'])) {
            
            // AUTENTIFICARE CU SUCCES! Salvăm datele în sesiune 
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_nume'] = $user['nume'];
            $_SESSION['user_rol'] = $user['rol'];
            
            // Redirecționăm utilizatorul către pagina principală
            header("Location: index.php"); 
            exit(); // Oprim execuția scriptului pe pagina curentă
            
        } else {
            $mesaj_login = "<div style='color: red; margin-bottom: 15px; font-weight: bold;'>Parolă incorectă!</div>";
        }
    } else {
        $mesaj_login = "<div style='color: red; margin-bottom: 15px; font-weight: bold;'>Nu există niciun cont cu acest e-mail!</div>";
    }
}
?>


<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autentificare - FC Programare Web</title>
    <link rel="stylesheet" href="stil.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <h1>Management Club Fotbal - Acces Portal</h1>
    </header>

    <nav>
        <ul class="menu-principal">
            <li><a href="index.html">Acasă</a></li>
            
            <li class="are-submeniu">
                <a href="#">Echipă <i class="fas fa-caret-up"></i></a>
                <ul class="submenu">
                    <li><a href="index.html">Lot Seniori</a></li>
                    <li><a href="juniori.html">Grupe Juniori</a></li>
                </ul>
            </li>

            <li><a href="autentificare.html">Autentificare</a></li>
            <li><a href="administrare.html">Administrare Lot</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Ai deja cont? Autentifică-te</h2>
            <form action="autentificare.php" method="POST">
                
                <?php echo $mesaj_login; ?>
                
                <fieldset>
                    <legend>Conectare</legend>
                    <p>
                        <label>E-mail <span style="color: red; font-weight: bold;">*</span>:</label>
                        <input type="email" name="login_email" required placeholder="nume@exemplu.ro">
                    </p>
                    <p>
                        <label>Parolă <span style="color: red; font-weight: bold;">*</span>:</label>
                        <input type="password" name="login_pass" required>
                    </p>
                    <p>
                        <input type="checkbox" name="remember"> Ține-mă minte pe acest dispozitiv
                    </p>
                </fieldset>
                <p>
                    <button type="submit" name="btn_login"><i class="fas fa-sign-in-alt"></i> Intră în cont</button>
                    <a href="#" style="margin-left: 15px; color: var(--culoare-primara); text-decoration: none; font-size: 0.9em;">Ai uitat parola?</a>
                </p>
            </form>
        </section>
        <section style="margin-top: 50px;">
            <h2>Nu ai cont? Creare Cont Nou</h2>
            <p><small>Câmpurile marcate cu <span style="color: red; font-weight: bold;">*</span> sunt obligatorii.</small></p>

            <form action="autentificare.php" method="POST">
                <fieldset id="form-inregistrare">
                    <legend>Înregistrare </legend>
                    
                    <?php echo $mesaj_inregistrare; ?>

                    <div class="input-container">
                        <label>Nume utilizator (doar litere mici și cifre) <span style="color: red; font-weight: bold;">*</span>:</label>
                        <input type="text" id="username" name="nume" placeholder="ex: david2024" required>
                        <span class="bulina-validare" id="bulina-user"></span>
                    </div>

                    <div class="input-container">
                        <label>Cod referință (doar litere mici și cifre):</label>
                        <input type="text" id="referinta" placeholder="ex: promo99">
                        <span class="bulina-validare" id="bulina-ref"></span>
                    </div>
                    
                    <div class="input-container">
                        <label>Parolă (litere mari, mici, cifre și !) <span style="color: red; font-weight: bold;">*</span>:</label>
                        <input type="password" id="parola-lab" name="parola" placeholder="ex: ParolaMea123!" required>
                        <span class="bulina-validare" id="bulina-parola"></span>
                    </div>

                    <div class="input-container">
                        <label>E-mail oficial <span style="color: red; font-weight: bold;">*</span>:</label>
                        <input type="email" id="email-lab" name="email" placeholder="nume@domeniu.ro" required>
                        <span class="bulina-validare" id="bulina-email"></span>
                    </div>

                    <div class="input-container">
                        <label>Telefon format (+40) 777 777 777:</label>
                        <input type="text" id="telefon-lab" placeholder="(+40) 712 345 678">
                        <span class="bulina-validare" id="bulina-tel"></span>
                    </div>
                    
                    <div class="input-container">
                        <label>Dată calendaristică:</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="data-lab" placeholder="ex: 31/01/2006" style="flex: 2;">
                            <select id="format-data" style="flex: 1;">
                                <option value="zz/ll/aaaa">zz/ll/aaaa</option>
                                <option value="ll/zz/aaaa">ll/zz/aaaa</option>
                                <option value="zz/ll/aa">zz/ll/aa</option>
                            </select>
                        </div>
                        <span class="bulina-validare" id="bulina-data" style="top: 45px;"></span>
                    </div>
                </fieldset>

                <p>
                    <button type="submit" name="btn_inregistrare"><i class="fas fa-user-plus"></i> Înregistrează-te</button>
                    <button type="reset" style="background-color: #555;"><i class="fas fa-eraser"></i> Șterge Date</button>
                </p>
            </form>
        </section>

        <aside>
            <div class="widget-card">
                <h2>Informații Suplimentare</h2>
                <details>
                    <summary>De ce să îți faci cont?</summary>
                    <p>Prin crearea unui cont vei avea acces la materiale exclusive, reduceri la bilete pentru Lotul de Seniori și posibilitatea de a interacționa cu staff-ul echipei.</p>
                </details>
            </div>
        </aside>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-sectiune">
                <h3>FC Programare Web</h3>
                <p>Suntem un club dedicat performanței și inovației, combinând pasiunea pentru fotbal cu tehnologia modernă.</p>
            </div>
            
            <div class="footer-sectiune">
                <h3>Contact</h3>
                <p><i class="fas fa-map-marker-alt"></i> Cluj-Napoca, România</p>
                <p><i class="fas fa-envelope"></i> contact@fcprogramare.ro</p>
                <p><i class="fas fa-phone"></i> +40 712 345 678</p>
            </div>
            
            <div class="footer-sectiune">
                <h3>Urmărește-ne</h3>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>Proiect realizat de David Dumitreasa.</p>
        </div>
    </footer>
<script src = "script.js"></script>
</body>
</html>