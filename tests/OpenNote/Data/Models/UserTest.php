<?php
class UserTest extends PHPUnit_Framework_TestCase
{

	public function testPropertyAccessors()
	{

		//Create the instance
		$instance = new \OpenNote\Data\Models\User();

		//Test default values
		$this->assertEquals(null, $instance->getId());
		$this->assertEquals(null, $instance->getUsername());
		$this->assertEquals(null, $instance->getPassword());
		$this->assertEquals(null, $instance->getLastLoginIp());
		$this->assertEquals(null, $instance->getLastLoginDateTime());

		//Test the setters and getters
		$instance->setId(777);
		$instance->setUsername('tester');
		$instance->setPassword('password');
		$instance->setLastLoginIp('127.0.0.1');
		$instance->setLastLoginDateTime(new \DateTime('2013-01-01 23:00:55'));
		$this->assertEquals(777, $instance->getId());
		$this->assertEquals('tester', $instance->getUsername());
		$this->assertEquals('password', $instance->getPassword());
		$this->assertEquals('127.0.0.1', $instance->getLastLoginIp());
		$this->assertEquals(new \DateTime('2013-01-01 23:00:55'), $instance->getLastLoginDateTime());

	}
	
    /**
     * @dataProvider testInvalidValuesDataProvider
     * @expectedException InvalidArgumentException
     */
	public function testInvalidValues($value)
	{

		//Create the instance
		$instance = new \OpenNote\Data\Models\User();

		//Set an invalid value to ID to see it
		$instance->setId($value);

	}

	public function testInvalidValuesDataProvider()
	{
		return array(
			array('value' => -11),
			array('value' => -1),
			array('value' => 0),
			array('value' => 'a')
		);
	}

}