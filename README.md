# Student Registration Tracker

React useEffect group assignment demo for Group 2: updating the browser tab title dynamically.

## What the app demonstrates

- A Formik registration form with validation.
- Form submission that adds a student to state.
- A submitted student count displayed in the UI.
- A `useEffect` side effect that updates `document.title`.
- Dependency-based effects using form activity, latest submitted name, and student count.

## useEffect concept

React renders UI from state, but the browser tab title belongs to the page document outside React's normal rendered output. Updating `document.title` is therefore a side effect.

In this app, `useEffect` watches the computed title:

```jsx
useEffect(() => {
  document.title = currentTitle;

  return () => {
    document.title = originalTitle.current;
  };
}, [currentTitle]);
```

Whenever the form activity or submitted count changes, React recalculates `currentTitle`, then the effect updates the browser tab.

## Demo flow

1. Open the app and note the browser title: `Student Registration Tracker`.
2. Click inside the form and start typing. The title changes to `Completing Registration Form`.
3. Submit a valid student. The title briefly changes to `Registering Student...`.
4. After submission, the title changes to `{Student Name} Registered Successfully`.
5. The submitted student count and recent registrations list update on screen.

## Run the project

```bash
npm install
npm run dev
```
