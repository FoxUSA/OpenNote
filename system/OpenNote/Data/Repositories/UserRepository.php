<?php
namespace OpenNote\Data\Repositories;

class UserRepository
{

    /**
     * Contains the builder used to build instances of the retrieved data
     *
     * @var \OpenNote\Data\Builders\UserBuilder
     *
     * @access protected
     */
    protected $builder = null;

    /**
     * Contains the provider used to run queries against the datasource
     *
     * @var \OpenNote\Data\Providers\GlobalCoreProxyProvider
     *
     * @access protected
     */
    protected $provider = null;

    /**
     * Builds a new UserRepository used to retrieve and save users from the provider
     * 
     * @param \OpenNote\Data\Builders\UserBuilder Builder used to create instances of retrieved data
     * @param \OpenNote\Data\Providers\GlobalCoreProxyProvider Data provider used to query information from storage media
     *
     * @access public
     */
    public function __construct(\OpenNote\Data\Builders\UserBuilder $builder, \OpenNote\Data\Providers\GlobalCoreProxyProvider $provider)
    {
        $this->builder = $builder;
        $this->provider = $provider;
    }

    /**
     * Attempts to create a user into the database with the provided information
     * 
     * @param \OpenNote\Data\Models\User User to create, the ID will not be taken into account when creating. The new id of the inserted row into storage will be copied into the user object.
     *
     * @access public
     */
    public function create(\OpenNote\Data\Models\User $user)
    {

        //Build an SQL comprised of all the expected data
        $query = '
        INSERT INTO users
            (id, userName, password, lastLoginIP, lastLoginTime)
        VALUES
            (NULL, ?, ?, ?, ?)';

        //Prepare the sqlParams
        $sqlParams = array(
            $user->getUsername(),
            $user->getPassword(),
            $user->getLastLoginIp(),
            $user->getLastLoginDateTime()->format('Y-m-d G:i:s'),
        );

        //Query the data
        $this->provider->query($query, $sqlParams);
        $user->setId($this->provider->getLastInsertedId());

        //Return the userRepository so we can chain something else
        return $this;

    }

    /**
     * Method used to get information from the database in a simple unagregated select supporting sorting and conditions
     * 
     * @access public
     *
     * @param array $conditions Array of fieldnames as keys and values as filtered values (Valid field names for this are: id and/or username)
     * @param array $sortings Array of fields as values on which to sort the results
     *
     * @return array Returns an array of User models as per request parameters
     */
    public function get(array $conditions = array(), array $sortings = array())
    {

        //Setup the sql conditions
        $sqlConditions = array('1 = 1');
        $sqlParams = array();

        //Id based conditions
        if(isset($conditions['id']) && is_array($conditions['id']))
        {

            //If there are no values in the array, add a default null identifier
            if(count($conditions['id']) == 0)
            {
                $conditions['id'][] = 'null';
            }
            
            //Linearise the condition values as multiple ? marks
            $sqlConditions[] = 'id IN ('.implode(',', array_fill(0, count($conditions['id']), '?')).')';
            $sqlParams = array_merge($sqlParams, $conditions['id']);

        }
        elseif(isset($conditions['id']) && is_numeric($conditions['id']))
        {
            $sqlConditions[] = 'id = ?';
            $sqlParams[] = $conditions['id'];
        }

        //Username based conditions
        if(isset($conditions['username']) && is_array($conditions['username']))
        {

            //If there are no values in the array, add a default null identifier
            if(count($conditions['username']) == 0)
            {
                $conditions['username'][] = 'null';
            }
            
            //Linearise the condition values
            $sqlConditions[] = 'username IN ('.implode(',', array_fill(0, count($conditions['username']), '?')).')';
            $sqlParams = array_merge($sqlParams, $conditions['username']);

        }
        elseif(isset($conditions['username']) && is_string($conditions['username']))
        {
            $sqlConditions[] = 'username = ?';
            $sqlParams[] = $conditions['username'];
        }

        //Basic sortings
        $sqlSortings = array();

        //Build the sortings
        foreach($sortings as $field => $direction)
        {

            //If the field is numeric, it means the direction is the field to process
            if(is_numeric($field))
            {
                $field = $direction;
                $direction = 'asc';
            }

            //If the direction is not desc, it is asc
            if(strtolower($direction) != 'desc')
            {
                $direction = 'asc';
            }

            //Based on the field, add the sorting
            switch($field)
            {
                case 'id':
                case 'username':
                    $sqlSortings[] = $field.' '.$direction;
                    break;
            }

        }

        //If there are no sortings, add the default username sort
        if(count($sqlSortings) == 0)
        {
            $sqlSortings[] = 'username asc';
        }

        //Build an SQL comprised of all the expected data
        $query = '
        SELECT 
            id, username, password, lastLoginIP last_login_ip, lastLoginTime last_login_time 
        FROM
            users
        WHERE
            '.implode(' AND ', $sqlConditions).'
        ORDER BY
            '.implode(', ', $sqlSortings);

        //Query the data
        $results = array();
        $dataRows = $this->provider->query($query, $sqlParams);
        foreach($dataRows as $row)
        {
            $results[] = $this->builder->build($row);
        }
        return $results;

    }

}