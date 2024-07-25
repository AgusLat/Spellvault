import React,{ useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import '../css/myVaultPage.css'
import { VaultSideBar } from '../components/VaultSideBar'
import { VaultWrapper } from '../components/VaultWrapper'
import { useLoadCharList } from '../hooks/useLoadCharList'
import { useAuthContext } from '../hooks/useAuthContext'
import { Loading } from '../components/Loading'



export const MyVaultPage = () => {

  const { user } = useAuthContext()
  const { loadCharList, isLoadingList, loadingListError } = useLoadCharList()

  const [isActive, setIsActive] = useState(false)
  const navigation = useNavigation()


  const handleClick = ()=>{
    setIsActive(!isActive)
  }

  const loader = async ()=>{
    if(user){
      await loadCharList(user._id, user.token)  
      }
  }

  
  
  useEffect(()=>{
    
    loader()
  },[])
  
  if(navigation.state === "loading" ){
    return <>
          <Loading/>
    </>
          
        }

  return (
    <div className='myVaultPage'>
      {isLoadingList?<Loading/>:
      <>
        <VaultSideBar showSidebar={isActive}/>
        <VaultWrapper/> 
        <button onClick={()=>{handleClick()}} className='myVaultPage__sideBtn'>
          <img className='myVaultPage__eye' src='./black-eye.png'></img>
        </button>
      </>
      }
    </div>
  )
}

//FUNCION LOADER QUE TRAIGA EL ACTIVE CHARACTER DEL USUARIO
//BUSCA EL ID DEL PERSONAJE CON isActive = true.