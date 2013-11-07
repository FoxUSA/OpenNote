<?php

//Include the vendor's autoloading library
include('vendor/autoload.php');
include(dirname(__FILE__).'/modules/core/Common.php');

//Create an Inversion of Control Container
$ioc = new \Illuminate\Container\Container();

//Create a repository
$repository = $ioc->make('\OpenNote\Data\Repositories\UserRepository');
var_dump($repository->get(
	array('id' => array(1, 2), 'username' => array('crazycodr', 'phil')), 
	array('id' => 'desc')
));