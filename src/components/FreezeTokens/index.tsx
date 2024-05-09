import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";

interface FreezeTokensProps {
  selectedCurrency: Token | null;
  freezeAmount: string;
  setFreezeAmount: (value: string) => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  handleGloballyFreezeTokens: () => void;
  handleFreezeTokens: () => void;
  walletAddressValidationError: string;
}

export const FreezeTokens: FC<FreezeTokensProps> = ({
  selectedCurrency,
  freezeAmount,
  setFreezeAmount,
  walletAddress,
  setWalletAddress,
  handleGloballyFreezeTokens,
  handleFreezeTokens,
  walletAddressValidationError,
}) => {
  return (
    <div className="flex flex-col w-full gap-8">
      <Input
        label="Account Address"
        value={walletAddress}
        onChange={setWalletAddress}
        placeholder="Enter wallet address"
        buttonLabel={walletAddress.length ? '' : 'Paste'}
        error={walletAddressValidationError}
        handleOnButtonClick={() => !walletAddress.length && pasteValueFromClipboard(setWalletAddress)}
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
        decimals={selectedCurrency?.precision || 0}
      />
      <div className="flex w-full justify-between gap-4">
        <Button
          label="Globally Freeze"
          onClick={handleGloballyFreezeTokens}
          type={ButtonType.Secondary}
          className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent pl-0"
        />
        <Button
          label="Continue"
          onClick={handleFreezeTokens}
          type={ButtonType.Primary}
          className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          disabled={!freezeAmount.length || +freezeAmount === 0 || !walletAddress.length || !!walletAddressValidationError.length}
        />
      </div>
    </div>
  );
};
