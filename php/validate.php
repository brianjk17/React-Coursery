<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UT-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$servername = "localhost";
$username = "root";
$password = "";
$database= "credentials";
 
// Create connection
$db = mysqli_connect($servername, $username, $password, $database);


// Check connection
if ($db->connect_error) {
  die("Connection failed: " . $db->connect_error);
}

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $name = $request->username;
    $passwordd = $request->password;
    $sql1 = "SELECT * FROM student WHERE username='$name' AND password='$passwordd'";
    $result = mysqli_query($db,$sql1);
    if(mysqli_num_rows($result)>0){
      echo "<script>alert('Sign In Success')</script>";
      $response = [
        'data' => 'valid',
        //'response' => 'valid'
      ];
      echo json_encode($response);
    }else{
      $response = [
       'data' => 'invalid',
       //'response' => 'invalid'
      ];
      echo json_encode($response);
       
     }       
}
?>