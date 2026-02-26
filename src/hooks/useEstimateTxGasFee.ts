import { useAppSelector } from "@/store/hooks";
import { createCoreumAminoConverters } from "@/lib/coreumAminoConverters";
import { QueryClientImpl as FeeModelClient } from "@/lib/query";
import { useCosmWasmSigningClient, useTendermintClient } from "graz";
import { EncodeObject, Registry } from "@cosmjs/proto-signing";
import { createWasmAminoConverters } from "@cosmjs/cosmwasm-stargate";
import {
  AminoTypes,
  GasPrice,
  QueryClient,
  calculateFee,
  createDefaultAminoConverters,
  createProtobufRpcClient,
  decodeCosmosSdkDecFromProto,
  defaultRegistryTypes,
} from "@cosmjs/stargate";
import { useMemo } from "react";
import Big from "big.js";
import { coreumRegistry, cosmwasmRegistry } from "coreum-js-nightly";

const registryTypes = [
  ...defaultRegistryTypes,
  ...coreumRegistry,
  ...cosmwasmRegistry,
];
const registry = new Registry(registryTypes);

const aminoTypes = new AminoTypes({
  ...createDefaultAminoConverters(),
  ...createWasmAminoConverters(),
  ...createCoreumAminoConverters(),
});

export const useEstimateTxGasFee = () => {
  const networkInfo = useAppSelector(state => state.general.currentNetworkInfo);
  const account = useAppSelector(state => state.general.account);
  const chainId = networkInfo.chainId;

  const { data: tendermintClient } = useTendermintClient({
    chainId: [chainId],
    type: "tm37",
  });
  // Flat opts so graz's single-chain path receives registry/aminoTypes at top level.
  // (In single-chain mode graz passes opts as-is to connectWithSigner, not opts[chainId],
  // so a keyed object would leave client with default registry = unregistered Coreum types.)
  const signingClientOpts = useMemo(
    () =>
      chainId
        ? {
            registry: registry as any,
            aminoTypes,
            [chainId]: {
              registry: registry as any,
              aminoTypes,
            },
          }
        : undefined,
    [chainId],
  );

  // Only run the query when connected (has account). Otherwise graz's queryFn returns
  // undefined when activeChainIds doesn't include the chain, and TanStack Query v5
  // throws "Query data cannot be undefined".
  const { data: signingClient } = useCosmWasmSigningClient({
    chainId: [chainId],
    opts: signingClientOpts,
    enabled: !!account && !!chainId,
  });

  const feeModel = useMemo(() => {
    if (!tendermintClient) {
      return null;
    }

    const queryClient = new QueryClient(tendermintClient);
    const rpcClient = createProtobufRpcClient(queryClient);
    return new FeeModelClient(rpcClient);
  }, [tendermintClient]);

  const getGasPrice = async () => {
    if (!feeModel) {
      return "";
    }

    const feeModelParams = await feeModel.Params({});
    const minGasPriceRes = await feeModel.MinGasPrice({});

    const initialGasPrice = decodeCosmosSdkDecFromProto(
      feeModelParams.params?.model?.initialGasPrice || ""
    ).toFloatApproximation();

    return GasPrice.fromString(
      `${initialGasPrice}${minGasPriceRes.minGasPrice?.denom || ""}`
    );
  };

  const getTxFee = async (
    msgs: readonly EncodeObject[],
  ) => {
    if (!signingClient || !feeModel || !account) {
      return null;
    }

    const gasPrice = await getGasPrice();

    const gasWanted = await signingClient.simulate(
      account,
      msgs,
      ""
    );

    const totalGasWanted = new Big(gasWanted).mul(1.2).toFixed(0);

    return {
      fee: calculateFee(+totalGasWanted, gasPrice),
    };
  };

  return {
    getTxFee,
    signingClient,
  };
};
