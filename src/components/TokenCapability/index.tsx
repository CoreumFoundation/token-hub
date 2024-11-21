import { TokenCapabilitiesIcon } from "@/assets/TokenCapabilitiesIcon";
import { TokenCapabilityItem } from "@/shared/types";
import React, { FC } from "react";
import { Switch } from "../Switch";

interface TokenCapabilityProps extends TokenCapabilityItem {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  extensionSettings?: React.ReactNode;
}

export const TokenCapability: FC<TokenCapabilityProps> = ({
  type,
  label,
  content,
  enabled,
  setEnabled,
  extensionSettings,
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full gap-2">
        <div className="flex-none">
          <TokenCapabilitiesIcon type={type} />
        </div>
        <div className="flex-1 flex flex-col w-full mr-6 gap-2">
          <div className="text-[#9FA2AC] font-space-grotesk text-base font-normal">
            {label}
          </div>
          <div className="text-[#5E6773] font-noto-sans text-sm font-normal">
            {content}
          </div>
        </div>
        <div className="flex-none">
          <Switch
            enabled={enabled}
            setEnabled={setEnabled}
          />
        </div>
      </div>
      {!!extensionSettings && enabled && extensionSettings}
    </div>
  );
}
