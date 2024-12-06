import { AlertType, DropdownItem, DropdownType, GeneralIconType, Token } from "@/shared/types";
import { FC, useCallback, useEffect, useMemo } from "react";
import { TextArea } from "../TextArea";
import { Input } from "../Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFundToExtensionFunds, ExtensionToken, setExtensionCodeId, setExtensionFunds, setExtensionIssuanceMsg, setExtensionLabel, updateFundInExtensionFunds } from "@/features/extension/extensionSlice";
import { Dropdown } from "../Dropdown";
import { GeneralIcon } from "@/assets/GeneralIcon";
import { dispatchAlert } from "@/features/alerts/alertsSlice";
import { getNumberRegex } from "@/helpers/getNumberRegex";

interface ExtensionFungibleTokenSettingsProps {
  tokenToBeIssued: ExtensionToken | null;
}

export const ExtensionFungibleTokenSettings: FC<ExtensionFungibleTokenSettingsProps> = ({
  tokenToBeIssued,
}) => {
  const balances = useAppSelector(state => state.balances.list);
  const secondaryCurrencyBalances = useAppSelector(state => state.currencies.secondaryList);

  const codeId = useAppSelector(state => state.extension.codeId);
  const label = useAppSelector(state => state.extension.label);
  const funds = useAppSelector(state => state.extension.funds);
  const issuanceMsg = useAppSelector(state => state.extension.issuanceMsg);

  const dispatch = useAppDispatch();

  const isEnteredCodeIdValid = useMemo(() => {
    if (!codeId.length) {
      return '';
    }

    if (!Number.isInteger(Number(codeId))) {
      return 'Extension\'s code id must be an integer';
    }

    return '';
  }, [codeId]);

  const isEnteredLabelValid = useMemo(() => {
    if (!label.length) {
      return '';
    }

    return '';
  }, [label.length]);

  const isIssuanceMsgValid = useMemo(() => {
    if (!issuanceMsg.length) {
      return '';
    }

    try {
      JSON.parse(issuanceMsg);
    } catch (error) {
      return 'Extension\'s issuance message must be a valid JSON';
    }

    return '';
  }, [issuanceMsg]);

  const assetsBalances: ExtensionToken[] = useMemo(() => {
    return balances.concat(secondaryCurrencyBalances).map((token: Token) => {
      return {
        ...token,
        balance: token.amount || '',
        amount: '',
      };
    });
  }, [balances, secondaryCurrencyBalances]);

  const completedAssetsBalances = useMemo(() => {
    if (tokenToBeIssued) {
      return [tokenToBeIssued, ...assetsBalances];
    }

    return assetsBalances;
  }, [assetsBalances, tokenToBeIssued]);

  useEffect(() => {
    if (completedAssetsBalances.length && !funds.length) {
      dispatch(setExtensionFunds([{ ...assetsBalances[0] }]));
    }
  }, [completedAssetsBalances, funds]);

  const handleAddExtensionFunds = useCallback(() => {
    const pendingAssets = completedAssetsBalances.filter((item: ExtensionToken) =>
      !funds.find((fund: ExtensionToken) => fund.denom.toLowerCase() === item.denom.toLowerCase()));

    if (pendingAssets.length) {
      dispatch(addFundToExtensionFunds(pendingAssets[0]))
    }
  }, [completedAssetsBalances, funds]);

  const handleUpdateTokenAmount = useCallback((token: ExtensionToken, updatedAmount: string) => {
    const currentValue = updatedAmount.replaceAll(',', '');

    if (!currentValue.length) {
      dispatch(updateFundInExtensionFunds({ ...token, amount: '' }));
    } else if (getNumberRegex(token.precision).test(currentValue)) {
      dispatch(updateFundInExtensionFunds({ ...token, amount: currentValue }));
    }
  }, []);

  const assetsBalancesToDropdownItems: DropdownItem[] = useMemo(() => {
    return completedAssetsBalances.map((token: ExtensionToken) => {
      return {
        id: token.denom,
        label: token.symbol,
        icon: (token.denom === 'utestcore' || token.denom === 'ucore')
          ? <GeneralIcon type={GeneralIconType.Coreum} className="w-5 h-5"  />
          : <GeneralIcon type={GeneralIconType.DefaultToken} className="w-5 h-5" />
      };
    });
  }, [completedAssetsBalances]);

  const onSelectCurrencyInDropdown = useCallback((newValue: DropdownItem, prevToken: ExtensionToken, index: number) => {
    const fundToSet = completedAssetsBalances.find((item: ExtensionToken) => item.denom === newValue.id);
    const indexOfFundToReplace = funds.indexOf(prevToken);

    if (indexOfFundToReplace === -1 || !fundToSet) {
      return;
    }

    const fundToSetInFunds = funds.find((item: ExtensionToken) => item.denom === newValue.id);

    if (fundToSetInFunds) {
      const indexOfFundToSetInFunds = funds.indexOf(fundToSetInFunds);
      if (indexOfFundToSetInFunds !== index) {
        dispatch(
          dispatchAlert({
            type: AlertType.Error,
            title: 'This token is already selected!',
          }),
        );
        return;
      }
    }

    dispatch(
      setExtensionFunds([
        ...funds.slice(0, indexOfFundToReplace),
        {
          ...fundToSet,
          amount: '',
        },
        ...funds.slice(indexOfFundToReplace + 1)],
      )
    );
  }, [completedAssetsBalances, funds]);

  const handleRemoveFundFromFundsList = useCallback((token: ExtensionToken) => {
    const indexOfFundToRemove = funds.indexOf(token);

    dispatch(
      setExtensionFunds([
        ...funds.slice(0, indexOfFundToRemove),
        ...funds.slice(indexOfFundToRemove + 1)],
      )
    );
  }, [funds]);

  const renderFunds = useMemo(() => {
    return (
      <>
        {funds.map((token: ExtensionToken, index: number) => {
          const tokenToDropdownItem: DropdownItem = {
            id: token.denom,
            label: token.symbol,
            icon: (token.denom === 'utestcore' || token.denom === 'ucore')
              ? <GeneralIcon type={GeneralIconType.Coreum} className="w-5 h-5"  />
              : <GeneralIcon type={GeneralIconType.DefaultToken} className="w-5 h-5" />
          };

          const renderFormattedValue = () => {
            if (token.amount?.length) {
              const cleanedAmount = token.amount.replace(/,/g, '');

              const [integerPart, decimalPart] = cleanedAmount.split('.');
              const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              const formattedValue = decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart.slice(0, token.precision)}`
                : formattedIntegerPart;

              return formattedValue;
            }

            return token.amount;
          };

          if (index === 0) {
            return (
              <div className="flex items-center py-3 px-5 rounded-[10px] border border-[#1B1D23]" key={`${token.denom}-${index}`}>
                <input
                  className="flex-1 w-full bg-transparent text-[#EEE] placeholder:text-[#5E6773] outline-none shadow-sm"
                  value={renderFormattedValue()}
                  onChange={(e) => handleUpdateTokenAmount(token, e.target.value)}
                />
                <div className="flex-none">
                  <Dropdown
                    selected={tokenToDropdownItem}
                    onSelect={(item) => onSelectCurrencyInDropdown(item, token, index)}
                    items={assetsBalancesToDropdownItems}
                    type={DropdownType.Primary}
                    icon={tokenToDropdownItem.icon}
                    selectedClassName="text-xs !w-[200px] overflow-auto"
                    selectedLabelClassName="text-grey-gradient"
                    listClassName="!w-[240px] right-0"
                  />
                </div>
              </div>
            );
          }

          return (
            <div className="flex items-center w-full gap-2" key={`${token.denom}-${index}`}>
              <div className="flex-none flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8378 1.84783C12.8378 1.45847 12.5221 1.14282 12.1327 1.14282C11.7434 1.14282 11.4277 1.45847 11.4277 1.84783L11.4277 7.35433C11.4277 10.2356 13.7635 12.5714 16.6448 12.5714H22.1513C22.5407 12.5714 22.8563 12.2558 22.8563 11.8664C22.8563 11.477 22.5407 11.1614 22.1513 11.1614H16.6448C14.5422 11.1614 12.8378 9.4569 12.8378 7.35433V1.84783Z"
                    fill="#5E6773"
                  />
                </svg>
              </div>
              <div className="flex-1 flex items-center py-3 px-5 rounded-[10px] border border-[#1B1D23] gap-2">
                <input
                  className="flex-1 w-full bg-transparent text-[#EEE] placeholder:text-[#5E6773] outline-none shadow-sm"
                  value={renderFormattedValue()}
                  onChange={(e) => handleUpdateTokenAmount(token, e.target.value)}
                />
                <div className="flex-none">
                  <Dropdown
                    selected={tokenToDropdownItem}
                    onSelect={(item) => onSelectCurrencyInDropdown(item, token, index)}
                    items={assetsBalancesToDropdownItems}
                    type={DropdownType.Primary}
                    icon={tokenToDropdownItem.icon}
                    selectedClassName="text-xs !w-[176px] overflow-auto"
                    selectedLabelClassName="text-grey-gradient"
                    listClassName="!w-[240px] right-0"
                  />
                </div>
              </div>
              <div className="flex-none flex items-center cursor-pointer" onClick={() => handleRemoveFundFromFundsList(token)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5041 3.51412C13.7851 3.23314 13.7851 2.77759 13.5041 2.49662C13.2231 2.21565 12.7676 2.21565 12.4866 2.49662L8.00056 6.98268L3.5145 2.49662C3.23353 2.21565 2.77798 2.21565 2.497 2.49662C2.21603 2.77759 2.21603 3.23314 2.497 3.51412L6.98306 8.00017L2.49718 12.4861C2.2162 12.767 2.2162 13.2226 2.49718 13.5036C2.77815 13.7845 3.2337 13.7845 3.51468 13.5036L8.00056 9.01767L12.4864 13.5036C12.7674 13.7845 13.223 13.7845 13.5039 13.5036C13.7849 13.2226 13.7849 12.767 13.5039 12.4861L9.01806 8.00017L13.5041 3.51412Z"
                    fill="#5E6773"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </>
    );
  }, [assetsBalancesToDropdownItems, funds, handleRemoveFundFromFundsList, handleUpdateTokenAmount, onSelectCurrencyInDropdown]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-3">
        <Input
          label="Code ID"
          value={codeId}
          onChange={(value) => dispatch(setExtensionCodeId(value))}
          placeholder="Example: 001"
          error={isEnteredCodeIdValid}
          errorClassName="-mb-12 md:!-mb-9"
        />
        <Input
          label="Label"
          value={label}
          onChange={(value) => dispatch(setExtensionLabel(value))}
          placeholder="Example: Extension name"
          error={isEnteredLabelValid}
          errorClassName="-mb-12 md:-mb-9"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-[#868991] text-sm font-noto-sans font-normal leading-[21px]">
          Funds Amount
        </p>
        <div className="flex flex-col w-full gap-2">
          {renderFunds}
        </div>
        <div className="flex items-center gap-1 cursor-pointer" onClick={handleAddExtensionFunds}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.41248 2L6.41246 6.41252L2 6.41254L2 7.5878L6.41246 7.58779L6.41245 12L7.58772 12L7.58773 7.58779L12 7.58778L12 6.41251L7.58773 6.41252L7.58774 2L6.41248 2Z"
              fill="#25D695"
            />
          </svg>
          <p className="text-[#25D695] font-noto-sans text-xs font-medium leading-[18px] tracking-[-0.18px]">
            Add Fund
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <TextArea
          label="Issuance Message"
          value={issuanceMsg}
          onChange={(value) => dispatch(setExtensionIssuanceMsg(value))}
          placeholder="{}"
          rows={6}
          error={isIssuanceMsgValid}
        />
      </div>
    </div>
  );
};
