<?php
// Setăm parametrii de conectare pentru serverul local (XAMPP)
$host = "localhost";
$username = "dvar2643"; // XAMPP folosește implicit utilizatorul 'root'
$password = "N2QwZDE4ZTk5"; // Parola este lăsată goală implicit în XAMPP
$database = "dvar2643"; // Numele exact din phpMyAdmin

// Creăm conexiunea folosind funcția mysqli_connect
$conn = mysqli_connect($host, $username, $password, $database);

// Verificăm dacă conexiunea a eșuat
if (!$conn) {
    die("Conexiunea la baza de date a eșuat: " . mysqli_connect_error());
}
?>