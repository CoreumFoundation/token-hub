import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";

interface ClawbackTokensProps {
  selectedCurrency: Token | null;
  clawbackAmount: string;
  setClawbackAmount: (value: string) => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  handleClawbackTokens: () => void;
  walletAddressValidationError: string;
}

export const ClawbackTokens: FC<ClawbackTokensProps> = ({
  selectedCurrency,
  clawbackAmount,
  setClawbackAmount,
  walletAddress,
  setWalletAddress,
  handleClawbackTokens,
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
        label="Clawback Amount"
        value={clawbackAmount}
        onChange={setClawbackAmount}
        placeholder="0"
        type="number"
        buttonLabel={(
          <div className="flex items-center gap-1.5 text-[#EEE]">
            <GeneralIcon type={GeneralIconType.DefaultToken} />
            {selectedCurrency?.symbol.toUpperCase()}
          </div>
        )}
        decimals={selectedCurrency?.precision || 0}
      />
      <div className="flex w-full justify-end">
        <div className="flex items-center">
          <Button
            label="Continue"
            onClick={handleClawbackTokens}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            disabled={!clawbackAmount.length || +clawbackAmount === 0 || !walletAddress.length || !!walletAddressValidationError.length}
          />
        </div>
      </div>
    </div>
  );
};
