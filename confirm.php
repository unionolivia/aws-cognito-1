<?php

header('Content-Type: application/json');

/** @var \pmill\AwsCognito\CognitoClient $client */
$client = require('bootstrap.php');

$data = [
    'email' => $_POST['email'],
    'verifycode' => $_POST['verifycode']
];


$email = $data['email'];
$verificationcode = $data['verifycode'];
$username = $email;

try {
    

    $user = $client->confirmUserRegistration($verificationcode, $username);

    echo json_encode(array(
        'result' => $user,
        'username' => $email
    ));
} catch (\pmill\AwsCognito\Exception\ChallengeException $e) {
    echo json_encode(array(
        'error' => array(
            'code' => $e->getResponse(),
            'message' => $e->getChallengeName(),
        )
    ));
}

//echo json_encode($result);
//Your email address should receive an email with a confirmation code, run confirmUserRegistration.php next with your code

