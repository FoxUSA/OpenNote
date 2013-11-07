<?php
namespace OpenNote\Data\Builders;

class UserBuilder
{

    /**
     * Contains the factory used to instanciate a new User model
     *
     * @var \OpenNote\Data\Factories\UserFactory
     *
     * @access protected
     */
    protected $factory = null;

    /**
     * Builds a new UserBuilder used to construct a User from a standard data source and a factory
     * 
     * @param \OpenNote\Data\Factories\UserFactory Factory used to create instances of the object we want to manage
     *
     * @access public
     */
    public function __construct(\OpenNote\Data\Factories\UserFactory $factory)
    {
        $this->factory = $factory;
    }

    /**
     * Traditionnal builder build function that returns a new instance of the object to create based on specificaly formated raw data
     * 
     * @access public
     *
     * @return \OpenNote\Data\Models\User New instance of a User model
     */
    public function build(array $rawData)
    {

        //Validate the raw data needed to instanciate the object
        if(!array_key_exists('id', $rawData))
        {
            throw new \InvalidArgumentException('RawData["id"] is missing');
        }
        if(!array_key_exists('username', $rawData))
        {
            throw new \InvalidArgumentException('RawData["username"] is missing');
        }
        if(!array_key_exists('password', $rawData))
        {
            throw new \InvalidArgumentException('RawData["password"] is missing');
        }

        //Default the rest
        if(!array_key_exists('last_login_ip', $rawData))
        {
            $rawData['last_login_ip'] = '';
        }
        if(!array_key_exists('last_login_datetime', $rawData))
        {
            $rawData['last_login_datetime'] = null;
        }

        //Create a new instance
        $instance = $this->factory->create();

        //Fill the instance
        $instance->setId($rawData['id']);
        $instance->setUsername($rawData['username']);
        $instance->setPassword($rawData['password']);
        $instance->setLastLoginIp($rawData['last_login_ip']);
        $instance->setLastLoginDateTime(new \DateTime($rawData['last_login_datetime']));

        //Return the instance
        return $instance;

    }

}