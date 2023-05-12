<?php
require 'sql.php';

class sql_delete extends Connect
{
    public function delete($sku){
        $sku = array_map('intval', $sku); 
        $sku = implode(',', $sku);
        $db_delete = "DELETE FROM products_list WHERE sku in ($sku)";
        $this->sql->query($db_delete);
    }
}

$json_str = file_get_contents('php://input');
$sku_delete = json_decode($json_str, true);
$delete_request = new sql_delete($host = "localhost", $username = "mohamed_shalan", $password = "@01289MARiam", $dbname = "mysql");
$get_result = $delete_request->delete($sku_delete);
?>
