import { Assignment, Home, Settings, ShoppingCart } from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

export interface NavLink {
  label: string;
  path: string;
  icon: SvgIconComponent;
}

export const links: NavLink[] = [
  { label: "Přehled", path: "/", icon: Home },
  { label: "Úkoly", path: "/tasks", icon: Assignment },
  { label: "Nákup", path: "/shopping", icon: ShoppingCart },
  { label: "Nastavení", path: "/settings", icon: Settings }
];