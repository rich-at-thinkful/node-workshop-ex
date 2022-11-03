const router = require("express").Router();
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/price-summary")
  .get(controller.listPriceSummary)
  .all(methodNotAllowed);

router
  .route("/:productId")
  .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;
