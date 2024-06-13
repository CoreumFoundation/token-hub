'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Modal } from "../Modal";
import { useCallback, useMemo, useState } from "react";
import { setIsDisclaimerModalOpen } from "@/features/general/generalSlice";
import { ButtonIconType, ButtonType } from "@/shared/types";
import { Button } from "../Button";
import classNames from "classnames";
import { STORAGE_DISCLAIMER_CONFIRMED } from "@/constants";
import { isBrowser } from "@/helpers/isBrowser";

export const DisclaimerModal = () => {
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
  const isDisclaimerModalOpen = useAppSelector(state => state.general.isDisclaimerModalOpen);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setIsDisclaimerModalOpen(false));
  }, []);

  const handleConfirm = useCallback(() => {
    isBrowser() && window.localStorage.setItem(STORAGE_DISCLAIMER_CONFIRMED, 'confirmed');
    handleCloseModal();
  }, []);

  const checkboxCx = useMemo(() => {
    return classNames('h-[22px] w-[22px] overflow-hidden border rounded-md cursor-pointer', {
      'border-[#1B1D23]': !checkboxChecked,
      'bg-gradient-green border-transparent': checkboxChecked,
    });
  }, [checkboxChecked]);

  return (
    <Modal
      isOpen={isDisclaimerModalOpen}
      title="Provision of Services"
      wrapperClassName="w-[560px]"
    >
      <div className="flex flex-col w-full items-center gap-8">
        <p className="text-[#9FA2AC] font-noto-sans font-normal tracking-[-0.21px] text-sm">
          Your interaction with Coreum Services is subject to various inherent risks. The Services are provided as &quot;is&quot; and &quot;as available&quot;, without any warranties, express or implied. Your engagement with the Services is solely at your own discretion and risk. Coreum is not responsible for any loss or mismanagement of user funds. If you do not agree to abide by these terms, you are not authorized to access or use the Coreum Services.
        </p>
        <div className="flex flex-col w-full gap-4">
          <div className="relative flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className={checkboxCx} onClick={() => setCheckboxChecked(!checkboxChecked)}>
                {checkboxChecked && (
                  <svg className="w-5 h-5" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.99927 10.8046L5.21165 9.59223L8.53466 12.9152L15.7869 5.66302L16.9993 6.87541L8.53466 15.34L3.99927 10.8046Z" fill="#25D695"/>
                  </svg>
                )}
              </div>
              <label
                className="text-[#eee] font-noto-sans text-sm font-medium tracking-[-0.21px]"
                htmlFor="checkboxDefault"
              >
                I have read and acknowledged the Provision of Service.
              </label>
            </div>
          </div>
          <div>

          </div>
          <Button
            iconType={ButtonIconType.Check}
            label="Confirm"
            onClick={handleConfirm}
            type={ButtonType.Primary}
            className="text-sm !py-2 px-6 rounded-xl font-semibold w-[160px]"
            disabled={!checkboxChecked}
          />
        </div>
      </div>
    </Modal>
  );
};
