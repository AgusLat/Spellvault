import React from 'react'
import '../css/loadingPage.css'


export const Loading = ({size}) => {
  return (
    <div className={size=='--small'?'loading-screen'+size:'loading-screen'}>
        <img className='loading-screen__img' src='loading.svg'></img>
        <h3>Loading . . .</h3>
    </div>
  )
}
