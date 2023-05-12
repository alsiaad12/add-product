<?php
require 'sql.php';
class sql_get extends Connect
{
    public function get(){
        $db_sku = "SELECT * FROM products_list";
        $result = $this->sql->prepare($db_sku);
        $result->execute();
        $result = $result->get_result();
        $products = array();
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        return $products;
    }
}

$get_request = new sql_get($host = "localhost", $username = "mohamed_shalan", $password = "@01289MARiam", $dbname = "mysql");
$get_result = $get_request->get();
header('Content-Type: application/json');
echo json_encode($get_result);

?>