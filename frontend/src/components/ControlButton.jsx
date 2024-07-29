import React, {useState} from 'react'

export const ControlButton = ({children, onClick, disabled}) => {

  const [ isPressed, setIsPressed] = useState(false)

  const handlePressStart =()=>{
        setIsPressed(true)
  }

  const handlePressEnd =()=>{
    setIsPressed(false)
}


  return (
    <button
      className={'manageCharacters__control' + (isPressed? ' --addPressed': '')}
      onTouchStart={()=>{handlePressStart()}}
      onTouchEnd={()=>{handlePressEnd()}}
      onMouseDown={()=>{handlePressStart()}}
      onMouseUp={()=>{handlePressEnd()}}
      disabled={disabled}
      onClick={onClick}
    >{children}</button>
  )
}
