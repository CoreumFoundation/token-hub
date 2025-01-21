import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { pasteValueFromClipboard } from "@/helpers/pasteValueFromClipboard";

interface WhitelistTokensProps {
  selectedCurrency: Token | null;
  whitelistAmount: string;
  setWhitelistAmount: (value: string) => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  handleWhitelistTokens: () => void;
  walletAddressValidationError: string;
  handleBackClick: () => void;
}

export const WhitelistTokens: FC<WhitelistTokensProps> = ({
  selectedCurrency,
  whitelistAmount,
  setWhitelistAmount,
  walletAddress,
  setWalletAddress,
  handleWhitelistTokens,
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
        <div className="flex items-center">
          <Button
            label="Continue"
            onClick={handleWhitelistTokens}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            disabled={!whitelistAmount.length || +whitelistAmount === 0 || !walletAddress.length || !!walletAddressValidationError.length}
          />
        </div>
      </div>
    </div>
  );
};
