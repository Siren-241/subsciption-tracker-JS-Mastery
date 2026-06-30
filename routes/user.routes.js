import { Router } from 'express'
import { getUser, getUsers } from '../controller/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get("/", authorize, getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
	res.send({
		"title": "Create a User"
	});
});

userRouter.put("/:id", (req, res) => {
	res.send({
		"title": "Update a User"
	});
});

userRouter.delete("/:id", (req, res) => {
	res.send({
		"title": "Delete a User"
	});
});

export default userRouter;
