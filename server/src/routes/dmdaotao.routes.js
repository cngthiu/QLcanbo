const router = require("express").Router();
const ctrl = require("../controllers/dmdaotao.controller");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", authenticate, authorize("ADMIN"), ctrl.getAll);
router.get("/trangthai", authenticate, authorize("ADMIN"), ctrl.getAllTrangThai);
router.post("/", authenticate, authorize("ADMIN"), ctrl.create);
router.put("/:id", authenticate, authorize("ADMIN"), ctrl.update);
router.delete("/:id", authenticate, authorize("ADMIN"), ctrl.remove);

module.exports = router;