<?php

 header('Access-Control-Allow-Origin: *');
 header('Content-Type: application/json');

/** @var \pmill\AwsCognito\CognitoClient $client */
$client = require('bootstrap.php');

$data = [
    'email' => $_POST['email'],
    'password' => $_POST['password']
];


$email = $data['email'];
$password = $data['password'];
$username = $email;

try {
    $authenticationResponse = $client->authenticate($username, $password);
    echo json_encode(array(
        'result' => $authenticationResponse,
        'username' => $email
    ));
} catch (ChallengeException $e) {
    if ($e->getChallengeName() === CognitoClient::CHALLENGE_NEW_PASSWORD_REQUIRED) {
        $authenticationResponse = $client->respondToNewPasswordRequiredChallenge($username, 'password_new', $e->getSession());
        echo json_encode(array(
            'result' => $authenticationResponse
        ));
    }
} catch (PasswordResetRequiredException $e) {
    die("PASSWORD RESET REQUIRED");
}

//var_dump($authenticationResponse);


//echo json_encode($result);
//Your email address should receive an email with a confirmation code, run confirmUserRegistration.php next with your code

