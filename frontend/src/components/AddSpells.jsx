import React from 'react'
import '../css/addSpells.css'
import { useLoaderData } from 'react-router-dom'
import { AdvancedSearchForm } from './AdvancedSearchForm'

export const AddSpells = () => {

  const {spells} = useLoaderData

  return (
    <div className='addSpells'>
       <AdvancedSearchForm hasAdd={true} hasCustom={true} hasOrder={true} spells={spells}></AdvancedSearchForm>
    </div>
  )
}
