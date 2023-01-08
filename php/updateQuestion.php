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

//UPDATE THE QUESTION
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $question = $request->Question;
    $answer = $request->answer;
    $choice2 = $request->choice2;
    $choice3 = $request->choice3;
    $choice4 = $request->choice4;
    //$quizid = $request->QuizID;
    $questionid = $request->QuestionID;
    // $sql1 = "SELECT * FROM info WHERE title='$title' AND subject='$subject'";
    $sql = "UPDATE question 
            SET Question='$question', answer='$answer', choice2='$choice2', choice3='$choice3',choice4='$choice4'
            WHERE QuestionID='$questionid'";
    //$sql = "INSERT INTO question (Question,choice2,choice3,choice4,answer,QuizID) VALUES ('$question','$choice2','$choice3','$choice4','$answer','$quizid')";
      
    if(mysqli_query($db,$sql)){
      $response = [
          'data' => 'success',
        ];
      echo json_encode($response);
    }else{
      $response = [
          'data' => 'failed',
         ];
      print(json_encode($response));
    }
  }
?>