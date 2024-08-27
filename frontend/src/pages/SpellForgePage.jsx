import '../css/spellForgePage.css'
import { Loading } from '../components/Loading'
import { Navigate, Outlet, useNavigation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export const SpellForgePage = () => {

 

  //HOOKS
  const { user } = useAuthContext()
  const navigation = useNavigation()

  if(navigation.state === "loading" ){
    return <><Loading/> </>
  }

  return (
    <>
    <div className='spellForgePage'>
      <Navigate to='/spellforge/browsespells'/> 
      <Outlet user={user}/>
    </div>
    </>
  )
}
