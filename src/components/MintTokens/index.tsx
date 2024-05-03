import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType, ButtonType, Token } from "@/shared/types";
import { FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

interface MintTokensProps {
  selectedCurrency: Token | null;
  mintAmount: string;
  setMintAmount: (value: string) => void;
  handleMintTokens: () => void;
}

export const MintTokens: FC<MintTokensProps> = ({
  selectedCurrency,
  mintAmount,
  setMintAmount,
  handleMintTokens,
}) => {
  return (
    <div className="flex flex-col w-full gap-8">
        <Input
          label="Mint Amount"
          value={mintAmount}
          onChange={setMintAmount}
          placeholder="0"
          type="number"
          buttonLabel={(
            <div className="flex items-center gap-1.5 text-[#EEE]">
              <GeneralIcon type={GeneralIconType.DefaultToken} />
              {selectedCurrency?.symbol.toUpperCase()}
            </div>
          )}
          warning="The minted tokens will be transferred to the issuer address"
        />
        <div className="flex w-full justify-end">
          <div className="flex items-center">
            <Button
              label="Continue"
              onClick={handleMintTokens}
              type={ButtonType.Primary}
              className="text-sm !py-2 px-6 rounded-[10px] font-semibold w-[160px]"
            />
          </div>
        </div>
      </div>
  );
};
