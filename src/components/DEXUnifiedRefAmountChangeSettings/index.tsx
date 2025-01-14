import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Input } from "../Input";
import { useMemo } from "react";
import { setDexRefAmount } from "@/features/dex/dexSlice";

export const DEXUnifiedRefAmountChangeSettings = () => {
  const refAmount = useAppSelector(state => state.dex.refAmount);

  const dispatch = useAppDispatch();

  const isEnteredRefAmountValid = useMemo(() => {
      if (!refAmount.length) {
        return '';
      }

      if (!Number.isInteger(Number(refAmount))) {
        return 'Extension\'s code id must be an integer';
      }

      return '';
    }, [refAmount]);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Input
        label="Ref Amount"
        value={refAmount}
        onChange={(value) => dispatch(setDexRefAmount(value))}
        placeholder="0"
        error={isEnteredRefAmountValid}
        errorClassName="-mb-12 md:!-mb-9"
      />
    </div>
  );
};
