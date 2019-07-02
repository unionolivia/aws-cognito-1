<?php

// header('Content-Type: application/json');

/** @var \pmill\AwsCognito\CognitoClient $client */
$client = require('bootstrap.php');


$data = [
    'email' => $_POST['email'],
    'password' => $_POST['password'],
    'username' => $_POST['username'],
    'firstname' => $_POST['firstname'],
    'lastname' => $_POST['lastname'],
];


$email = $data['email'];
$password = $data['password'];
$username = $data['username'];
$lastname = $data['lastname'];
$firstname = $data['firstname'];

try {
    $user = $client->registerUser($username, $password, [
        'email' => $email,
        'family_name' => $lastname,
        'given_name' => $firstname,
        'custom:display_name' => $firstname.''.$lastname, 
    ]);

//    $user = $client->getUser($username);
//    $user = $client->getUser($username);
    $result = $user['UserConfirmed'];
//    echo $user['Username'] . PHP_EOL;
//    var_dump($user);
//    var_dump($user['UserSub']);
//    var_dump($user['UserConfirmed']);

print_r($user);
die();

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

