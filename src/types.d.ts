import { DefaultState, ParameterizedContext } from 'koa';
import { EvaluationOptions, PstState, Warp } from 'warp-contracts';
import winston from 'winston';
import { allowedContractTypes } from './constants';

export type KoaState = {
  logger: winston.Logger;
  warp: Warp;
} & DefaultState;

export type KoaContext = ParameterizedContext<KoaState>;

export type ArNSRecord = {
  transactionId: string;
  [x: string]: string | number;
};

export type ArNSState = PstState & { records: { [x: string]: ArNSRecord } };

export type PstInput = {
  function: string;
  [x: string]: string | number;
};

export type ArNSInteraction = {
  id: string;
  valid: boolean;
  input: PstInput | undefined;
  height: number;
  owner: string;
  errorMessage?: string;
};

export type ArNSContractInteractions = {
  [x: string]: ArNSInteraction;
};

export type ContractType = (typeof allowedContractTypes)[number];
export type ContractRecordResponse = {
  contractTxId: string;
  record: unknown;
  owner?: string;
  name: string;
  evaluationOptions?: Partial<EvaluationOptions>;
};
