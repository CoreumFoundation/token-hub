import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";

interface UnfreezeTokensProps {
  selectedCurrency: Token | null;
  unfreezeAmount: string;
  setUnfreezeAmount: (value: string) => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  handleGloballyUnfreezeTokens: () => void;
  handleUnfreezeTokens: () => void;
  walletAddressValidationError: string;
  handleBackClick: () => void;
}

export const UnfreezeTokens: FC<UnfreezeTokensProps> = ({
  selectedCurrency,
  unfreezeAmount,
  setUnfreezeAmount,
  walletAddress,
  setWalletAddress,
  handleGloballyUnfreezeTokens,
  handleUnfreezeTokens,
  walletAddressValidationError,
  handleBackClick,
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
        label="Unfreeze Amount"
        value={unfreezeAmount}
        onChange={setUnfreezeAmount}
        placeholder="0"
        type="number"
        buttonLabel={(
          <div className="flex items-center gap-1.5 text-[#EEE]">
            <GeneralIcon type={GeneralIconType.DefaultToken} />
            {selectedCurrency?.symbol.toUpperCase()}
          </div>
        )}
        warning={`The target account will have this amount of ${selectedCurrency?.symbol.toUpperCase()} unfrozen and will be able to transfer it.`}
        decimals={selectedCurrency?.precision || 0}
      />
      <div className="flex w-full justify-between gap-4">
        <div className="flex items-center">
          <Button
            label="Back"
            onClick={handleBackClick}
            type={ButtonType.Secondary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px] !bg-transparent pl-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            label="Globally Unfreeze"
            onClick={handleGloballyUnfreezeTokens}
            type={ButtonType.Secondary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
          />
          <Button
            label="Continue"
            onClick={handleUnfreezeTokens}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            disabled={!unfreezeAmount.length || +unfreezeAmount === 0 || !walletAddress.length || !!walletAddressValidationError.length}
          />
        </div>
      </div>
    </div>
  );
};
