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
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/mint-bg.svg" width="480" height="180" alt="mint" />;
    case ConfirmationModalImageType.Freeze:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/freeze-bg.svg" width="480" height="180" alt="mint" />;
    case ConfirmationModalImageType.Unfreeze:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/unfreeze-bg.svg" width="480" height="180" alt="mint" />;
    case ConfirmationModalImageType.Whitelist:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/whitelist-bg.svg" width="480" height="180" alt="mint" />;
    case ConfirmationModalImageType.Success:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/success-bg.svg" width="480" height="180" alt="mint" />;
    case ConfirmationModalImageType.Burn:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/burn-bg.svg" width="480" height="180" alt="mint" />;
    case ConfirmationModalImageType.Clawback:
      return <Image priority={false} className="w-full max-w-full" src="/images/modal/clawback-bg.svg" width="480" height="180" alt="mint" />;
    default:
      return null
  }
};
