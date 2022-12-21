import './App.css';
import {createBrowserRouter, RouterProvider, useParams,} from 'react-router-dom';
import {Reader} from './reader/Reader.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/books/:id',
    loader: async ({params}) => {
      return fetch(`http://localhost:8080/books/${params.id}`);
    },
    element: <Reader />
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
