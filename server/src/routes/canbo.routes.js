//server/src/routes/canbo.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/canbo.controller");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate, ctrl.getAllCanBo);
router.get("/view/:id", authenticate, ctrl.getCBById);
router.delete("/:id", authenticate, ctrl.deleteCanBo);
router.patch("/update/:id", ctrl.updateCanBo);


router.get("/donvi", authenticate, ctrl.getDonVi);
router.post("/", authenticate, ctrl.createCanBo); 


module.exports = router;
