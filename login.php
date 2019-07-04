<?php

 header('Access-Control-Allow-Origin: *');
 header('Content-Type: application/json');

/** @var \pmill\AwsCognito\CognitoClient $client */
$client = require('bootstrap.php');

//Initiate the MySQL connection
include 'db.php';

// Get the data from the form field

$data = [
    'username' => $_POST['username']
    // 'password' => $_POST['password']
];

// Let's store the values from the form field into some variables
// $email = $data['email'];
// $password = $data['password'];
$username = $data['username'];

/* Let's apply some logic */
// Does the person username even reside in the AWS RDS User tables?
$stmt = $pdo->prepare("SELECT username FROM user WHERE username = :username");

    $stmt->execute(array(
        ':username' => $username,
        ));
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!empty($user)) {
        // get the username and store it for future use
                $username = $user['username'];
                 echo json_encode(array(
                    'result' => true
                ));
    }
    else{
        echo json_encode(array(
            'result' => false
        ));
    }

// try {
//     $authenticationResponse = $client->authenticate($username, $password);
//     echo json_encode(array(
//         'result' => $authenticationResponse,
//         'username' => $email
//     ));
// } catch (ChallengeException $e) {
//     if ($e->getChallengeName() === CognitoClient::CHALLENGE_NEW_PASSWORD_REQUIRED) {
//         $authenticationResponse = $client->respondToNewPasswordRequiredChallenge($username, 'password_new', $e->getSession());
//         echo json_encode(array(
//             'result' => $authenticationResponse
//         ));
//     }
// } catch (PasswordResetRequiredException $e) {
//     die("PASSWORD RESET REQUIRED");
// }

//var_dump($authenticationResponse);


//echo json_encode($result);
//Your email address should receive an email with a confirmation code, run confirmUserRegistration.php next with your code