const router = require("express").Router();
const ctrl = require("../controllers/daotao.controller");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", authenticate, authorize("ADMIN"), ctrl.getAll);
router.post("/", authenticate, authorize("ADMIN"), ctrl.create);
router.put("/:id", authenticate, authorize("ADMIN"), ctrl.update);
router.delete("/:id", authenticate, authorize("ADMIN"), ctrl.remove);
router.get("/thamgia", authenticate, authorize("ADMIN"), ctrl.getThamGiaByMaCT);
router.get("/search", authenticate, authorize("ADMIN"), ctrl.searchCanBo);
router.post("/thamgia/:MaCT", authenticate, authorize("ADMIN"), ctrl.addCanBoToCTDT);
router.delete("/thamgia/:MaCT/:MaCB", authenticate, authorize("ADMIN"), ctrl.removeCanBoFromCTDT);
router.post("/thamgia/:MaCT/send", authenticate, authorize("ADMIN"), ctrl.sendEmailForTraining);
module.exports = router;