import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Checkbox,
  Container,
  Fab,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { FormDialog, createFormDialogStore } from "./components/FormDialog";
import { useLocalStore } from "./utilities/store";
import { Todo, useTodoStore } from "./stores/todoStore";

export const enum FilterState {
  All = "all",
  Pending = "pending",
  Completed = "completed",
}

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function App() {
  // Store
  const state = useTodoStore();

  // Filter
  const [filterState, setFilterState] = useState(FilterState.All);

  const [filterAnchorEl, setFilterAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isFilterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filterState: FilterState) => () => {
    setFilterAnchorEl(null);
    setFilterState(filterState);
    alert(`(Task: #3) Filter was selected: ${filterState}`);
  };

  const title = React.useMemo(() => {
    switch (filterState) {
      case FilterState.All:
        return "Showing all todos";

      case FilterState.Pending:
        return "Showing pending todos";

      case FilterState.Completed:
        return "Showing completed todos";
    }
  }, [filterState]);

  // Form
  const useFormDialogStore = useLocalStore(createFormDialogStore());

  const handleAddClick = () => {
    alert(`(Task: #4) Add button was pressed`);
  };

  // List
  const handleTodoToggleClick = (todo: Todo) => {
    alert(`(Task: #1) Todo was pressed: ${todo.title}`);
  };

  const handleTodoDeleteClick = (todo: Todo) => {
    alert(`(Task: #2) Todo delete button was pressed: ${todo.title}`);
  };

  // Render
  return (
    <React.Fragment>
      <Container sx={{ p: 3 }}>
        <Paper>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            {title}
          </Typography>
          <List sx={{ mb: 2 }}>
            {state.todos.map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton onClick={() => handleTodoDeleteClick(todo)}>
                    <Icon>delete</Icon>
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  dense
                  onClick={() => handleTodoToggleClick(todo)}
                >
                  <ListItemIcon>
                    <Checkbox checked={todo.completed} readOnly disableRipple />
                  </ListItemIcon>
                  <ListItemText
                    primary={todo.title}
                    secondary={todo.description}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Typography variant="h6">Discoverr Todo</Typography>
          <StyledFab color="secondary" onClick={handleAddClick}>
            <Icon>add</Icon>
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleFilterClick}>
            <Icon>filter_alt</Icon>
          </IconButton>
          <Menu
            anchorEl={filterAnchorEl}
            open={isFilterOpen}
            onClose={handleFilterClose}
          >
            <MenuItem
              selected={filterState === FilterState.All}
              onClick={handleFilterSelect(FilterState.All)}
            >
              All
            </MenuItem>
            <MenuItem
              selected={filterState === FilterState.Pending}
              onClick={handleFilterSelect(FilterState.Pending)}
            >
              Pending
            </MenuItem>
            <MenuItem
              selected={filterState === FilterState.Completed}
              onClick={handleFilterSelect(FilterState.Completed)}
            >
              Completed
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <FormDialog useStore={useFormDialogStore} />
    </React.Fragment>
  );
}

export default App;
