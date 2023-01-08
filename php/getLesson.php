<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS");
// header("Content-Type: application/json; charset=UT-8");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// $servername = "localhost";
// $username = "root";
// $password = "";
// $database= "credentials";
 
// // Create connection
// $db = mysqli_connect($servername, $username, $password, $database);

// if ($db->connect_error) {
//   die("Connection failed: " . $db->connect_error);
// }
// $result = mysqli_query($db, "SELECT * FROM quiz");
// $json_array = array();
// while($row = mysqli_fetch_assoc($result))
// {
//   $json_array[] = $row;  
// }

// print(json_encode($json_array));
// mysqli_close($db);



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

//GET THE QUESTIONS

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