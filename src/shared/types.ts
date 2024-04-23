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
  Error = 'error',
  Close = 'close',
  Percentage = 'percentage',
};

export enum TabItemType {
  Create = 'create',
  Send = 'send',
  Manage = 'manage',
};

export enum TabSwitchItemType {
  FungibleToken = 'fungible-token',
  NonFungibleToken = 'non-fungible-token',
};

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabItem {
  id: TabItemType;
  label: string;
}

export interface TabSwitchItem {
  id: TabSwitchItemType;
  label: string;
}
