<?php
		
		/* Load the autoloader */
		require('vendor/autoload.php');
		
		$config = require('params.php');

		$aws = new \Aws\Sdk($config);
		$cognitoClient = $aws->createCognitoIdentityProvider();

		$client = new \pmill\AwsCognito\CognitoClient($cognitoClient);
		$client->setAppClientId($config['app_client_id']);
//		$client->setAppClientSecret('');
		$client->setAppClientSecret($config['app_client_secret']);
		$client->setRegion($config['region']);
		$client->setUserPoolId($config['user_pool_id']);
					
		return $client;
