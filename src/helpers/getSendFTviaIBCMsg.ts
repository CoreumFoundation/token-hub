import { Network } from '@/shared/types';
import { Coin, MsgTransferEncodeObject } from '@cosmjs/stargate';
import Big from "big.js";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";

interface GetSendFTviaIBCMsgArgs {
  sourcePort: string;
  sourceChannel: string;
  token: Coin;
  sender: string;
  receiver: string;
  network: Network;
}

export const getSendFTviaIBCMsg = ({
  sourcePort,
  sourceChannel,
  token,
  sender,
  receiver,
  network,
}: GetSendFTviaIBCMsgArgs): MsgTransferEncodeObject => {
  const currentTimestamp = Date.now();
  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  const futureTimestamp = currentTimestamp + fifteenMinutesInMilliseconds;
  const futureTimestampBig = new Big(futureTimestamp)
    .mul(Big(10).pow(12))
    .toNumber();

  const sendFTviaIBCMsgValue: Partial<MsgTransfer> = {
    sourcePort,
    sourceChannel,
    token,
    sender,
    receiver,
    memo: '',
    ...(network === Network.Mainnet
      ? {
        timeoutHeight: {
          revisionNumber: BigInt(3706277831000000000),
          revisionHeight: BigInt(1),
        },
        timeoutTimestamp: BigInt(0),
      }
      : {
        timeoutHeight: {
          revisionHeight: BigInt(0),
          revisionNumber: BigInt(0),
        },
        timeoutTimestamp: BigInt(futureTimestampBig),
      }
    )
  };

  return {
    typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
    value: sendFTviaIBCMsgValue,
  };
};
