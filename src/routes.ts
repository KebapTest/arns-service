import Router from "@koa/router";
import { contractBalanceHandler, contractFieldHandler, contractHandler, contractRecordHandler } from "./routes/contract";
import { PDNS_CONTRACT_FIELD_REGEX, PDNS_CONTRACT_ID_REGEX, PDNS_NAME_REGEX } from "./constants";

const router = new Router();

// healthcheck
router.get('/healthcheck', (ctx) => {
    ctx.body = {
      timestamp: new Date(),
      status: 200,
      message: 'Hello world.'
    }
});

router.get(`/contract/:id${PDNS_CONTRACT_ID_REGEX}`, contractHandler)
router.get(`/contract/:id${PDNS_CONTRACT_ID_REGEX}/:field${PDNS_CONTRACT_FIELD_REGEX}`, contractFieldHandler)
router.get(`/contract/:id${PDNS_CONTRACT_ID_REGEX}/balances/:address${PDNS_CONTRACT_ID_REGEX}`, contractBalanceHandler)
router.get(`/contract/:id${PDNS_CONTRACT_ID_REGEX}/records/:name${PDNS_NAME_REGEX}`, contractRecordHandler)

export default router;
