import { Router } from "express";
import serviceRouter from "./services.routes";
import entityLogRouter from "./entityLogs.routes";
import exceptionLogRouter from "./exceptionLogs.routes";

const router = Router();

router.use('/services', serviceRouter);
router.use('/entityLogs', entityLogRouter);
router.use('/exceptionLogs', exceptionLogRouter);

export default router;