import React, { useState, useEffect } from 'react'
import { useAddSpell } from '../hooks/useAddSpell'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLoadCharList } from '../hooks/useLoadCharList'
import { useLikeSpell } from '../hooks/useLikeSpell'

export const LikeSpellBtn = ({spellData}) => {


  //CONTEXT HOOKS
  const {user} = useAuthContext()
  //HOOKS
//   const {addSpell, spellError, spellLoading} = useAddSpell()
  const {likeSpell,likeError,likeLoading} = useLikeSpell()
  //USE-STATE
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(spellData.user_likes.length)
  const [isPressed, setIsPressed] = useState(false)

  
  const localStorageId = JSON.parse(localStorage.getItem("user"))?._id




  useEffect(() => {
      if(spellData.user_likes.includes(localStorageId)){  
          setIsLiked(true)
      } else {
          setIsLiked(false)
      }
  
  }, [spellData.user_likes, localStorageId])

  
    
  

  const handleClick = async ()=>{
      
        if (!user?.token) { //CONTROLAR Y AGREGAR UN POPUP
           console.log('logueate')
           return
        }
        const spellId = spellData._id
        const userId = user._id
        const token = user.token
        setIsLiked(!isLiked)
        if(token && userId){
            const newLikesArr =  await likeSpell(spellId, userId, token)

            // setIsLiked(newLikesArr.includes(userId));
            setLikes(newLikesArr.length)
         }
        
    }


  return (
    <div
      className={'spellCard__likes'}
      onTouchStart={()=>{setIsPressed(true)}}
      onTouchEnd={()=>{setIsPressed(false)}}
      onMouseDown={()=>{setIsPressed(true)}}
      onMouseUp={()=>{setIsPressed(false)}}
      onClick={()=>{handleClick()}}
    >

        <img 
            className={'spellCard__details-icon' + (isPressed? ' --addPressed': '')} 
            src={isLiked?'/heart-full.svg':'/heart-empty.svg'} 
        />
        <span className='spellCard__likeValue'>{likes}</span>
      
    </div>
  )
}
