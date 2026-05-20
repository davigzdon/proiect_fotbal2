<?php
session_start();
session_unset(); // Șterge toate variabilele de sesiune
session_destroy(); // Distruge sesiunea
header("Location: index.php"); // Trimite utilizatorul înapoi pe prima pagină
exit();
?>