import './App.css';
import {createBrowserRouter, RouterProvider, useParams,} from 'react-router-dom';
import {Reader} from './reader/Reader.js';
import {Overview} from './overview/Overview';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async ({params}) => {
      return fetch(`http://localhost:8080/books`);
    },
    element: <Overview />,
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
