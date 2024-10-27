import express, { IRouter } from "express";
import dataRestController from "../data/controllers/dataRestController";
import { handleError } from "../utils/handleErrors";
import { swaggerDocs, swaggerUi } from '../swagger';

const router: IRouter = express.Router();


router.use("/data", dataRestController);

// -------THE SWAGGER PATH-------
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
