import React from "react";
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
import { FilterState, Todo, useTodoStore } from "./stores/todoStore";
import { v4 } from "uuid";

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

    state.setFilterState(filterState);
    console.log("Set filter");
  };

  const title = React.useMemo(() => {
    switch (state.filterState) {
      case FilterState.All:
        return "Showing all todos";

      case FilterState.Pending:
        return "Showing pending todos";

      case FilterState.Completed:
        return "Showing completed todos";
    }
  }, [state.filterState]);

  // Form
  const useFormDialogStore = useLocalStore(createFormDialogStore());

  const handleAddClick = () => {
    useFormDialogStore.getState().open({
      title: "Add Todo",
      fields: {
        title: {
          field: "title",
          label: "Title",
          type: "text",
        },
        description: {
          field: "completed",
          label: "Description",
          type: "textarea",
        },
        completed: {
          field: "completed",
          label: "Has Task been completed",
          type: "checkbox",
        },
      },
      onSubmit: (values) => {
        const todo: Todo = {
          id: v4(),
          title: values.title as string,
          description: values.description as string,
          completed: values.completed as boolean,
        };

        state.addTodo(todo);
        console.log(useFormDialogStore.getState().dialog?._closing);
        //useFormDialogStore.getState().close();
        useFormDialogStore.getState().dialog = null;
        console.log(useFormDialogStore.getState().dialog?._closing);
      },
    });
  };

  // List
  const handleTodoToggleClick = (todo: Todo) => {
    state.toogleCompleted(todo.id);
  };

  const handleTodoDeleteClick = (todo: Todo) => {
    state.deleteTodo(todo.id);
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
            {state.filteredTodos.map((todo) => (
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
              selected={state.filterState === FilterState.All}
              onClick={handleFilterSelect(FilterState.All)}
            >
              All
            </MenuItem>
            <MenuItem
              selected={state.filterState === FilterState.Pending}
              onClick={handleFilterSelect(FilterState.Pending)}
            >
              Pending
            </MenuItem>
            <MenuItem
              selected={state.filterState === FilterState.Completed}
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
