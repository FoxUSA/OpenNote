<?php
namespace OpenNote\Data\Factories;

class UserFactory
{

    /**
     * Traditionnal factory create function that returns a new instance of the object to create
     * 
     * @access public
     *
     * @return \OpenNote\Data\Models\User New instance of a User model
     */
    public function create()
    {
        return new \OpenNote\Data\Models\User();
    }

}