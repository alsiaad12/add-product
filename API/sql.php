<?php
abstract class Connect
{
    public $sql;
    public function __construct($host, $user, $pass, $database)
    {
        $this->sql = new mysqli($host, $user, $pass, $database);

        if ($this->sql->connect_error) {
            die("Connection failed with error : " . $this->sql->connect_error);
        }

    }
}

?>