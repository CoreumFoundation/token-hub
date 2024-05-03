import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

interface WhitelistTokensProps {
  selectedCurrency: Token | null;
  whitelistAmount: string;
  setWhitelistAmount: (value: string) => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  handleWhitelistTokens: () => void;
}

export const WhitelistTokens: FC<WhitelistTokensProps> = ({
  selectedCurrency,
  whitelistAmount,
  setWhitelistAmount,
  walletAddress,
  setWalletAddress,
  handleWhitelistTokens,
}) => {
  return (
    <div className="flex flex-col w-full gap-8">
      <Input
        label="Account Address"
        value={walletAddress}
        onChange={setWalletAddress}
        placeholder="Enter wallet address"
        buttonLabel="Paste"
      />
      <Input
        label="Whitelist Amount"
        value={whitelistAmount}
        onChange={setWhitelistAmount}
        placeholder="0"
        type="number"
        buttonLabel={(
          <div className="flex items-center gap-1.5 text-[#EEE]">
            <GeneralIcon type={GeneralIconType.DefaultToken} />
            {selectedCurrency?.symbol.toUpperCase()}
          </div>
        )}
        warning={`The target account will be able to hold up to this amount of ${selectedCurrency?.symbol.toUpperCase()}`}
      />
      <div className="flex w-full justify-end">
        <div className="flex items-center">
          <Button
            label="Continue"
            onClick={handleWhitelistTokens}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
        </div>
      </div>
    </div>
  );
};
