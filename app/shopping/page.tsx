import { Container } from "@mui/material";
import ShoppingList from "./components/ShoppingList";

const ShoppingPage = () => {
  return (
    <Container maxWidth="sm">
      <ShoppingList />
    </Container>
  );
};

export default ShoppingPage;
