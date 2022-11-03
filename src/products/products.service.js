const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

function list() {
  return knex("products").select("*");
}

// function read(productId) {
//   return knex("products").select("*").where({ product_id: productId }).first();
// }

function read(product_id) {
  return knex("products as p")
    .join("suppliers as s", "s.supplier_id", "p.supplier_id")
    .select(
      "p.*", 
      "s.supplier_id",
      "s.supplier_name",
      "s.supplier_city",
    )
    .where("p.product_id", product_id)
    .first()
    .then((data) => {
      return addSupplier(data);
    });
}


function listPriceSummary() {
  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

const addSupplier = mapProperties({
  supplier_id: "supplier.supplier_id",
  supplier_name: "supplier.supplier_name",
  supplier_city: "supplier.city"
});



module.exports = {
  list,
  read,
  listPriceSummary,
};
