<?php
class UserBuilderTest extends PHPUnit_Framework_TestCase
{

	public function testBuildValid()
	{

		//Mock the factory
		$userFactoryMock = Mockery::mock('\OpenNote\Data\Factories\UserFactory');
		$userFactoryMock->shouldReceive('create')->once()->passthru();

		//Create the instance
		$instance = new \OpenNote\Data\Builders\UserBuilder($userFactoryMock);

		//Test a single build
		$result = $instance->build(array(
			'id' => 777,
			'username' => 'tester',
			'password' => 'pass',
			'last_login_ip' => '127.0.0.1',
			'last_login_datetime' => '2013-01-01 23:00:52'
		));

		//Assert the values and the object
		$this->assertInstanceOf('OpenNote\Data\Models\User', $result);
		$this->assertEquals(777, $result->getId());
		$this->assertEquals('tester', $result->getUsername());
		$this->assertEquals('pass', $result->getPassword());
		$this->assertEquals('127.0.0.1', $result->getLastLoginIp());
		$this->assertEquals(new \DateTime('2013-01-01 23:00:52'), $result->getLastLoginDateTime());

	}

}