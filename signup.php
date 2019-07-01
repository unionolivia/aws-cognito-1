<?php

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
    $user = $client->registerUser($username, $password, [
        'email' => $email
    ]);

//    $user = $client->getUser($username);
//    $user = $client->getUser($username);
    $result = $user['UserConfirmed'];
//    echo $user['Username'] . PHP_EOL;
//    var_dump($user);
//    var_dump($user['UserSub']);
//    var_dump($user['UserConfirmed']);

    echo json_encode(array(
        'result' => $result,
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

