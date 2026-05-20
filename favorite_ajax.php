<?php
session_start();
header('Content-Type: application/json');

// SECURITATE: Verificăm dacă utilizatorul are un ID în sesiune (dacă e logat)
if (!isset($_SESSION['user_id'])) {
    // Îi trimitem un status special ca JavaScript-ul să știe ce să facă
    echo json_encode(['status' => 'neautentificat', 'mesaj' => 'Trebuie să fii autentificat pentru a adăuga la favorite!']);
    exit; // Oprim execuția scriptului
}

$data = json_decode(file_get_contents('php://input'), true);
$id_jucator = intval($data['id_jucator'] ?? 0);

if ($id_jucator > 0) {
    if (!isset($_SESSION['favorite'])) {
        $_SESSION['favorite'] = [];
    }

    $index = array_search($id_jucator, $_SESSION['favorite']);
    
    if ($index !== false) {
        unset($_SESSION['favorite'][$index]);
        $_SESSION['favorite'] = array_values($_SESSION['favorite']);
        $status = 'sters';
    } else {
        $_SESSION['favorite'][] = $id_jucator;
        $status = 'adaugat';
    }

    echo json_encode([
        'status' => 'succes', 
        'actiune' => $status, 
        'total' => count($_SESSION['favorite'])
    ]);
} else {
    echo json_encode(['status' => 'eroare', 'mesaj' => 'ID invalid']);
}
?>