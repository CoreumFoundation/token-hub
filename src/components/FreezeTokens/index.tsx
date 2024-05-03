import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

interface FreezeTokensProps {
  selectedCurrency: Token | null;
  freezeAmount: string;
  setFreezeAmount: (value: string) => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  handleGloballyFreezeTokens: () => void;
  handleFreezeTokens: () => void;
}

export const FreezeTokens: FC<FreezeTokensProps> = ({
  selectedCurrency,
  freezeAmount,
  setFreezeAmount,
  walletAddress,
  setWalletAddress,
  handleGloballyFreezeTokens,
  handleFreezeTokens,
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
        label="Freeze Amount"
        value={freezeAmount}
        onChange={setFreezeAmount}
        placeholder="0"
        type="number"
        buttonLabel={(
          <div className="flex items-center gap-1.5 text-[#EEE]">
            <GeneralIcon type={GeneralIconType.DefaultToken} />
            {selectedCurrency?.symbol.toUpperCase()}
          </div>
        )}
        warning={`The target account will have this amount of ${selectedCurrency?.symbol.toUpperCase()} frozen and won't be able to transfer it.`}
      />
      <div className="flex w-full justify-between gap-4">
        <Button
          label="Globally Freeze"
          onClick={handleGloballyFreezeTokens}
          type={ButtonType.Secondary}
          className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
        />
        <Button
          label="Continue"
          onClick={handleFreezeTokens}
          type={ButtonType.Primary}
          className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
        />
      </div>
    </div>
  );
};
