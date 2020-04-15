<?php
//Grab Variables
$attempts = $_GET['attempts'];
$matches = $_GET['matches'];
$average = $_GET['average'];
$score = $_GET['score'];
$seconds = $_GET['seconds'];

//DB Connect Code
include('db-config.php');
$conn = mysqli_connect('localhost', $db_user, $db_pass);
mysqli_select_db($conn, $db_name);

//Query the DB
$query = "INSERT INTO scores(mbrID, attempts, matches, average, score, seconds) VALUES(1, '$attempts', '$matches', '$average', '$score', '$seconds')";
mysqli_query($conn, $query);

//R in Crud
$query2 = "SELECT * FROM scores ORDER BY score DESC LIMIT 10";
$query2Result = mysqli_query($conn, $query2);
//Loop through results
$tbl = '<table width="100%">';
$tbl .= '<tr><th>ID</th><th>Score</th><th>Seconds</th><th>When</th></tr>';

while($row=mysqli_fetch_array($query2Result)){
    $tbl.='<tr>
                <td>' .$row['IDscore']. '</td>
                <td>' .$row['score']. '</td>
                <td>' .$row['seconds']. '</td>
                <td>' .$row['dateTime']. '</td>
            </tr>';
}
    $tbl.= '</table>';

if(mysqli_affected_rows($conn)==1){
    $responseText = "Score Saved to Database";
}else{
    $responseText = 'Couldn\'t save score';
}

myJSON = json_encode
echo $responseText;
echo $tbl;
?>