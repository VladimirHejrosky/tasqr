"use client";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  checked: boolean;
};

const fetchData = async (): Promise<Item[]> => {
  const {data} = await axios.get("/api/shopping");
  return data;
};

const getDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("shoppingList");
    return data ? JSON.parse(data) : [];
  }
};

const saveDataToLocalStorage = (data: Item[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("shoppingList", JSON.stringify(data));
  }
};

const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("shoppingList");
    console.log("Cleared local storage");
  }
};

const ShoppingList = () => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [initialItems, setInitialItems] = useState<Item[]>([]);
  const [isChanges, setIsChanges] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchData();
      setInitialItems(structuredClone(data));

      const storedData = getDataFromLocalStorage();
      if (storedData && storedData.length !== 0) {
        setItems(storedData);
      } else {
        setItems(data);
      }
    };
    loadItems();
  }, []);

  const handleReset = async () => {
    clearLocalStorage();
    setItems(initialItems);
  };
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

  const handleCreateNew = (name: string) => {
    if (name.trim() === "") return;
    setItems((prevItems) => [
      { id: Date.now(), name, checked: false },
      ...prevItems,
    ]);
    setInputValue("");
  };
  const compareItems = useCallback(() => {
    const initialMap = new Map(initialItems.map((item) => [item.id, item]));
    const currentMap = new Map(items.map((item) => [item.id, item]));
  
    const updatedItems = items.filter(
      (item) =>
        initialMap.has(item.id) &&
        initialMap.get(item.id)?.checked !== item.checked
    );
  
    const newItems = items.filter((item) => !initialMap.has(item.id));
  
    const deletedItems = initialItems.filter((item) => !currentMap.has(item.id));
  
    return { updatedItems, newItems, deletedItems };
  }, [initialItems, items]);
  

  useEffect(() => {
    const checkChanges = () => {
      const { updatedItems, newItems, deletedItems } = compareItems();
      if (
        updatedItems.length === 0 &&
        newItems.length === 0 &&
        deletedItems.length === 0
      ) {
        setIsChanges(false);
        return;
      }
      setIsChanges(true);
      saveDataToLocalStorage(items);
      
    };
    checkChanges();
  }, [items, compareItems]);


  const handleSave = async () => {
    setLoading(true);
    const { updatedItems, newItems, deletedItems } = compareItems();
    try {
      const requests = [
        ...newItems.map((item) => axios.post("/api/shopping", item)),
        ...updatedItems.map((item) =>
          axios.patch(`/api/shopping/${item.id}`, item)
        ),
        ...deletedItems.map((item) => axios.delete(`/api/shopping/${item.id}`)),
      ];
      await Promise.all(requests);

      setInitialItems(items)
      clearLocalStorage();
      setIsChanges(false)
      setLoading(false);
      return router.refresh();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <FormControl
        variant="filled"
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateNew(inputValue);
        }}
        sx={{ my: 2, width: "100%" }}
      >
        <InputLabel htmlFor="new-item-input">Nová položka</InputLabel>
        <FilledInput
          inputProps={{ min: 1, max: 100 }}
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

      {items.length === 0 ? (
        <Typography variant="h5" align="center">
          Žádné položky
        </Typography>
      ) : (
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
                  <ListItem key={item.id} disablePadding sx={{ opacity: 0.7 }}>
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
        </>
      )}
      <Box
        marginTop={2}
        display={"flex"}
        justifyContent={isChanges ? "space-between" : "flex-start"}
      >
        <Button variant="outlined" onClick={handleDelete}>
          Smazat vybrané
        </Button>
        <Box gap={2} display={"flex"}>
          {isChanges && (
            <Button onClick={handleReset} variant="outlined">
              Vrátit změny
            </Button>
          )}
          {isChanges && (
            <Button onClick={handleSave} variant="contained">
              Uložit
            </Button>
          )}
        </Box>
      </Box>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ShoppingList;
