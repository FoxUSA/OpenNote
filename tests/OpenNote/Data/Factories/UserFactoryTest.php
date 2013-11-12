<?php
class UserFactoryTest extends PHPUnit_Framework_TestCase
{

	public function testCreate()
	{

		//Create the instance
		$instance = new \OpenNote\Data\Factories\UserFactory();

		//Test creation returns the right instance
		$this->assertInstanceOf('OpenNote\Data\Models\User', $instance->create());

	}

}