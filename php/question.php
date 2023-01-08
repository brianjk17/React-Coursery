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
    //$title = $request->title;
    //$subject = $request->subject;
    // $sql1 = "SELECT * FROM info WHERE title='$title' AND subject='$subject'";
    $sql = "SELECT * FROM question WHERE quizID='$'";
      if(mysqli_query($db,$sql)){
        $response = [
            'data' => 'success',
            'response' => 'valid'
          ];
        
        echo json_encode($response);
      }else{
        $response = [
            'data' => 'failed',
            'response' => 'invalid'
           ];
        echo json_encode($response);
       }       
}

?>