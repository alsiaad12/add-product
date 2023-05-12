<?php
require 'sql.php';

class Add extends Connect
{
    private $skuExist = false;

    private function checkSku($sku)
    {
        $dbSku = "SELECT * FROM products_list WHERE sku = ?";
        $stmt = $this->sql->prepare($dbSku);
        $stmt->bind_param("s", $sku);
        $stmt->execute();
        if ($stmt->fetch()) {
            $this->skuExist = true;
            die("A product with SKU $sku already exists in the database!");
        }
    }

    public function insertProduct($products)
    {
        $this->checkSku($products['SKU']);

        if (!$this->skuExist) {
            $stmt = $this->sql->prepare("INSERT INTO products_list (sku, name, price, type, size, weight, height, width, length) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssdssdddd", $products['SKU'], $products['Name'], $products['Price'], $products['Type'], $products['size'], $products['weight'], $products['height'], $products['width'], $products['length']);
            $stmt->execute();
            if ($stmt->error_list) {
                var_dump($stmt->error_list);
            }
        }
    }
}

$jsonStr = file_get_contents('php://input');
$products = json_decode($jsonStr, true);
$add = new Add($host = "localhost", $username = "mohamed_shalan", $password = "@01289MARiam", $dbname = "mysql");
$add->insertProduct($products);