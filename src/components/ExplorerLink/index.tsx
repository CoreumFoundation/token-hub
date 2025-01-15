import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, Network } from "@/shared/types";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useMemo } from "react";

export const ExplorerLink = () => {
  const network = useAppSelector(state => state.general.network);
  const account = useAppSelector(state => state.general.account);

  const href = useMemo(() => {
    return network === Network.Mainnet
      ? `https://explorer.coreum.com/coreum/accounts/${account}`
      : network === Network.Testnet
        ? `https://explorer.testnet-1.coreum.dev/coreum/accounts/${account}`
        : `https://explorer.devnet-1.coreum.dev/coreum/accounts/${account}`;
  }, [account, network]);

  return (
    <Link href={href} target="_blank" className="flex items-center gap-2">
      <GeneralIcon type={GeneralIconType.Explorer} />
      Explorer
    </Link>
  );
};
