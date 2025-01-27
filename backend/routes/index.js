const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/parts", require("./part"));
router.use("/users", require("./user"));
router.use("/cart", require("./cart"));
router.use("/order", require("./order"));

module.exports = router;
