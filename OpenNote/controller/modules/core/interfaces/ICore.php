<?php
/**
 *	Project name: OpenNote
 * 	Author: Jacob Liscom
 *	Version: 13.3.0
**/

	interface ICore{
		/**
		 * runs a query
		 * @param query - the query to run
		 * @param param - the parameters of the query. May be null
		 * @return - the query return
		 */
		public static function query($query, $param = null);
		
		/**
		 * @return - returns the id of the last inserted row
		 */
		public static function getInsertID();
		
		/**
		 * Disconnect from server
		 */
		public static function disconnect();
		
		/**
		 * connect to server
		 */
		public static function connect();
	}
?>
		