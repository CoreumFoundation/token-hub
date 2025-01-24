import { ConfirmationModalImageType } from "@/shared/types";
import { FC } from "react";
import Image from 'next/image';

interface ConfirmationModalProps {
  type: ConfirmationModalImageType;
}

export const ConfirmationModalImage: FC<ConfirmationModalProps> = ({
  type,
}) => {
  switch (type) {
    case ConfirmationModalImageType.Mint:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/mint-bg.svg" width="480" height="180" alt="Mint" />;
    case ConfirmationModalImageType.Freeze:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/freeze-bg.svg" width="480" height="180" alt="Freeze" />;
    case ConfirmationModalImageType.Unfreeze:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/unfreeze-bg.svg" width="480" height="180" alt="Unfreeze" />;
    case ConfirmationModalImageType.Whitelist:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/whitelist-bg.svg" width="480" height="180" alt="Whitelist" />;
    case ConfirmationModalImageType.Success:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/success-bg.svg" width="480" height="180" alt="Success" />;
    case ConfirmationModalImageType.Burn:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/burn-bg.svg" width="480" height="180" alt="Burn" />;
    case ConfirmationModalImageType.Clawback:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/clawback-bg.svg" width="480" height="180" alt="Clawback" />;
    case ConfirmationModalImageType.DEXUnifiedRefAmountChange:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/unified-ref-amount-change-bg.svg" width="480" height="180" alt="DEXUnifiedRefAmountChange" />;
    case ConfirmationModalImageType.DEXWhitelistedDenoms:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/whitelisted-denoms-bg.svg" width="480" height="180" alt="DEXWhitelistedDenoms" />;
    case ConfirmationModalImageType.Edit:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/edit-bg.svg" width="480" height="180" alt="Edit" />;
    default:
      return null
  }
};
