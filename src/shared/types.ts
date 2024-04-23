export enum FooterIconType {
  X = 'twitter',
  Instagram = 'instagram',
  Telegram = 'telegram',
  Discord = 'discord',
  Youtube = 'youtube',
  Medium = 'medium',
};

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
};

export enum ButtonIconType {
  Check = 'check',
  Wallet = 'wallet',
  Token = 'token',
  Plus = 'plus',
  Send = 'send',
};

export enum ButtonIconColorScheme  {
  Primary = '#21262E',
  Secondary = '#25D695',
  Disabled = '#2B3138',
};

export enum DropdownType {
  Primary = 'primary',
  Secondary = 'secondary',
};

export enum GeneralIconType {
  Coreum = 'coreum',
  Network = 'network',
  CheckMark = 'check_mark',
  Info = 'info',
};

export interface TabItem {
  id: string;
  label: string;
}

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
