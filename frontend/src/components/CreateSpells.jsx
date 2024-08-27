import React, { useState } from 'react'
import '../css/createSpells.css'
import { CustomSpellForm } from './CustomSpellForm'
import { SchoolsInfo } from './SchoolsInfo'
import { NavLink } from 'react-router-dom'
import { useDownloadFile } from '../hooks/useDownloadFile'
import { useAuthContext } from '../hooks/useAuthContext'


export const CreateSpells = () => {

    const [isPressed, setIsPressed] = useState(false)
    const [showCopy, setShowCopy] = useState(false)


    const { downloadFile, downloadError, downloadLoading } = useDownloadFile()
    const { user } = useAuthContext()

    const handleClick = async (fileName)=>{
       await downloadFile(fileName, user.token )
       console.log('click')
    }

    const copyPrompt = ()=>{
        const promptText = `Design a brand-new Dungeons & Dragons 5e spell that fits the following criteria:

1. Class: [Choose the class that can cast this spell: Wizard, Sorcerer, Druid, Bard, Cleric, Warlock, Paladin, Ranger, Artificer]

2. School of Magic: [Select the magic school for the spell: Evocation, Conjuration, Necromancy, Transmutation, Divination, Enchantment, Abjuration, Illusion]

3. Spell Level: [Pick the spell level, cantrip or from 1st to 9th level]

4. Spell Name: Create a unique and evocative name for your spell.

5. Casting Time: Specify the time required to cast the spell. (Options include: 1 action, 1 bonus action, 1 reaction, 1 minute, etc.)

6. Range: Determine the range of the spell. (e.g., Touch, 30 feet, 60 feet, 120 feet, etc.)

7. Components: List the components required to cast the spell. (Verbal (V), Somatic (S), Material (M) - specify any material components)

8. Duration: Set the duration of the spell's effects. (Options include: Instantaneous, Concentration up to X minutes, 1 hour, etc.)

9. Description: Describe the spell's effects in detail. Include how it impacts targets, what saving throws might be required, and any damage or other effects it inflicts.

10. Flavor Text: Write a short narrative or flavor description that captures the essence of the spell, its origin, or how it might be perceived by characters in the game world.

11. At Higher Levels: (Optional) Explain how the spell changes when cast using a higher-level spell slot, if applicable.

12. Any Special Conditions or Restrictions: Mention any unique conditions or limitations associated with the spell.

Be creative and ensure that the spell fits within the rules and lore of D&D 5e!`

        navigator.clipboard.writeText(promptText)
      .then(() => {

        setShowCopy(true)
        setTimeout(()=>{
            setShowCopy(false)
        }, 2000)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      });
    }

    return (
        <div className='createSpells'>  
            <div className='createSpells__guideDiv'>
                <div className='createSpells__resourcesContainer'>
                    <div className='createSpells__browse'>
                        <NavLink 
                            className={'createSpells__a' + (isPressed? ' --aPressed': '')}
                            onTouchStart={()=>{setIsPressed(true)}}
                            onTouchEnd={()=>{setIsPressed(false)}}
                            onMouseDown={()=>{setIsPressed(true)}}
                            onMouseUp={()=>{setIsPressed(false)}}  
                            to={'/spellforge/browsespells'}>
                                <img src='/double-arrow-left.svg' />
                                GO BACK TO BROWSE CUSTOM SPELLS
                        </NavLink>
                    </div>
                    <div className='createSpells__resources'>
                    <p>Resources and guides to create spells</p>
                    <ul>
                        <li>Official D&D 5e Dungeon master's guide <b onClick={()=>{handleClick('creatingSpells-DMGuide.pdf')}}>spell creation basics.</b></li>
                        <li>Unofficial <b  onClick={()=>{handleClick('spellCreator-theHomebrewery.pdf')}}>spell creation guide</b> with point buy system.</li>
                        <li>Copy 
                            <b onClick={()=>{copyPrompt()}}> this prompt <span className={`createSpells__copyConfirm ${showCopy? '--copyVisible':''}`}>Prompt copied</span></b> to a generative AI chat and customize your preferences.
                            <span className={`createSpells__copyConfirm ${showCopy? '--copyVisible':''}`}>Prompt copied</span>
                        </li>
                        
                    </ul>
                    </div>
                </div>
                <SchoolsInfo/>  
            <hr className='createSpells__hr' />
            </div>

            <div className='createSpells__customSpellFormContainer'>

                <h3>Spell creation form</h3>
                <CustomSpellForm/>
            </div>
        </div>
    )
}
