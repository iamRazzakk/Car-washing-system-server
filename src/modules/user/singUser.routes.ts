import express from "express";
import { userController } from "./singUser.controller";
import { singUpValidationSchema } from "./singUser.validations";
import { ValidationRequest } from "../../middleware/validationRequest";
import auth from "../../middleware/auth";
const router = express.Router();
router.post(
  "/singup",
  ValidationRequest(singUpValidationSchema.createSignUpValidationSchema),
  userController.createUser
);

//get all user
router.get("/users", auth("ADMIN"), userController.getUserList);

// router.put(
//   "/users/:userId",
//   auth("ADMIN"),userController.editUserRole
// );
router.patch(
    '/users/:userId/role',ValidationRequest(singUpValidationSchema.updateUserRoleValidationSchema), 
    auth("ADMIN"),userController.editUserRole,
);
export const UserRoute = router;
