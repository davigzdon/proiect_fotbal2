<?php
session_start();
require_once 'conexiune.php';

// ==========================================
// 1. SECURITATE
// ==========================================
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'admin') {
    header("Location: index.php");
    exit();
}

$mesaj_actiune = "";
$jucator_de_editat = null; // Variabilă care va ține datele jucătorului dacă vrem să-l modificăm

// ==========================================
// 2. CREATE: Adăugarea unui jucător nou
// ==========================================
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['btn_adauga_jucator'])) {
    $nume = mysqli_real_escape_string($conn, $_POST['nume_jucator']);
    $pozitie = mysqli_real_escape_string($conn, $_POST['pozitie']);
    $poza = mysqli_real_escape_string($conn, $_POST['poza']);
    $stat1 = mysqli_real_escape_string($conn, $_POST['statistica1']);
    $stat2 = mysqli_real_escape_string($conn, $_POST['statistica2']);

    $sql_insert = "INSERT INTO jucatori (nume_jucator, pozitie, poza, statistica1, statistica2) 
                   VALUES ('$nume', '$pozitie', '$poza', '$stat1', '$stat2')";
    
    if (mysqli_query($conn, $sql_insert)) {
        $mesaj_actiune = "<div style='color: green; font-weight: bold; margin-bottom: 15px;'>Jucător adăugat cu succes!</div>";
    }
}

// ==========================================
// 3. UPDATE: Salvarea modificărilor (Când dăm Submit pe formularul de editare)
// ==========================================
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['btn_salveaza_modificari'])) {
    $id = intval($_POST['id_jucator']); // Preluăm ID-ul ascuns
    $nume = mysqli_real_escape_string($conn, $_POST['nume_jucator']);
    $pozitie = mysqli_real_escape_string($conn, $_POST['pozitie']);
    $poza = mysqli_real_escape_string($conn, $_POST['poza']);
    $stat1 = mysqli_real_escape_string($conn, $_POST['statistica1']);
    $stat2 = mysqli_real_escape_string($conn, $_POST['statistica2']);

    // Comanda UPDATE suprascrie datele vechi cu cele noi, exact unde ID-ul se potrivește
    $sql_update = "UPDATE jucatori SET 
                    nume_jucator = '$nume', 
                    pozitie = '$pozitie', 
                    poza = '$poza', 
                    statistica1 = '$stat1', 
                    statistica2 = '$stat2' 
                   WHERE id = $id";
    
    if (mysqli_query($conn, $sql_update)) {
        $mesaj_actiune = "<div style='color: blue; font-weight: bold; margin-bottom: 15px;'>Modificările au fost salvate cu succes!</div>";
    }
}

// ==========================================
// 4. DELETE: Ștergerea unui jucător
// ==========================================
if (isset($_GET['sterge'])) {
    $id_de_sters = intval($_GET['sterge']);
    $sql_delete = "DELETE FROM jucatori WHERE id = $id_de_sters";
    if (mysqli_query($conn, $sql_delete)) {
        $mesaj_actiune = "<div style='color: orange; font-weight: bold; margin-bottom: 15px;'>Jucătorul a fost șters!</div>";
    }
}

// ==========================================
// 5. PREGĂTIRE EDITARE: Preluăm datele dacă am apăsat pe butonul "Modifică"
// ==========================================
if (isset($_GET['editeaza'])) {
    $id_de_editat = intval($_GET['editeaza']);
    $sql_get_jucator = "SELECT * FROM jucatori WHERE id = $id_de_editat";
    $rezultat = mysqli_query($conn, $sql_get_jucator);
    
    // Dacă am găsit jucătorul, salvăm datele lui în variabila $jucator_de_editat
    if (mysqli_num_rows($rezultat) == 1) {
        $jucator_de_editat = mysqli_fetch_assoc($rezultat);
    }
}

// ==========================================
// 6. READ: Preluăm lista actualizată pentru tabel
// ==========================================
$sql_jucatori = "SELECT * FROM jucatori";
$rezultat_jucatori = mysqli_query($conn, $sql_jucatori);
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrare Lot - FC Programare Web</title>
    <link rel="stylesheet" href="stil.css">
</head>
<body>
    <header>
        <h1>Panou de Administrare (Admin)</h1>
    </header>

    <nav>
        <ul class="menu-principal">
            <li><a href="index.php">Înapoi la Site (Acasă)</a></li>
            <li><a href="logout.php" style="color: #e74c3c;">Deconectare</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2><?php echo $jucator_de_editat ? "Editează Jucător: " . $jucator_de_editat['nume_jucator'] : "Adaugă Jucător Nou"; ?></h2>
            <?php echo $mesaj_actiune; ?>
            
            <form action="administrare.php" method="POST" style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
                
                <?php if ($jucator_de_editat): ?>
                    <input type="hidden" name="id_jucator" value="<?php echo $jucator_de_editat['id']; ?>">
                <?php endif; ?>

                <p>
                    <label>Nume Jucător:</label><br>
                    <input type="text" name="nume_jucator" required style="width: 100%; padding: 8px;" 
                           value="<?php echo $jucator_de_editat ? $jucator_de_editat['nume_jucator'] : ''; ?>">
                </p>
                <p>
                    <label>Poziție:</label><br>
                    <select name="pozitie" required style="width: 100%; padding: 8px;">
                        <option value="Portar" <?php echo ($jucator_de_editat && $jucator_de_editat['pozitie'] == 'Portar') ? 'selected' : ''; ?>>Portar</option>
                        <option value="Fundaș" <?php echo ($jucator_de_editat && $jucator_de_editat['pozitie'] == 'Fundaș') ? 'selected' : ''; ?>>Fundaș</option>
                        <option value="Mijlocaș" <?php echo ($jucator_de_editat && $jucator_de_editat['pozitie'] == 'Mijlocaș') ? 'selected' : ''; ?>>Mijlocaș</option>
                        <option value="Atacant" <?php echo ($jucator_de_editat && $jucator_de_editat['pozitie'] == 'Atacant') ? 'selected' : ''; ?>>Atacant</option>
                    </select>
                </p>
                <p>
                    <label>Nume Fișier Poză:</label><br>
                    <input type="text" name="poza" required style="width: 100%; padding: 8px;"
                           value="<?php echo $jucator_de_editat ? $jucator_de_editat['poza'] : ''; ?>">
                </p>
                <p>
                    <label>Statistica 1:</label><br>
                    <input type="text" name="statistica1" required style="width: 100%; padding: 8px;"
                           value="<?php echo $jucator_de_editat ? $jucator_de_editat['statistica1'] : ''; ?>">
                </p>
                <p>
                    <label>Statistica 2:</label><br>
                    <input type="text" name="statistica2" required style="width: 100%; padding: 8px;"
                           value="<?php echo $jucator_de_editat ? $jucator_de_editat['statistica2'] : ''; ?>">
                </p>

                <?php if ($jucator_de_editat): ?>
                    <button type="submit" name="btn_salveaza_modificari" style="background: #2980b9; color: white; padding: 10px 20px; border: none; cursor: pointer;">
                        Salvează Modificări
                    </button>
                    <a href="administrare.php" style="margin-left: 15px; color: #555;">Anulează</a>
                <?php else: ?>
                    <button type="submit" name="btn_adauga_jucator" style="background: #27ae60; color: white; padding: 10px 20px; border: none; cursor: pointer;">
                        Adaugă în Lot
                    </button>
                <?php endif; ?>
            </form>
        </section>

        <section style="margin-top: 40px;">
            <h2>Gestiune Lot Curent</h2>
            <table id="tabel-jucatori" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #333; color: white;">
                        <th>ID</th>
                        <th>Nume</th>
                        <th>Poziție</th>
                        <th>Acțiuni</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (mysqli_num_rows($rezultat_jucatori) > 0) {
                        while($jucator = mysqli_fetch_assoc($rezultat_jucatori)) {
                            echo "<tr style='border-bottom: 1px solid #ccc; text-align: center;'>";
                            echo "<td style='padding: 10px;'>" . $jucator['id'] . "</td>";
                            echo "<td><strong>" . $jucator['nume_jucator'] . "</strong></td>";
                            echo "<td>" . $jucator['pozitie'] . "</td>";
                            
                            // AICI ESTE MODIFICAREA: Am adăugat link-ul de Editare lângă cel de Ștergere
                            echo "<td>
                                    <a href='administrare.php?editeaza=" . $jucator['id'] . "' style='color: #2980b9; text-decoration: none; font-weight: bold; margin-right: 15px;'>
                                        [✎] Editează
                                    </a>
                                    <a href='administrare.php?sterge=" . $jucator['id'] . "' style='color: red; text-decoration: none; font-weight: bold;' onclick='return confirm(\"Sigur vrei să ștergi acest jucător?\");'>
                                        [X] Șterge
                                    </a>
                                  </td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='4'>Nu există jucători în baza de date.</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>