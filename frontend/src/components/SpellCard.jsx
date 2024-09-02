import React, { useRef, useState } from 'react'
import { useParseString } from '../hooks/useParseString'
import { CSSTransition } from 'react-transition-group'
import { AddSpellBtn } from './AddSpellBtn'
import {DeleteSpellBtn} from './DeleteSpellBtn'
import {PrepareSpellBtn} from './PrepareSpellBtn'
import {LikeSpellBtn} from './LikeSpellBtn'
import { CastControl } from './CastControl'
import '../css/spellCard.css'


export const SpellCard = ({spellData, spellId, hasLike, hasAdd, hasDelete, hasPrepare, hasCastControl}) => {
  
  //Parses <p></p> tags from strings in spell description property
  const [parseString] = useParseString()

  //CSS TRANSITION
  const [cardBody, setCardBody] = useState(true)
  const nodeRef = useRef(null)
  const arrowRef = useRef(null)
  

  return (
   
      <div className='spellCard' >    
      
        <header className='spellCard__header'>
          <img  
            className='spellCard__icon' 
            src={`/${spellData.school}.png`} 
            alt={spellData.school} 
            title={spellData.school}
            onClick={()=> cardBody?setCardBody(false):setCardBody(true)} 
          />
          <div className='spellCard__title' onClick={()=> cardBody?setCardBody(false):setCardBody(true)}>

            <div className='spellCard__name'>
            <h2> {spellData.name}  </h2>
            <div className='spellCard__titleInfo'>
              <span>{spellData.casting_time}</span>
              <span>{spellData.duration}</span>
              <span className='--hideGridItem3'>{spellData.components}</span>
            </div>
           </div>
            
            <div className='spellCard__subtitle'>
              <span>
                {`${spellData.level} `}
                {spellData.ritual&&<b title='Ritual' className='spellCard__ritualConcentration'>R</b>}
                {spellData.concentration&&<b title='Concentration' className='spellCard__ritualConcentration'>C</b>}
                {spellData.page === 'Custom spell'?<b title='Homebrew' className='spellCard__ritualConcentration'>HB</b>: null}
              </span>
            </div>
          </div>
          <div className='spellCard__controllers'>
            {hasCastControl && <CastControl spellData={spellData} />}
            {hasDelete && <DeleteSpellBtn spellData={spellData} />}
            {hasPrepare && <PrepareSpellBtn spellData={spellData} />}
            {hasAdd && <AddSpellBtn spellData={spellData} />}
            {hasLike && <LikeSpellBtn spellData ={spellData}/>}
            <div className='spellCard__details' onClick={()=> cardBody?setCardBody(false):setCardBody(true)}>
              <CSSTransition in={cardBody} nodeRef={arrowRef} classNames='arrowRotate' timeout={300}>
                <img ref={arrowRef} className='spellCard__details-icon' src='/arrow.svg' ></img>
              </CSSTransition>
            </div>
          </div>
        </header>

        <CSSTransition nodeRef={nodeRef} in={cardBody} timeout={500} appear={true} classNames="showSpellCardBody">
          <div className='spellCard__body' ref={nodeRef}>
            <div className='spellCard__gridWrapper'>
              <div className='spellCard__gridItem'>
                <b>Casting time </b>
                <span className='spellCard__gridSpan'>{spellData.casting_time}</span>
              </div>
              <div className='spellCard__gridItem'>
                <b>Range </b>
                <span className='spellCard__gridSpan'>{spellData.range}</span>
              </div>
              <div className='spellCard__gridItem'>
                <b>Components </b>
                <span className='spellCard__gridSpan'>{spellData.components}</span>
              </div>
              <div className='spellCard__gridItem'>
                <b>Duration </b>
                <span className='spellCard__gridSpan'>{spellData.duration}</span>
              </div>
              <div className='spellCard__gridItem'>
                <b>Classes </b>
                <span className='spellCard__gridSpan'>Classes: {spellData.class}</span>
              </div>
              <div className='spellCard__gridItem'>
                <b>Materials </b>
                <span className='spellCard__gridSpan'>{!spellData.material?"None":spellData.material}</span>
              </div>
            </div>
                <hr className='spellCard__hr'></hr>
            <div className='spellCard__description'>                
              <p><b className='spellCard__descriptionTitle'>Description:</b></p>
              {parseString(spellData.desc)}
              {spellData.higher_level?<p><b className='spellCard__descriptionTitle'>At higher level:</b></p>:null}
              {parseString(spellData.higher_level)}
            </div>
          </div>
        </CSSTransition>
    </div>
  )
}
