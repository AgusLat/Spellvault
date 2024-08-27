import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export const SchoolsInfo = () => {

    const schoolsRef = useRef()
    const [isVisible, setIsVisible] = useState(true)


  return (
    <div className='schoolsInfo'>
        <h3  onClick={()=>{setIsVisible(!isVisible)}}>Magic schools information  <img className={'schoolsInfo__arrow' + (!isVisible?' --rotate':'')} src="/arrow.svg" alt="" /> </h3>
        <CSSTransition in={isVisible} nodeRef={schoolsRef} timeout={300} classNames={'schoolsTransition'} appear={true}>

                <div ref={schoolsRef} className='schoolsInfo__container'>
                <div>
                    <ul>
                        <li>
                            <h4>Abjuration</h4>
                            <p>
                                Abjuration spells are protective in nature, though some of them have aggressive uses. They create magical barriers, negate harmful effects, harm trespassers, or banish creatures to other planes of existence.
                            </p>
                        </li>
                        <li>
                            <h4>Conjuration</h4>
                            <p>
                                Conjuration spells involve the transportation of objects and creatures from one location to another. Some spells summon creatures or objects to the caster’s side, whereas others allow the caster to teleport to another location. Some conjurations create objects or effects out of nothing.
                            </p>
                        </li> 
                        <li>
                            <h4>Necromancy</h4>
                            <p>
                                Necromancy spells manipulate the energies of life and death. Such spells can grant an extra reserve of life force, drain the life energy from another creature, create the undead, or even bring the dead back to life. Creating the undead through the use of necromancy spells such as animate dead is not a good act, and only evil casters use such spells frequently.
                            </p>
                        </li> 
                        <li>
                            <h4>Evocation</h4>
                            <p>
                                Evocation spells manipulate magical energy to produce a desired effect. Some call up blasts of fire or lightning. Others channel positive energy to heal wounds.
                            </p>
                        </li> 
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <h4>Enchantment</h4>
                            <p>
                                Enchantment spells affect the minds of others, influencing or controlling their behavior. Such spells can make enemies see the caster as a friend, force creatures to take a course of action, or even control another creature like a puppet.
                            </p>
                        </li> 
                        <li>
                            <h4>Transmutation</h4>
                            <p>
                                Transmutation spells change the properties of a creature, object, or environment. They might turn an enemy into a harmless creature, bolster the strength of an ally, make an object move at the caster’s command, or enhance a creature’s innate healing abilities to rapidly recover from injury.
                            </p>
                        </li> 
                        <li>
                            <h4>Illusion</h4>
                            <p>
                                Illusion spells deceive the senses or minds of others. They cause people to see things that are not there, to miss things that are there, to hear phantom noises, or to remember things that never happened. Some illusions create phantom images that any creature can see, but the most insidious illusions plant an image directly in the mind of a creature.
                            </p>
                        </li>
                        <li>
                            <h4>Divination</h4>
                            <p>
                                Divination spells reveal information, whether in the form of secrets long forgotten, glimpses of the future, the locations of hidden things, the truth behind illusions, or visions of distant people or places.
                            </p>
                        </li> 
                    </ul>
                </div>
                </div>
        </CSSTransition>
    </div>
  )
}
