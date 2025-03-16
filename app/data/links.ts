import { Assignment, Home, Settings, ShoppingCart, AddCircle
 } from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

export interface NavLink {
  label: string;
  path: string;
  icon: SvgIconComponent | null;
  main: Boolean
}

export const links: NavLink[] = [
  { label: "Přehled", path: "/", icon: Home, main: true },
  { label: "Úkoly", path: "/tasks", icon: Assignment, main: true },
  { label: "Nákup", path: "/shopping", icon: ShoppingCart, main: true },
  { label: "Nastavení", path: "/settings", icon: Settings, main: true },
  { label: "Nový úkol", path: "/tasks/new", icon: AddCircle, main: false}
];