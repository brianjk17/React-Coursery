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
    $title = $request->title;
    $subject = $request->subject;
    // $sql1 = "SELECT * FROM info WHERE title='$title' AND subject='$subject'";
    $sql = "INSERT INTO quiz (title,subject) VALUES ('$title','$subject')";
    $resulted = mysqli_query($db,$sql) or die (mysqli_error($db));
    if($resulted){
      $result = mysqli_query($db, ("SELECT QuizID FROM quiz WHERE title='$title' AND subject='$subject'"));
      $json_array = array();
      while($row = mysqli_fetch_assoc($result))
      {
        $json_array[] = $row;  
      }
      $response = ['data'=>'valid', 'QuizID' => $json_array] 
      ;
      echo json_encode($response);
    } else{
      $response['data']=array(
        'data'=>'invalid',
        'error'=>$error
      );
      echo json_encode($response);
  } 
} 
//mysqli_close($db);
      //get
      

?>