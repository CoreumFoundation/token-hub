import { Switch as HeadlessSwitch } from '@headlessui/react';
import classNames from 'classnames';
import { FC } from 'react';

interface SwitchProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({
  enabled,
  setEnabled,
}) => {
  const cxSwitch = classNames('flex items-center p-0.5 h-5 w-9 cursor-pointer rounded-full duration-100 ease-in-out bg-[#2B3138]', {
    'bg-green-gradient': enabled,
  });

  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={setEnabled}
      className={cxSwitch}
    >
      <span
        aria-hidden="true"
        className={classNames('pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#9E9999] shadow ring-0 transition duration-200 ease-in-out translate-x-0', {
          'translate-x-4 !bg-[#EEE]': enabled,
        })}
      />
    </HeadlessSwitch>
  );
}
