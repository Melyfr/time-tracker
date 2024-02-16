import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import store from './store/store';
import App from './App';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import './style/index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      if (!localStorage.getItem('user')) {
        return redirect("/login");
      }
      return null;
    },
  }, 
  {
    path: "login",
    element: <LogIn />,
  }, 
  {
    path: "signup",
    element: <SignUp />,
  },
], {
  basename: '/time-tracker',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
