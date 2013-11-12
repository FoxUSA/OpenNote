<?php
namespace OpenNote\Data\Models;

class User
{
	
    /**
     * Protected container for the id of the object
     *
     * @var number
     *
     * @access protected
     */
	protected $id = null;

    /**
     * Protected container for the username
     *
     * @var string
     *
     * @access protected
     */
	protected $username = null;

    /**
     * Protected container for the current password (Hashed)
     *
     * @var string
     *
     * @access protected
     */
	protected $password = null;

    /**
     * Protected container for the last login ip
     *
     * @var string
     *
     * @access protected
     */
	protected $lastLoginIp = null;

    /**
     * Protected container of the last login date
     *
     * @var \DateTime
     *
     * @access protected
     */
	protected $lastLoginDateTime = null;

    /**
     * Returns the ID of the user
     * 
     * @access public
     *
     * @return number ID of the user
     */
	public function getId()
	{
		return $this->id;
	}

    /**
     * Returns the username of the user
     * 
     * @access public
     *
     * @return string Username of the user
     */
	public function getUsername()
	{
		return $this->username;
	}

    /**
     * Returns the password of the user
     * 
     * @access public
     *
     * @return string Hashed password of the user
     */
	public function getPassword()
	{
		return $this->password;
	}

    /**
     * Returns the last ip used to log in with this user
     * 
     * @access public
     *
     * @return string IP of the last login
     */
	public function getLastLoginIp()
	{
		return $this->lastLoginIp;
	}

    /**
     * Returns the last date at which this user logged on
     * 
     * @access public
     *
     * @return \DateTime DateTime at which the user last logged on
     */
	public function getLastLoginDateTime()
	{
		return $this->lastLoginDateTime;
	}

    /**
     * Sets the ID of the user
     * 
     * @access public
     *
     * @param number $value New id of the user
     */
	public function setId($value)
	{
        if(!is_null($value) && (!is_numeric($value) || $value <= 0 || abs($value) != $value))
        {
            throw new \InvalidArgumentException('setId($value) must be a non-zero positive integer value');
        }
		$this->id = $value;
	}

    /**
     * Returns the username of the user
     * 
     * @access public
     *
     * @param string $value New username of the user
     */
	public function setUsername($value)
	{
		$this->username = $value;
	}

    /**
     * Returns the password of the user
     * 
     * @access public
     *
     * @param string $value New hashed password of the user
     */
	public function setPassword($value)
	{
		$this->password = $value;
	}

    /**
     * Returns the last ip used to log in with this user
     * 
     * @access public
     *
     * @param string $value New ip that was last used to log in
     */
	public function setLastLoginIp($value)
	{
		$this->lastLoginIp = $value;
	}

    /**
     * Returns the last date at which this user logged on
     * 
     * @access public
     *
     * @param number $value New date time at which the user logged on
     */
	public function setLastLoginDateTime(\DateTime $value)
	{
		$this->lastLoginDateTime = $value;
	}

}