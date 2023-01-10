# Discoverr React Todo

This is a frontend development evaluating repo.

## The Application

This application is made using React(framework), Material-UI(component library) & Zustand(state management), along with a few utility packages(formik, clsx, uuid, ...). The entire project is written in Typescript with strict mode enabled.

The application is a very basic todo app. However, only the UI is made. All the functionality is not yet developed. So as you try to interact with the application you will be met with a bunch of alerts. Every time you encounter an alert it will contain a reference to a task in the list below. The task will describe what needs to be done.

### Docs

- [React](https://beta.reactjs.org/learn)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)
- [Zustand](https://github.com/pmndrs/zustand)

## Tasks

1. Add toggle functionality to the list of todos. When you click on the todo it should toggle the the checkbox to the left. Extend the `todoStore` in a way so it provides a function to toggle a todo.

2. Add delete funtionality to the list of todos. When you click the trash icon the todo should be deleted. Extend the `todoStore` in a way so it provides a function to delete a todo.

3. Add filtering functionality to the list of todos. When you click on the filter icon in the bar at the bottom and select an option, the list of todos should show only todos that fits the selected filter.

4. Add create functionality to the list of todos. When you click the add button the user should be able to create a new task. The user should be able to fill in the following info: title, description, completed. A generic form component is already made to create a form dialog. However, no documentation or examples of usage is available. You will need to investigate the sourcecode for the component(`FormDialog` found at `src/components/FormDialog/FormDialog.tsx`) and try to figure out how you can use this component for the create functionality. The generic form component will only handle the form part of this feature. It should output a object with values the user typed in. You will also need to extend the `todoStore` in a way so it provides a function to add a todo in order to complete the feature.

## Getting started

In the project directory, you can run: `npm start` - Runs the app in the development mode.\
 - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.
