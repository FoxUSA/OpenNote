<?php
namespace OpenNote\Data\Providers;

class GlobalCoreProxyProvider
{
	
	/**
	 * Runs a query and returns the result
	 * 
	 * @param string $query The query to run
	 * @param array $params The parameters to bind to the query
	 * 
	 * @return array Results of the query
	 */
	public static function query($query, $params = null){
		return \Core::query($query, $params);
	}
	
	/**
	 * @return - returns the id of the last inserted row
	 */
	public static function getLastInsertedId(){
		return \Core::getInsertID();
	}
	
	/**
	 * @return Escaped version of the value passed in
	 */
	public static function escape($data){
		return \Core::escape($data);
	}

}