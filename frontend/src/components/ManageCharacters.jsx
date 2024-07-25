import React, { useRef, useState, useEffect } from 'react'
import '../css/manageCharacters.css'
import { useDeleteCharacter} from '../hooks/useDeleteCharacter'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCharacterContext } from '../hooks/useCharacterContext'
import { useLoadCharList } from '../hooks/useLoadCharList'
import { useEditCharacter } from '../hooks/useEditCharacter'
import { useNavigate } from 'react-router-dom'
import { spellSlotsByClass } from '../datadnd/dndClasses'
import { CSSTransition } from 'react-transition-group'

export const ManageCharacters = () => {

  //CONTEXT
  const { user } = useAuthContext()
  const { state } = useCharacterContext()
  //HOOKS
  const navigate = useNavigate()
  const confirmRef = useRef(null)
  const { editCharacter, isEditLoading, editError} = useEditCharacter()
  const { isLoading, deleteError, deleteCharacter } = useDeleteCharacter()
  const { loadCharList, isLoadingList, loadListError } = useLoadCharList()
  
  //STATES
  const [ charLevel, setCharLevel ] = useState(null)
  const [ str, setStr ] = useState(null)
  const [ dex, setDex ] = useState(null)
  const [ con, setCon ] = useState(null)
  const [ int, setInt ] = useState(null)
  const [ wis, setWis ] = useState(null)
  const [ cha, setCha ] = useState(null)
  const [ confirmation, setConfirmation] = useState(false)


  useEffect(() => {
    if (state.activeCharacter) {
      setCharLevel(state.activeCharacter.level)
      setStr(state.activeCharacter.stats.STR)
      setDex(state.activeCharacter.stats.DEX)
      setCon(state.activeCharacter.stats.CON)
      setInt(state.activeCharacter.stats.INT)
      setWis(state.activeCharacter.stats.WIS)
      setCha(state.activeCharacter.stats.CHA)
    }
  }, [state.activeCharacter])


  const handleClick = async (action)=>{

    if(state.activeCharacter == null){
      console.log('No loaded character')
      return 
    }
    if (action === 'delete'){
      await deleteCharacter(user._id, state.activeCharacter._id, user.token)
      await loadCharList(user._id, user.token)
      navigate('/myvault')
    }

    if (action === 'edit'){
      setConfirmation(false)
      const charId = state.activeCharacter._id

      const level = charLevel
      const stats = {
        STR: str,
        DEX: dex,
        CON: con,
        INT: int,
        WIS: wis,
        CHA: cha
      }

      let slots

      if(spellSlotsByClass[state.activeCharacter.charClass]){
        slots = spellSlotsByClass[state.activeCharacter.charClass][level].
        reduce((acc, current) => {
          // GETS KEY : VALUE FROM CURRENT
          const [key, value] = Object.entries(current)[0];
          // ADDS KEY : VALUE TO ACCUMULATOR
          acc[key] = value;
          return acc;
      }, {});
      }

      if(!spellSlotsByClass[state.activeCharacter.charClass]){
        slots = spellSlotsByClass.general[level].reduce((acc, current) => {
          // GETS KEY : VALUE FROM CURRENT
          const [key, value] = Object.entries(current)[0];
          // ADDS KEY : VALUE TO ACCUMULATOR
          acc[key] = value;
          return acc;
      }, {});
      }
             
      await editCharacter({charId, level, stats, slots})
      await loadCharList(user._id, user.token)
      setConfirmation(true)
      
    }

  }

  return (
    <div className='manageCharacters'>
        {state.activeCharacter == null? 
          <p>No loaded character</p>:
          <>
            <div className='manageCharacters__dataDiv'>
              <h1>{state.activeCharacter.name}</h1>
              <div className='manageCharacters__classLevelDiv'>
                <span>Class: {state.activeCharacter.charClass.charAt(0).toUpperCase() + state.activeCharacter.charClass.slice(1)}</span>
                <div className='manageCharacters__levelDiv'>Level: <span className='manageCharacters__stat'>{charLevel}</span> 
                  <div className='manageCharacters__controlDiv'>
                    <button 
                      className='manageCharacters__control'
                      disabled={charLevel <= 1? true: false} 
                      onClick={()=>setCharLevel(charLevel-1)}>
                        -
                    </button> 
                    <button 
                      className='manageCharacters__control' 
                      disabled={charLevel >= 20? true: false} 
                      onClick={()=>setCharLevel(charLevel+1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div  className='manageCharacters__statsDiv'>
              <div className='manageCharacters__table'>
                  <div className='manageCharacters__row'>
                    <div className='manageCharacters__statDiv'>
                      STR: <span className='manageCharacters__stat'>{str}</span>
                    </div>
                    <div className='manageCharacters__controlDiv'>
                      <button className='manageCharacters__control' disabled={str <= 1? true: false} onClick={()=>setStr(str-1)}>-</button>
                      <button className='manageCharacters__control' disabled={str >= 20? true: false} onClick={()=>setStr(str+1)}>+</button>
                    </div>
                  </div>
                  <div className='manageCharacters__row'>
                    <div className='manageCharacters__statDiv'>
                      DEX: <span className='manageCharacters__stat'>{dex}</span>
                    </div>
                    <div className='manageCharacters__controlDiv'>
                      <button className='manageCharacters__control' disabled={dex <= 1? true: false} onClick={()=>setDex(dex-1)}>-</button>
                      <button className='manageCharacters__control' disabled={dex >= 20? true: false} onClick={()=>setDex(dex+1)}>+</button>
                    </div>
                  </div>
                  <div className='manageCharacters__row'>
                    <div className='manageCharacters__statDiv'>
                      CON: <span className='manageCharacters__stat'>{con}</span>
                    </div>
                    <div className='manageCharacters__controlDiv'>
                      <button className='manageCharacters__control' disabled={con <= 1? true: false} onClick={()=>setCon(con-1)}>-</button>
                      <button className='manageCharacters__control' disabled={con >= 20? true: false} onClick={()=>setCon(con+1)}>+</button>
                    </div>
                  </div>
                  <div className='manageCharacters__row'>
                    <div className='manageCharacters__statDiv'>
                      INT: <span className='manageCharacters__stat'>{int}</span>
                    </div>
                    <div className='manageCharacters__controlDiv'>
                      <button className='manageCharacters__control' disabled={int <= 1? true: false} onClick={()=>setInt(int-1)}>-</button>
                      <button className='manageCharacters__control' disabled={int >= 20? true: false} onClick={()=>setInt(int+1)}>+</button>
                    </div>
                  </div>
                  <div className='manageCharacters__row'>
                    <div className='manageCharacters__statDiv'>
                      WIS: <span className='manageCharacters__stat'>{wis}</span>
                    </div>
                    <div className='manageCharacters__controlDiv'>
                      <button className='manageCharacters__control' disabled={wis <= 1? true: false} onClick={()=>setWis(wis-1)}>-</button>
                      <button className='manageCharacters__control' disabled={wis >= 20? true: false} onClick={()=>setWis(wis+1)}>+</button>
                    </div>
                  </div>
                  <div className='manageCharacters__row'>
                    <div className='manageCharacters__statDiv'>
                      CHA: <span className='manageCharacters__stat'>{cha}</span>
                    </div>
                    <div className='manageCharacters__controlDiv'>
                      <button className='manageCharacters__control' disabled={cha <= 1? true: false} onClick={()=>setCha(cha-1)}>-</button>
                      <button className='manageCharacters__control' disabled={cha >= 20? true: false} onClick={()=>setCha(cha+1)}>+</button>
                    </div>
                </div>
              </div>
            </div>
            <button disabled={isEditLoading} className='manageCharacters__button' onClick={()=>handleClick('edit')}> SAVE EDIT </button>
            <button disabled={isLoading} className='manageCharacters__button' onClick={()=>handleClick('delete')}> DELETE CHARACTER </button>
            <CSSTransition in={confirmation} nodeRef={confirmRef} timeout={500} classNames='manageCharacters__confirm'>
              <div  className='manageCharacters__confirm' ref={confirmRef}>
                <p>CHARACTER EDITED CORRECTLY</p>
              </div>
            </CSSTransition>
          </>
        }
      {isLoading&& <p>LOADING...</p>}
      {deleteError&& <p>{deleteError}</p>}
      {editError&& <p>{editError}</p>}
    </div>
  )  
}
