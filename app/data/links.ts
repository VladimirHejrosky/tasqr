import {
  AddCircle,
  Assignment,
  Edit,
  Home, Settings, ShoppingCart,
  SvgIconComponent
} from '@mui/icons-material';

export interface NavLink {
  label: string;
  path: string;
  icon: SvgIconComponent | null;
  main: Boolean
}

// !!!! MainHeader functionality depends on the order of links !!!!
export const links: NavLink[] = [
  { label: "Přehled", path: "/", icon: Home, main: true },
  { label: "Úkoly", path: "/tasks", icon: Assignment, main: true },
  { label: "Nákup", path: "/shopping", icon: ShoppingCart, main: true },
  { label: "Nastavení", path: "/settings", icon: Settings, main: true },
  { label: "Editace", path: "/tasks/edit", icon: Edit, main: false},
  { label: "Nový", path: "/tasks/new", icon: AddCircle, main: false},
];