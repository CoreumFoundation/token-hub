import { FC, useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-w-full absolute left-0 right-0 top-0 bottom-0 bg-black/75 backdrop-blur-[2px] z-50">
      <div className="flex flex-col w-[480px] max-w-full overflow-y-auto bg-[#101216] rounded-2xl backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};
