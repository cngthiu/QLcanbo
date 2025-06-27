//server/src/routes/daotao.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/bangcap.controller");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", authenticate, authorize("ADMIN", "GiangVien"), ctrl.getAll);
router.post("/", authenticate, authorize("ADMIN"), ctrl.create);
router.put("/:id", authenticate, authorize("ADMIN"), ctrl.update);
router.delete("/:id", authenticate, authorize("ADMIN"), ctrl.remove);

module.exports = router;
