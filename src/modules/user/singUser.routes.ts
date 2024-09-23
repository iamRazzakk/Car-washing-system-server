import express from "express";
import { userController } from "./singUser.controller";
import { singUpValidationSchema } from "./singUser.validations";
import { ValidationRequest } from "../../middleware/validationRequest";
import auth from "../../middleware/auth";
const router = express.Router();
router.post(
  "/user/signup",
  ValidationRequest(singUpValidationSchema.createSignUpValidationSchema),
  userController.createUser
);

//get all user
router.get("/users", auth("ADMIN"), userController.getUserList);
// update user role
router.patch(
    '/users/:userId/role',ValidationRequest(singUpValidationSchema.updateUserRoleValidationSchema), 
    auth("ADMIN"),userController.editUserRole,
);
export const UserRoute = router;
