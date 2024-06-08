
import './css/App.css'
import { createBrowserRouter, createRoutesFromElements ,RouterProvider, Route, Navigate} from "react-router-dom"

//COMPONENTS
import { Layout } from './layout/Layout'
import { Home } from './pages/Home'
import { SpellForgePage } from './pages/SpellForgePage'
import { MyVaultPage } from './pages/MyVaultPage'
import { AccessPage } from './pages/AccessPage'
import { useAuthContext } from './hooks/useAuthContext'
import { Loading } from './components/Loading'

//LOADERS
import { homeLoader } from './pages/Home'



function App() {
 
  const { user } = useAuthContext()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index loader={homeLoader} element={<Home/>}/>
        <Route path='/spellforge' element={user?<SpellForgePage/>: <Navigate to='/access'/>}/>
        <Route path='/myvault' element={user?<MyVaultPage/>: <Navigate to='/access'/>}/>
        <Route path='/access' element={!user?<AccessPage/>: <Navigate to='/myvault'/>}/>
      </Route>
  ))

  return (
    
    <RouterProvider router={router} fallbackElement={<Loading/>} future={{ v7_startTransition: true }}>
      <Layout/>
    </RouterProvider>
   
  )
}

export default App


 


 