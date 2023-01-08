<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
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
  $quizID = $request->QuizID;
  $sql = "SELECT * FROM question WHERE QuizID='$quizID'";
  $result = mysqli_query($db,$sql);
  if(mysqli_num_rows($result)>0){
    $json_array = array();
    while($row = mysqli_fetch_assoc($result))
    {
      $json_array[] = $row;
    }

    $response = ["data"=>"valid","quiz"=>$json_array];

    echo json_encode($response);
  }else{
    $response = ["data"=>"invalid"];
    echo json_encode($response);
  }
  }    
?>


