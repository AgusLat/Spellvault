import './css/App.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"

//COMPONENTS
import { Layout } from './layout/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

//LOADERS
import { homeLoader } from './pages/Home'


const router = createBrowserRouter([
  { path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element:<Home/>,
        loader: homeLoader
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      }
    ]
  }
]);



function App() {
 

  return (
    
    <RouterProvider router={router}>
      <Layout/>
    </RouterProvider>
   
  )
}

export default App
