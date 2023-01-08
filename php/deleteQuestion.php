<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
header("Content-Type: application/json; charset=UT-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$servername = "localhost";
$username = "root";
$password = "";
$database= "credentials";
 
// Create connection
$db = mysqli_connect($servername, $username, $password, $database);

if ($db->connect_error) {
  die("Connection failed: " . $db->connect_error);
}

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
  $request = json_decode($postdata);
  $quizid = $request->QuizID;
  $sql = "DELETE FROM quiz WHERE QuizID='$quizid'";
  $result = mysqli_query($db,$sql);
  
  if(mysqli_num_rows($result)>0){
    $response = ["data"=>"Delete Succesful"];
    echo json_encode($response);
  }else{
    $response = ["data"=>"Delete Failed"];
    echo json_encode($response);
  }
}
mysqli_close($db);
?>