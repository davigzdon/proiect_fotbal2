<?php
session_start();
// Spunem browserului că îi vom răspunde în format JSON (standard pentru AJAX)
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Citim datele trimise din JavaScript (fetch API trimite date brute, nu prin $_POST clasic)
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Verificare de securitate: dacă nu e logat, dă eroare
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'eroare', 'mesaj' => 'Trebuie să fii logat pentru a rezerva bilete!']);
        exit;
    }

    $meci = $data['meci'] ?? '';
    $bilete = intval($data['bilete'] ?? 0);

    if ($meci != '' && $bilete > 0) {
        // Aici ai putea insera datele într-un tabel "rezervari" din baza de date.
        // Pentru a menține logica simplă, returnăm doar un mesaj de succes validat de server.
        echo json_encode(['status' => 'succes', 'mesaj' => "Ai rezervat cu succes $bilete bilete la $meci!"]);
    } else {
        echo json_encode(['status' => 'eroare', 'mesaj' => 'Date invalide!']);
    }
}
?>