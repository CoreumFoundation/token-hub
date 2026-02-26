import type { AminoConverters } from "@cosmjs/stargate";
import { fromBase64, toBase64 } from "@cosmjs/encoding";

/**
 * Coreum Amino converters for Ledger (Amino) signing.
 * Ledger devices use Amino encoding; these converters map Coreum proto messages
 * to the Amino JSON format the chain expects.
 *
 * Amino type names follow the proto full name (e.g. coreum.asset.ft.v1.MsgIssue).
 */

function coinToAmino(coin: { denom?: string; amount?: string } | undefined) {
  if (!coin) return undefined;
  return { denom: coin.denom ?? "", amount: coin.amount ?? "" };
}

function coinFromAmino(amino: { denom?: string; amount?: string } | undefined) {
  if (!amino) return undefined;
  return { denom: amino.denom ?? "", amount: amino.amount ?? "" };
}

export function createCoreumAminoConverters(): AminoConverters {
  return {
    "/coreum.asset.ft.v1.MsgIssue": {
      aminoType: "coreum.asset.ft.v1.MsgIssue",
      toAmino: (value: Record<string, unknown>) => ({
        issuer: value.issuer,
        symbol: value.symbol,
        subunit: value.subunit,
        precision: value.precision,
        initial_amount: value.initialAmount,
        description: value.description,
        features: value.features ?? [],
        burn_rate: value.burnRate ?? "",
        send_commission_rate: value.sendCommissionRate ?? "",
        uri: value.uri ?? "",
        uri_hash: value.uriHash ?? "",
        extension_settings: value.extensionSettings
          ? {
              code_id: (value.extensionSettings as { codeId?: number }).codeId,
              label: (value.extensionSettings as { label?: string }).label,
              funds: ((value.extensionSettings as { funds?: Array<{ denom?: string; amount?: string }> }).funds ?? []).map(coinToAmino),
              issuance_msg: (value.extensionSettings as { issuanceMsg?: Uint8Array }).issuanceMsg
                ? toBase64((value.extensionSettings as { issuanceMsg: Uint8Array }).issuanceMsg)
                : undefined,
            }
          : undefined,
        dex_settings: value.dexSettings
          ? {
              unified_ref_amount: (value.dexSettings as { unifiedRefAmount?: string }).unifiedRefAmount ?? "",
              whitelisted_denoms: (value.dexSettings as { whitelistedDenoms?: string[] }).whitelistedDenoms ?? [],
            }
          : undefined,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        issuer: amino.issuer,
        symbol: amino.symbol,
        subunit: amino.subunit,
        precision: amino.precision,
        initialAmount: amino.initial_amount,
        description: amino.description,
        features: amino.features ?? [],
        burnRate: amino.burn_rate ?? "",
        sendCommissionRate: amino.send_commission_rate ?? "",
        uri: amino.uri ?? "",
        uriHash: amino.uri_hash ?? "",
        extensionSettings: amino.extension_settings
          ? {
              codeId: (amino.extension_settings as { code_id?: number }).code_id,
              label: (amino.extension_settings as { label?: string }).label,
              funds: ((amino.extension_settings as { funds?: Array<{ denom?: string; amount?: string }> }).funds ?? []).map(coinFromAmino),
              issuanceMsg: (amino.extension_settings as { issuance_msg?: string }).issuance_msg
                ? fromBase64((amino.extension_settings as { issuance_msg: string }).issuance_msg)
                : undefined,
            }
          : undefined,
        dexSettings: amino.dex_settings
          ? {
              unifiedRefAmount: (amino.dex_settings as { unified_ref_amount?: string }).unified_ref_amount ?? "",
              whitelistedDenoms: (amino.dex_settings as { whitelisted_denoms?: string[] }).whitelisted_denoms ?? [],
            }
          : undefined,
      }),
    },
    "/coreum.asset.ft.v1.MsgMint": {
      aminoType: "coreum.asset.ft.v1.MsgMint",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        coin: value.coin ? coinToAmino(value.coin as { denom?: string; amount?: string }) : undefined,
        recipient: value.recipient,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        coin: amino.coin ? coinFromAmino(amino.coin as { denom?: string; amount?: string }) : undefined,
        recipient: amino.recipient,
      }),
    },
    "/coreum.asset.ft.v1.MsgBurn": {
      aminoType: "coreum.asset.ft.v1.MsgBurn",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        coin: value.coin ? coinToAmino(value.coin as { denom?: string; amount?: string }) : undefined,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        coin: amino.coin ? coinFromAmino(amino.coin as { denom?: string; amount?: string }) : undefined,
      }),
    },
    "/coreum.asset.ft.v1.MsgFreeze": {
      aminoType: "coreum.asset.ft.v1.MsgFreeze",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        account: value.account,
        coin: value.coin ? coinToAmino(value.coin as { denom?: string; amount?: string }) : undefined,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        account: amino.account,
        coin: amino.coin ? coinFromAmino(amino.coin as { denom?: string; amount?: string }) : undefined,
      }),
    },
    "/coreum.asset.ft.v1.MsgUnfreeze": {
      aminoType: "coreum.asset.ft.v1.MsgUnfreeze",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        account: value.account,
        coin: value.coin ? coinToAmino(value.coin as { denom?: string; amount?: string }) : undefined,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        account: amino.account,
        coin: amino.coin ? coinFromAmino(amino.coin as { denom?: string; amount?: string }) : undefined,
      }),
    },
    "/coreum.asset.ft.v1.MsgGloballyFreeze": {
      aminoType: "coreum.asset.ft.v1.MsgGloballyFreeze",
      toAmino: (value: Record<string, unknown>) => ({ sender: value.sender, denom: value.denom }),
      fromAmino: (amino: Record<string, unknown>) => ({ sender: amino.sender, denom: amino.denom }),
    },
    "/coreum.asset.ft.v1.MsgGloballyUnfreeze": {
      aminoType: "coreum.asset.ft.v1.MsgGloballyUnfreeze",
      toAmino: (value: Record<string, unknown>) => ({ sender: value.sender, denom: value.denom }),
      fromAmino: (amino: Record<string, unknown>) => ({ sender: amino.sender, denom: amino.denom }),
    },
    "/coreum.asset.ft.v1.MsgSetWhitelistedLimit": {
      aminoType: "coreum.asset.ft.v1.MsgSetWhitelistedLimit",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        account: value.account,
        coin: value.coin ? coinToAmino(value.coin as { denom?: string; amount?: string }) : undefined,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        account: amino.account,
        coin: amino.coin ? coinFromAmino(amino.coin as { denom?: string; amount?: string }) : undefined,
      }),
    },
    "/coreum.asset.ft.v1.MsgClawback": {
      aminoType: "coreum.asset.ft.v1.MsgClawback",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        account: value.account,
        coin: value.coin ? coinToAmino(value.coin as { denom?: string; amount?: string }) : undefined,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        account: amino.account,
        coin: amino.coin ? coinFromAmino(amino.coin as { denom?: string; amount?: string }) : undefined,
      }),
    },
    "/coreum.asset.ft.v1.MsgUpdateDEXUnifiedRefAmount": {
      aminoType: "coreum.asset.ft.v1.MsgUpdateDEXUnifiedRefAmount",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        denom: value.denom,
        unified_ref_amount: value.unifiedRefAmount,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        denom: amino.denom,
        unifiedRefAmount: amino.unified_ref_amount,
      }),
    },
    "/coreum.asset.ft.v1.MsgUpdateDEXWhitelistedDenoms": {
      aminoType: "coreum.asset.ft.v1.MsgUpdateDEXWhitelistedDenoms",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        denom: value.denom,
        whitelisted_denoms: value.whitelistedDenoms ?? [],
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        denom: amino.denom,
        whitelistedDenoms: amino.whitelisted_denoms ?? [],
      }),
    },
    "/coreum.asset.nft.v1.MsgIssueClass": {
      aminoType: "coreum.asset.nft.v1.MsgIssueClass",
      toAmino: (value: Record<string, unknown>) => ({
        issuer: value.issuer,
        symbol: value.symbol,
        name: value.name,
        description: value.description,
        uri: value.uri ?? "",
        uri_hash: value.uriHash ?? "",
        data: value.data,
        features: value.features ?? [],
        royalty_rate: value.royaltyRate ?? "",
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        issuer: amino.issuer,
        symbol: amino.symbol,
        name: amino.name,
        description: amino.description,
        uri: amino.uri ?? "",
        uriHash: amino.uri_hash ?? "",
        data: amino.data,
        features: amino.features ?? [],
        royaltyRate: amino.royalty_rate ?? "",
      }),
    },
    "/coreum.asset.nft.v1.MsgMint": {
      aminoType: "coreum.asset.nft.v1.MsgMint",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        class_id: value.classId,
        id: value.id,
        uri: value.uri ?? "",
        uri_hash: value.uriHash ?? "",
        data: value.data,
        recipient: value.recipient,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        classId: amino.class_id,
        id: amino.id,
        uri: amino.uri ?? "",
        uriHash: amino.uri_hash ?? "",
        data: amino.data,
        recipient: amino.recipient,
      }),
    },
    "/coreum.asset.nft.v1.MsgBurn": {
      aminoType: "coreum.asset.nft.v1.MsgBurn",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        class_id: value.classId,
        id: value.id,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        classId: amino.class_id,
        id: amino.id,
      }),
    },
    "/coreum.asset.nft.v1.MsgFreeze": {
      aminoType: "coreum.asset.nft.v1.MsgFreeze",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        class_id: value.classId,
        id: value.id,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        classId: amino.class_id,
        id: amino.id,
      }),
    },
    "/coreum.asset.nft.v1.MsgUnfreeze": {
      aminoType: "coreum.asset.nft.v1.MsgUnfreeze",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        class_id: value.classId,
        id: value.id,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        classId: amino.class_id,
        id: amino.id,
      }),
    },
    "/coreum.asset.nft.v1.MsgAddToWhitelist": {
      aminoType: "coreum.asset.nft.v1.MsgAddToWhitelist",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        class_id: value.classId,
        id: value.id,
        account: value.account,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        classId: amino.class_id,
        id: amino.id,
        account: amino.account,
      }),
    },
    "/coreum.asset.nft.v1.MsgRemoveFromWhitelist": {
      aminoType: "coreum.asset.nft.v1.MsgRemoveFromWhitelist",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        class_id: value.classId,
        id: value.id,
        account: value.account,
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        classId: amino.class_id,
        id: amino.id,
        account: amino.account,
      }),
    },
    "/coreum.asset.nft.v1.MsgUpdateData": {
      aminoType: "coreum.asset.nft.v1.MsgUpdateData",
      toAmino: (value: Record<string, unknown>) => ({
        sender: value.sender,
        class_id: value.classId,
        id: value.id,
        items: value.items ?? [],
      }),
      fromAmino: (amino: Record<string, unknown>) => ({
        sender: amino.sender,
        classId: amino.class_id,
        id: amino.id,
        items: amino.items ?? [],
      }),
    },
  };
}
