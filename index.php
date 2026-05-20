<?php
// 1. Pornim sesiunea și includem conexiunea o singură dată
session_start();
require_once 'conexiune.php'; 

// 2. Pregătim interogarea SQL pentru a lua toți jucătorii
$sql_jucatori = "SELECT * FROM jucatori";
$rezultat_jucatori = mysqli_query($conn, $sql_jucatori);
?>
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FC Programare Web</title>
    <link rel="stylesheet" href="stil.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <h1>Management Club Fotbal - Vizualizare Lot</h1>
    </header>

    <nav>
        <ul class="menu-principal">
            <li><a href="index.php">Acasă</a></li>
            
            <li class="are-submeniu">
                <a href="#">Echipă <i class="fas fa-caret-up"></i></a>
                <ul class="submenu">
                    <li><a href="index.php">Lot Seniori</a></li>
                    <li><a href="juniori.html">Grupe Juniori</a></li>
                </ul>
            </li>

            <?php if (isset($_SESSION['user_id'])): ?>
                <li><a href="#" style="color: #2ecc71;">Salut, <?php echo $_SESSION['user_nume']; ?>!</a></li>
                
                <?php if ($_SESSION['user_rol'] == 'admin'): ?>
                    <li><a href="administrare.php">Administrare Lot</a></li>
                <?php endif; ?>

                <li><a href="logout.php">Deconectare</a></li>
            <?php else: ?>
                <li><a href="autentificare.php">Autentificare</a></li>
            <?php endif; ?>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Lotul de Seniori 2024</h2>
            <article>
                <h3>Performanțe Jucători</h3>
                
                <div class="container-tabel-responsive">
                    <table id="tabel-jucatori">
                        <thead>
                            <tr>
                                <th>Imagine Jucător</th>
                                <th>Informații Jucător</th>
                                <th>Detalii Tehnice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            // 3. Verificăm dacă avem date în tabel
                            if (mysqli_num_rows($rezultat_jucatori) > 0) {
                                // 4. Bucla care desenează câte un <tr> pentru fiecare jucător din DB
                                while($jucator = mysqli_fetch_assoc($rezultat_jucatori)) {
                                    ?>
                                    <tr>
                                        <td>
                                            <div class="element-cu-tooltip">
                                                <img src="<?php echo htmlspecialchars($jucator['poza']); ?>" alt="Jucător" class="img-tabel">
                                                <div class="info-extra">Jucător înregistrat în baza de date a clubului.</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="element-cu-tooltip text-tabel">
                                                <strong><?php echo htmlspecialchars($jucator['nume_jucator']); ?></strong> (<?php echo htmlspecialchars($jucator['pozitie']); ?>)
                                                <div class="info-extra">Status: Membru activ al lotului.</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="element-cu-tooltip text-tabel">
                                                <?php echo htmlspecialchars($jucator['statistica1']); ?> <br> 
                                                <?php echo htmlspecialchars($jucator['statistica2']); ?>
                                                <div class="info-extra">Performanță actualizată sezonul 2024.</div>
                                            </div>
                                            <br><br>
                                            
                                            <?php 
                                            // Verificăm dacă jucătorul e deja în sesiune la favorite
                                            $este_favorit = isset($_SESSION['favorite']) && in_array($jucator['id'], $_SESSION['favorite']);
                                            $text_buton = $este_favorit ? "⭐ Elimină" : "☆ Adaugă la Favorite";
                                            $culoare_buton = $este_favorit ? "#e74c3c" : "#f39c12"; // Roșu dacă e adăugat, portocaliu dacă nu
                                            ?>
                                            <button class="btn-favorit" data-id="<?php echo $jucator['id']; ?>" style="background: <?php echo $culoare_buton; ?>; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; font-size: 0.8em;">
                                                <span class="text-buton"><?php echo $text_buton; ?></span>
                                            </button>
                                        </td>
                                    </tr>
                                    <?php
                                }
                            } else {
                                echo "<tr><td colspan='3' style='text-align:center;'>Nu există jucători în baza de date.</td></tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </article>
        </section>

        <section>
            <h2>Ultimele Noutăți</h2>
            <div class="stiri-container">
                <ul id="lista-stiri">
                    <li class="stire-activa">
                        <div><strong>Victorie importantă!</strong> Echipa noastră a învins cu 2-0 în deplasarea de la București, consolidându-și poziția de lider.</div>
                        <a href="#">Citește mai mult...</a>
                    </li>
                    <li>
                        <div><strong>Transfer surpriză!</strong> Un nou atacant de talie internațională se alătură lotului de seniori începând de luni.</div>
                        <a href="#">Citește mai mult...</a>
                    </li>
                    <li>
                        <div><strong>Bilete disponibile:</strong> Biletele pentru derby-ul local au fost puse în vânzare online. Grăbește-te, stocul este limitat!</div>
                        <a href="#">Citește mai mult...</a>
                    </li>
                </ul>
                <div class="stiri-controale">
                    <button id="btn-prev" type="button"><i class="fas fa-arrow-left"></i> Anterior</button>
                    <button id="btn-next" type="button">Următorul <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </section>

        <section>
            <h2>Galerie Foto Lot</h2>
            <div class="css-slider" id="slider-jucatori">
                <img src="imagine_portar.jfif" class="thumb t1" alt="Portar">
                <img src="imagine_atacant.jfif" class="thumb t2" alt="Atacant">
                <img src="imagine mijlocas.jfif" class="thumb t3" alt="Mijlocas">
                <img src="imagine fundas.jfif" class="thumb t4" alt="Fundas">
                <img src="imagine antrenor.jfif" class="thumb t5" alt="Antrenor">

                <div class="large-view">
                    <img src="imagine_portar.jfif" class="large-img l1" alt="Portar Mare">
                    <img src="imagine_atacant.jfif" class="large-img l2" alt="Atacant Mare">
                    <img src="imagine mijlocas.jfif" class="large-img l3" alt="Mijlocas Mare">
                    <img src="imagine fundas.jfif" class="large-img l4" alt="Fundas Mare">
                    <img src="imagine antrenor.jfif" class="large-img l5" alt="Antrenor Mare">
                </div>
            </div>

            <div class="slider-controle-js">
                <button id="btn-play-pause" type="button">
                    <i class="fas fa-play"></i> Play
                </button>
                <label>
                    <input type="checkbox" id="check-repetare"> Repetare (Loop)
                </label>
                <label>
                    Viteză (sec):
                    <select id="select-interval">
                        <option value="1000">1s</option>
                        <option value="2000" selected>2s</option>
                        <option value="3000">3s</option>
                        <option value="5000">5s</option>
                    </select>
                </label>
            </div>
        </section>

        <aside>
            <div class="widget-card">
                <h2><i class="fas fa-bullseye"></i> Obiective Club</h2>
                <details open>
                    <summary><strong>Obiective Sezonul Curent</strong></summary>
                    <ol type="1">
                        <li>Câștigarea Campionatului Național</li>
                        <li>Calificarea în faza avansată a Cupei</li>
                        <li>Promovarea a 3 juniori la prima echipă</li>
                    </ol>
                </details>
                <details style="margin-top: 10px;">
                    <summary><strong>Obiective pe Termen Lung</strong></summary>
                    <ul style="padding-left: 20px; padding-top: 10px;">
                        <li>Modernizarea bazei sportive de antrenament</li>
                        <li>Prezența constantă în competițiile europene</li>
                        <li>Dezvoltarea continuă a academiei de copii și juniori</li>
                    </ul>
                </details>
            </div>

            <div class="widget-card" style="margin-top: 20px;">
                <h2><i class="fas fa-ticket-alt"></i> Rezervare Bilete (AJAX)</h2>
                <form id="form-rezervare" style="padding: 10px;">
                    <p>
                        <label>Alege Meciul:</label><br>
                        <select id="meci-rezervare" style="width:100%; padding: 5px; margin-top:5px;">
                            <option value="FC Web vs CFR Cluj">FC Web vs CFR Cluj</option>
                            <option value="FC Web vs FCSB">FC Web vs FCSB</option>
                            <option value="FC Web vs Dinamo">FC Web vs Dinamo</option>
                        </select>
                    </p>
                    <p>
                        <label>Cantitate:</label><br>
                        <input type="number" id="nr-bilete" min="1" max="10" value="1" style="width:100%; padding: 5px; margin-top:5px;">
                    </p>
                    <button type="submit" style="background:#27ae60; color:white; border:none; padding:10px; cursor:pointer; width:100%; border-radius: 4px;">
                        Rezervă Acum
                    </button>
                    <div id="mesaj-rezervare" style="margin-top:15px; font-weight:bold; text-align:center;"></div>
                </form>
            </div>
        </aside>

        <?php if (isset($_SESSION['user_id'])): ?>
        <section id="sectiune-favorite" style="margin-top: 50px; background: #f9f9f9; padding: 20px; border-left: 5px solid #f39c12; border-radius: 4px;">
            <h2><i class="fas fa-heart" style="color: #e74c3c;"></i> Echipa mea Favorită</h2>
            <div id="lista-nume-favorite" style="margin-top: 15px;">
                <?php
                if (!empty($_SESSION['favorite'])) {
                    // Dacă avem ID-uri salvate în sesiune, le scoatem din baza de date
                    $ids = implode(',', $_SESSION['favorite']);
                    $sql_fav = "SELECT nume_jucator FROM jucatori WHERE id IN ($ids)";
                    $res_fav = mysqli_query($conn, $sql_fav);
                    
                    if ($res_fav && mysqli_num_rows($res_fav) > 0) {
                        while($fav = mysqli_fetch_assoc($res_fav)) {
                            echo "<span class='tag-jucator' style='background:#e0e0e0; padding:8px 15px; margin-right:10px; border-radius:20px; display:inline-block; margin-bottom:10px; font-weight: bold;'>" . htmlspecialchars($fav['nume_jucator']) . "</span>";
                        }
                    }
                } else {
                    echo "<p id='mesaj-gol-fav' style='color: #7f8c8d; font-style: italic;'>Nu ai adăugat încă niciun jucător la favorite.</p>";
                }
                ?>
            </div>
            <p style="font-size: 0.8em; color: #999; margin-top: 10px;">*Dă refresh la pagină pentru a vedea lista actualizată după ce folosești butoanele.</p>
        </section>
        <?php endif; ?>

    </main>

    <div id="modal-jucator" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img id="img-modal-mare" src="" alt="Imagine Jucator">
            <div id="info-modal-detalii"></div>
        </div>
    </div>

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
            <p>Copyright &copy; 2026 David Dumitreasa. Toate drepturile rezervate.</p>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="script.js"></script>
</body>
</html>