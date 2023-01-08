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
echo "Connected successfully";

 $postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $name = $request->username;
    $email = $request->email;
    $passwordd = $request->password;
    $sql1 = "SELECT * FROM student WHERE username='$name' OR email='$email'";
    $sql = "INSERT INTO student (username,email,password) VALUES ('$name','$email','$passwordd')";
    $result = mysqli_query($db,$sql1);
    if(mysqli_num_rows($result)>0){
      echo "alert('Username or Email already Exists')";
      $response['data']=array(
        'status'=>'invalid'
      );
      echo json_encode($response);
      http_response_code(422); 
    }else{
      echo "gak ketemu";
      if(mysqli_query($db,$sql)){
        $response['data']=array(
          'status'=>'valid'
        );
        echo json_encode($response);
        http_response_code(201);
      }else{
        $response['data']=array(
          'status'=>'invalid'
        );
        echo json_encode($response);
        http_response_code(422); 
       }   
      }      
}
?>