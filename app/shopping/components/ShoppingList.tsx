"use client";
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  checked: boolean;
};

const fetchData = async (): Promise<Item[]> => {
  return [
    { id: 1, name: "Mléko", checked: false },
    { id: 2, name: "Chleba", checked: false },
    { id: 3, name: "Šunka", checked: false },
    { id: 4, name: "Sýr", checked: false },
    { id: 5, name: "Jogurt", checked: false },
  ];
};

const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [initialItems, setInitialItems] = useState<Item[]>([]);
  const [isChanges, setIsChanges] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchData();
      setItems(data);
      setInitialItems(structuredClone(data));
    };
    loadItems();
  }, []);

  const handleToggle = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.checked));
  };

  const handleSave = (name: string) => {
    if (name.trim() === "") return;
    setItems((prevItems) => [
      { id: Date.now(), name, checked: false },
      ...prevItems,
    ]);
    setInputValue("");
  };

  useEffect(() => {
    checkChanges();
  }, [items]);

  const checkChanges = async () => {
    const initialMap = new Map(initialItems.map((item) => [item.id, item]));
    const currentMap = new Map(items.map((item) => [item.id, item]));

    const updatedItems = items.filter(
      (item) =>
        initialMap.has(item.id) &&
        initialMap.get(item.id)?.checked !== item.checked
    );

    const newItems = items.filter((item) => !initialMap.has(item.id));

    const deletedItems = initialItems.filter(
      (item) => !currentMap.has(item.id)
    );

    if (
      updatedItems.length === 0 &&
      newItems.length === 0 &&
      deletedItems.length === 0
    ) {
      setIsChanges(false);
      return;
    }
    setIsChanges(true);
    console.log("✅ Změněné:", updatedItems);
    console.log("🆕 Nové:", newItems);
    console.log("❌ Smazané:", deletedItems);
  };

  return (
    <>
      <FormControl
        variant="filled"
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(inputValue);
        }}
        sx={{ my: 2, width: "100%" }}
      >
        <InputLabel htmlFor="new-item-input">Nová položka</InputLabel>
        <FilledInput
          id="new-item-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Button type="submit">Přidat</Button>
            </InputAdornment>
          }
        />
      </FormControl>

          {items.length === 0 ? <Typography variant="h5" align="center">Žádné položky</Typography> : (
            <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {items.map(
          (item) =>
            !item.checked && (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => handleToggle(item.id)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.checked}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
        )}

        {items.map(
          (item) =>
            item.checked && (
              <ListItem key={item.id} disablePadding sx={{opacity: 0.7}}>
                <ListItemButton onClick={() => handleToggle(item.id)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.checked}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
      <Box marginTop={2} display={"flex"} justifyContent={isChanges ? "space-between" : "flex-start"}>
        <Button variant="outlined"  onClick={handleDelete}>Smazat vybrané</Button>
        {isChanges && <Button variant="contained">Uložit</Button>}
      </Box>
      </>
          )}
    </>
  );
};

export default ShoppingList;
