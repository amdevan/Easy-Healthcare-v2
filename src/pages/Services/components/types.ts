export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  iconBg: string;
  href: string;
  decor: string;
  iconName?: string;
  iconImage?: string;
  icon?: React.ReactNode;
}

export interface StatsItem {
  value: string;
  label: string;
}
