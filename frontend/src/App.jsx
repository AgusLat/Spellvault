import './css/App.css'
import { useLayoutEffect, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements ,RouterProvider, Route, Navigate, useLocation} from "react-router-dom"

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

//SpellForgePage
import { CustomSpellsHome } from './components/CustomSpellsHome'
import { CreateSpells } from './components/CreateSpells'

//MyVaultPage
import { AddSpells } from './components/AddSpells'
import { MySpells } from './components/MySpells'
import { CastSpells} from './components/CastSpells'
import { CreateCharacter} from './components/CreateCharacter'
import { ManageCharacters} from './components/ManageCharacters'

//LOADERS
import { homeLoader } from './pages/Home'
import { Loading } from './components/Loading'
import { MyCustomSpells } from './components/MyCustomSpells'


const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

function App() {
 
  const { user } = useAuthContext()

   const router = createBrowserRouter(
     createRoutesFromElements(
       <Route path='/' element={<Wrapper><Layout/></Wrapper>}>

         {/* HOMEPAGE ROUTE */}
         <Route index loader={homeLoader} element={<Home/>}/>

         {/* CUSTOM SPELLS ROUTE */}
         <Route path='/spellforge' element={<SpellForgePage/>}>
           <Route path='/spellforge/browsespells' element={<CustomSpellsHome/>} />
           <Route path='/spellforge/createspells' element={user?<CreateSpells/>:<Navigate to='/access'/>} />
           <Route path='/spellforge/mycustomspells' element={user?<MyCustomSpells/>:<Navigate to='/access'/>} />
         </Route>

         {/* CHARACTERS ROUTE */}
         <Route path='/myvault' element={user?<MyVaultPage/>: <Navigate to='/access'/>}>
           <Route path='/myvault/spells' element={<MySpells/>} />
           <Route path='/myvault/add' element={<AddSpells/>} />
           <Route path='/myvault/cast' element={<CastSpells/>} />
           <Route path='/myvault/create' element={<CreateCharacter/>} />
           <Route path='/myvault/manage' element={<ManageCharacters/>} />
         </Route>

         {/* REGISTER/LOGIN ROUTE */}
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


 


 