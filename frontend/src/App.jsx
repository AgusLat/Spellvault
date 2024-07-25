import './css/App.css'
import { createBrowserRouter, createRoutesFromElements ,RouterProvider, Route, Navigate} from "react-router-dom"

//CONTEXT
import { useAuthContext } from './hooks/useAuthContext'

//COMPONENTS
import { Layout } from './layout/Layout'

//PAGES COMPONENTS
import { Home } from './pages/Home'
import { SpellForgePage } from './pages/SpellForgePage'
import { MyVaultPage } from './pages/MyVaultPage'
import { AccessPage } from './pages/AccessPage'

//SUBPAGES COMPONENTS
//MyVaultPage
import { AddSpells } from './components/AddSpells'
import { MySpells } from './components/MySpells'
import { CastSpells} from './components/CastSpells'
import { CreateCharacter} from './components/CreateCharacter'
import { ManageCharacters} from './components/ManageCharacters'

//LOADERS
import { homeLoader } from './pages/Home'
import { Loading } from './components/Loading'



function App() {
 
  const { user } = useAuthContext()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index loader={homeLoader} element={<Home/>}/>
        <Route path='/spellforge' element={user?<SpellForgePage/>: <Navigate to='/access'/>}/>
        <Route path='/myvault' element={user?<MyVaultPage/>: <Navigate to='/access'/>}>

          <Route path='/myvault/spells' element={user?<MySpells/>: <Navigate to='/access'/>} />
          <Route path='/myvault/add' element={user?<AddSpells/>: <Navigate to='/access'/>} />
          <Route path='/myvault/cast' element={user?<CastSpells/>: <Navigate to='/access'/>} />
          <Route path='/myvault/create' element={user?<CreateCharacter/>: <Navigate to='/access'/>} />
          <Route path='/myvault/manage' element={user?<ManageCharacters/>: <Navigate to='/access'/>} />

        </Route>
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


 


 