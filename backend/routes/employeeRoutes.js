import express from "express";
import {
  getEmployeeById,
  getEmployees,
  CreateEmployee,
  DeleteEmployee,
  UpdateEmployee,
} from "../controllers/employeeController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getEmployees);
router
  .route("/:id")
  .get(getEmployeeById)
  .delete(protect, DeleteEmployee)
  .put(protect, UpdateEmployee);
router.route("/create").post(protect, CreateEmployee);

export default router;
