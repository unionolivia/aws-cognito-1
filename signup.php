<?php

//Access-Control-Allow-Origin header with wildcard.
 header('Access-Control-Allow-Origin: *');
 header('Content-Type: application/json');

/** @var \pmill\AwsCognito\CognitoClient $client */
$client = require('bootstrap.php');
//Initiate the MySQL connection
$pdo = require('db.php');
print_r($client);
print_r($db);
print_r(client);
die();

// Get the data from the client
$data = [
    'email' => $_POST['email'],
    'password' => $_POST['password'],
    'username' => $_POST['username'],
    'firstname' => $_POST['firstname'],
    'lastname' => $_POST['lastname'],
];


// Let's apply some logic
$stmt = $pdo->prepare("SELECT email FROM user WHERE email = :email");

    $stmt->execute(array(
        ':email' => $username,
        ));
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!empty($user)) {
                $email = $user['email'];

                // header("Location:../admin/");
    }

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

    if($user){
        $groupName = 'Buyers';

        $client->addUserToGroup($username, $groupName);

    }

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

