import React, { useRef, useState } from 'react'
import { useParseString } from '../hooks/useParseString'
import { CSSTransition } from 'react-transition-group'
import '../css/spellCard.css'


export const SpellCard = ({spellData, spellId}) => {
  
  //Parses <p></p> tags from strings in spell description property
  const [parseString] = useParseString()

  //CSS TRANSITION
  const [cardBody, setCardBody] = useState(true)
  const nodeRef = useRef(null)
  

  return (
   
      <div className='spellCard'>    
      
        <header className='spellCard__header'>
          <div className='spellCard__title'>
            <div className='spellCard__name'>
            <img  className='spellCard__icon' src={`./${spellData.school}.png`} alt="" />
            <h2> {spellData.name}  </h2>
           </div>
            
            <div className='spellCard__subtitle'>
              <dfn>
                <b>{`${spellData.school} - ${spellData.level} `}</b>
                <b>{spellData.ritual?"| Ritual ":null}</b>
                <b>| Classes - {spellData.class}</b>
              </dfn>
            </div>
          </div>
              <div className='spellCard__details' onClick={()=> cardBody?setCardBody(false):setCardBody(true)}>
                <img className='spellCard__details-icon' src='/unfold-more.svg' ></img>
              </div>
        </header>

        <CSSTransition nodeRef={nodeRef} in={cardBody} timeout={500} appear={true} classNames="showSpellCardBody">
          <div className='spellCard__body' ref={nodeRef}>
            <div className='spellCard__gridWrapper'>
              <div className='spellCard__gridItem1 --border'><b>Casting time: </b>{spellData.casting_time}</div>
              <div className='spellCard__gridItem2 --border'><b>Range: </b>{spellData.range}</div>
              <div className='spellCard__gridItem3 --border'><b>Components: </b>{spellData.components}</div>
              <div className='spellCard__gridItem4 --border'><b>Duration: </b>{spellData.duration}</div>
              <div className='spellCard__gridItem5 --border'><b>Materials: </b>{!spellData.material?"None":spellData.material}</div>
            </div>
                
            <div className='spellCard__description'>                
              <b>Description:</b>
              {parseString(spellData.desc)}
              {spellData.higher_level?<b>At higher level:</b>:null}
              {parseString(spellData.higher_level)}
            </div>
          </div>
        </CSSTransition>

        {/* <div className='spellCard__footer'>
          <button>ADD</button>
        </div> */}
    </div>
  )
}
