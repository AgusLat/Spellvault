import { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactQuill from "react-quill";

//CSS
import '../css/spellCard.css'
import '../css/customSpellForm.css'
import 'react-quill/dist/quill.snow.css';
import '../css/quillEditor.css'

//HOOKS
import { useAuthContext } from '../hooks/useAuthContext'
import { useCreateSpell } from '../hooks/useCreateSpell'

//COMPONENTS

export const CustomSpellForm = () => {
  
  //QUILL
  const [quillContent, setQuillContent] = useState('')
  const modules = {
    toolbar: [
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

 
  //USE STATE FORM
  const [spellClass, setSpellClass] = useState([]) //Necesario
  const [isCreated, setIsCreated] = useState(false) //Necesario



  //CONTEXT
  const { user } = useAuthContext()

  //HOOKS
  const  { createSpell, isLoading, createSpellError } = useCreateSpell()
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    control,
    reset,
    formState: {errors}} = useForm()



  useEffect(() => {
    setValue('spellClass', spellClass.join(', '));
  }, [spellClass, setValue]);



  const handleClassChange = (selectedClass)=>{  

    setSpellClass(prevSpellClass => {
        // Check if the class is already in the list  
        if (prevSpellClass.includes(selectedClass)) {
          // If it is, remove it
          return prevSpellClass.filter(c => c !== selectedClass)
        } else {
          // If it's not, add it
          return [...prevSpellClass, selectedClass]
        }
    })
  }

 

  const onSubmit = async (data)=>{
    setIsCreated(false)
    
    let newSpell = {
         page: 'Custom spell',
         user_id : user._id,
         name: data.spellName.trim(),
         school: data.spellSchool,
         level: data.spellLevel,
         class: data.spellClass,
         ritual: data.ritual,
         concentration: data.concentration,
         duration: 
         (`${data.durationType}${watch('durationType') === 'Up to '? data.durationTime + ' '+ data.durationTimeFormat :''}`),
         range: (
          data.rangeType === 'Ranged'?
          `${data.rangeType} ${data.range} feet`:
          `${data.rangeType}` ),
         components: data.components.join(', '),
         casting_time: (`${watch('castTime') === '0'? '':data.castTime} ${data.castType}`).trim(),
         material: data.materials && data.components.includes('M')? data.materials: 'None',
         desc: data.spellDesc,
         higher_level: `${watch('spellHigherLevel') === '' ? 'None':data.spellHigherLevel}`
    }

    const spellCreated = await createSpell(newSpell, user.token)

    if(spellCreated){
      setIsCreated(true)
      reset()
    }

  }
  

  return (
      
      <div className='customSpellForm'>    
        <form className='customSpellForm__form' onSubmit={handleSubmit(onSubmit)} >
            <header className='customSpellForm__header'>
              <div className='customSpellForm__title'>
{/*NAME*/}
                <div className='customSpellForm__name'>
                    <img  className='spellCard__icon' src={watch('spellSchool')?`/${watch('spellSchool')}.png`:'/black-eye.png' } alt="magic-school" />
                    <div className='customSpellForm__inputDiv --medium'>
                      { errors.spellName && <span className='customSpellForm__errorSpan' >{errors.spellName.message}</span>}
                      <input 
                        className={errors.spellName?'customSpellForm__input --error --medium':'customSpellForm__input --medium'}
                        type="text"
                        placeholder='Spell name'
                        {...register('spellName',
                          {
                            required:{
                              value: true,
                              message: "Required *"
                            },
                            maxLength:{
                              value: 40,
                              message: "40 characters max *"
                            }
                          })
                        }
                        />
                      </div>
{/*RITUAL / CONCENTRATION*/}
                    <div className='customSpellForm__rcDiv'>
                      <div className='customSpellForm__rc'>
                        Ritual 
                        <input 
                          type="checkbox"
                          {...register('ritual')}
                        />
                      </div>
                      <div className='customSpellForm__rc'>
                        Concentration 
                        <input 
                          type="checkbox"
                          {...register('concentration',{
                            validate: (value) =>{
                              if(value){
                                setValue('durationType', 'Up to ')
                              }
                            }
                          })}
                        />
                      </div>
                    </div>
                </div>

                <div className='customSpellForm__subtitle'>
{/*SCHOOL*/}
                    <div className='customSpellForm__inputDiv'>
                        { errors.spellSchool && <span className='customSpellForm__errorSpan' >{errors.spellSchool.message}</span>}
                        <select 
                          className={errors.spellSchool?'customSpellForm__input --error':'customSpellForm__input'}
                          style={!watch('spellSchool')? {color: 'grey'}:null}
                          defaultValue={""}
                          {...register('spellSchool',{
                            required: {
                              value: true,
                              message: 'Required *'
                            }
                          })}
                        >
                            <option disabled={true} value="">School</option>
                            <option value="Abjuration">Abjuration</option>
                            <option value="Conjuration">Conjuration</option>
                            <option value="Divination">Divination</option>
                            <option value="Enchantment">Enchantment</option>
                            <option value="Evocation">Evocation</option>
                            <option value="Illusion">Illusion</option>
                            <option value="Necromancy">Necromancy</option>
                            <option value="Transmutation">Transmutation</option>
                        </select>
                    </div>

{/*LEVEL*/}
                    <div className='customSpellForm__inputDiv'>
                        { errors.spellLevel && <span className='customSpellForm__errorSpan' >{errors.spellLevel.message}</span>}
                        <select 
                            className={errors.spellLevel?'customSpellForm__input --error':'customSpellForm__input'}
                            style={!watch('spellLevel')? {color: 'grey'}:null}
                            defaultValue={""}
                            {...register('spellLevel',{
                              required: {
                                value: true,
                                message: 'Required *'
                              }
                            })}
                        >
                            <option disabled={true} value="">Spell level</option>
                            <option value="Cantrip">Cantrip</option>
                            <option value="1st-level">1st Level</option>
                            <option value="2nd-level">2nd Level</option>
                            <option value="3rd-level">3rd Level</option>
                            <option value="4th-level">4th Level</option>
                            <option value="5th-level">5th Level</option>
                            <option value="6th-level">6th Level</option>
                            <option value="7th-level">7th Level</option>
                            <option value="8th-level">8th Level</option>
                            <option value="9th-level">9th Level</option>
                        </select>
                    </div>

{/*CLASSES*/}
                    <div className='customSpellForm__inputDiv'>
                        {errors.spellClass && <span className='customSpellForm__errorSpan'>{errors.spellClass.message}</span>}
                        <Controller
                          name="spellClass"
                          control={control}
                          rules={{ required: 'At least one class is required *' }}
                          render={({ field }) => (
                            <select 
                                value=''
                                style={!watch('spellClass')? {color: 'grey'}:null}
                                className={errors.spellClass?'customSpellForm__input --error --medium':'customSpellForm__input --medium'} 
                                onChange={(e)=>{
                                  handleClassChange(e.target.value);
                                }} 

                            >
                                <option disabled={true} value="">{spellClass.length===0 ?'Classes': spellClass.join(', ')}</option>
                                <option value="Artificer" >Artificer</option>
                                <option value="Bard">Bard</option>
                                <option value="Cleric">Cleric</option>
                                <option value="Druid">Druid</option>
                                <option value="Paladin">Paladin</option>
                                <option value="Ranger" >Ranger</option>
                                <option value="Ritual Caster">Ritual caster</option>
                                <option value="Sorcerer">Sorcerer</option>
                                <option value="Warlock">Warlock</option>
                                <option value="Wizard">Wizard</option>
                            </select>
                          )}
                        />
                    </div>
                </div>
              </div>
            </header>

          <div className='customSpellForm__body' > 
            <div className='customSpellForm__gridWrapper'>

{/*CASTING TIME*/}
              <div className='customSpellForm__gridItem1 --customBorder'>
                <b>Casting time </b>
                <div className='customSpellForm__inputDiv' >
                  {errors.castTime && <span className='customSpellForm__errorSpan'>{errors.castTime.message}</span>}
                  <input 
                    type='number'
                    placeholder='Time amount'
                    className={errors.castTime?'customSpellForm__input --error --short':'customSpellForm__input --short'}
                    {...register('castTime', {
                      required: {
                       value: true,
                       message: 'Required *'
                      },
                      validate: (value)=>{
                        if(value >= 0 && value <= 99){
                          return true
                        }

                        return "0 - 99 *"
                      },
                      min:{
                        value: 0,
                        message: "0 - 99 *"
                      },
                      max:{
                        value: 99,
                        message: "0 - 99 *"
                      }
                    })}
                  /> 
                </div>
                
                <div className='customSpellForm__inputDiv'>
                  {errors.castType && <span className='customSpellForm__errorSpan'>{errors.castType.message}</span>}
                  <select 
                    className={errors.castType?'customSpellForm__input --error':'customSpellForm__input'}
                    style={!watch('castType')? {color: 'grey'}:null}
                    defaultValue={""}
                    {...register('castType',{
                      required: {
                        value: true,
                        message: 'Required *'
                      }
                    })}
                    >
                    <option disabled={true} value="">Cast type</option>
                    <option value="minute/s">Minute</option>
                    <option value="hour/s">Hour</option>
                    <option value="Action">Action</option>
                    <option value="Bonus Action">Bonus Action</option>
                    <option value="Reaction">Reaction</option>
                    <option value="No action">No action</option>
                    <option value="Special">Special</option>
                  </select>
                  </div>
                </div>

{/*RANGE*/}
              <div className='customSpellForm__gridItem2 --customBorder'>
                <b>Range </b>
                <div className='customSpellForm__inputDiv'>
                  {errors.rangeType && <span className='customSpellForm__errorSpan'>{errors.rangeType.message}</span>}
                  <select 
                      className={errors.rangeType?'customSpellForm__input --error':'customSpellForm__input'}
                      style={!watch('rangeType')? {color: 'grey'}:null}
                      defaultValue={""}
                      {...register('rangeType',{
                        required: {
                          value: true,
                          message: 'Required *'
                        }
                      })}
                      >
                    <option disabled={true} value="">Type or range</option>
                    <option value="Ranged">Ranged</option>
                    <option value="Unlimited">Unlimited</option>
                    <option value="Self">Self</option>
                    <option value="Touch">Touch</option>
                    <option value="Sight">Sight</option>
                    <option value="Special">Special</option>
                  </select>
                </div>
                <div className='customSpellForm__inputDiv'>
                  {errors.range && <span className='customSpellForm__errorSpan'>{errors.range.message}</span>}
                  <input 
                    type="number" 
                    placeholder='Range amount'
                    className={errors.range?'customSpellForm__input --error --short':'customSpellForm__input --short'}
                    {...register('range', {
                      required: {
                        value: true,
                        message: 'Specify amount *'
                        },
                      validate: (value)=>{
                        if(value >= 0 && value <= 999){
                          return true
                        }
                        return "0 - 999 *"
                      },
                      min: {
                        value: 0,
                        message: '0 - 999 * '
                      },
                      max: 999,
                      message: '0 - 999 * '
                    })}
                    /> 
                </div>
                    <span style={{fontStyle: 'italic'}}>ft.</span>
              </div>

{/*COMPONENTS*/}
              <div className='customSpellForm__gridItem3 --customBorder'><b>Components</b>
                <div className=''>
                {errors.components && <span className='customSpellForm__errorSpan'>{errors.components.message}</span>}
                  <div className='customSpellForm__components'>
                    <label htmlFor='verbal'>
                      Verbal
                      <input 
                        value={'V'} 
                        type="checkbox" 
                        {...register('components', {
                          required: {
                            value: true,
                            message: "At least 1 component is required *"
                          }
                        })}
                      />
                    </label>
                    <label htmlFor='somatic'>
                      Somatic
                      <input
                        value={'S'} 
                        type="checkbox"
                        {...register('components')} 
                      />
                    </label>
                    <label htmlFor='material'>
                      Material 
                      <input 
                        value={'M'} 
                        type="checkbox" 
                        {...register('components')}
                      />
                    </label>
                  </div>
                </div>
              </div>

{/*DURATION*/}
              <div className='customSpellForm__gridItem4 --customBorder'>
                <b>Duration</b>
                <div className='customSpellForm__inputDiv'>
                  {errors.durationType && <span className='customSpellForm__errorSpan'>{errors.durationType.message}</span>}
                  <select 
                      className={errors.durationType?'customSpellForm__input --error':'customSpellForm__input'}
                      defaultValue={""}
                      style={!watch('durationType')? {color: 'grey'}:null}
                      {...register('durationType', {
                        required:{
                          value: true,
                          message: 'Required *'
                        }
                      })}
                  >
                    <option disabled={true} value="">Duration type</option>
                    <option value="Up to ">Time</option>
                    {!watch('concentration') && <option value="Instantaneous">Instantaneous</option>}
                    {!watch('concentration') && <option value="Until dispelled">Until dispelled</option>}
                    {!watch('concentration') && <option value="Until dispelled or triggered">Until dispelled or triggered</option>}
                    {!watch('concentration') && <option value="Special">Special</option>}
                  </select>
                </div>
                <div className='customSpellForm__inputDiv'>
                  {errors.durationTime && <span className='customSpellForm__errorSpan'>{errors.durationTime.message}</span>}
                  { watch('durationType') === 'Up to ' &&
                    <input 
                    type='number' 
                    className={errors.durationTime?'customSpellForm__input --error --short':'customSpellForm__input --short'}
                    defaultValue={0}
                    {...register('durationTime', {
                      validate: (value)=>{
                        if(value > 99 || value < 1){
                          return '1 - 99 *'
                        }
                      },
                      min: {
                        value: 1,
                        message: '1 - 99* '
                      },
                      max: {
                        value: 99,
                        message: '1 - 99* '
                      }
                    })}
                  />}
                </div>
               { watch('durationType') === 'Up to ' &&
                <div className='customSpellForm__inputDiv'> 
                {errors.durationTimeFormat && <span className='customSpellForm__errorSpan'>{errors.durationTimeFormat.message}</span>}
                <select 
                 className={errors.durationTimeFormat?'customSpellForm__input --error':'customSpellForm__input'}
                 defaultValue={""}
                 style={!watch('durationTimeFormat')? {color: 'grey'}:null}
                 {...register('durationTimeFormat',{
                    required:{
                      value: true,
                      message: "Select time format *"
                    }
                 })}
                >
                  <option disabled={true} value="">Time unit</option>
                  <option value="turn/s">Turn/s</option>
                  <option value="second/s">Second/s</option>
                  <option value="minute/s">Minute/s</option>
                  <option value="hour/s">Hour/s</option>
                  <option value="day/s">Day/s</option>
                </select>
               </div>}
              </div>

{/*MATERIALS*/}
              <div className='customSpellForm__gridItem5 --customBorder'>
                <b>Materials:</b>
                {(JSON.stringify(watch('components'), null, 2) && JSON.stringify(watch('components'), null, 2).includes('M'))?
                <div className='customSpellForm__inputDiv'>
                  {errors.materials && <span className='customSpellForm__errorSpan'>{errors.materials.message}</span>}
                  <input 
                    type='text'
                    className={errors.materials?'customSpellForm__input --error --long':'customSpellForm__input --long'}
                    {...register('materials',{
                      required:{
                        value: true,
                        message: 'Required *'
                      }
                    })
                    }
                  />
                  </div>:
                  <dfn>None</dfn>
                  }      
              </div>
            </div>

{/*DESCRIPTION*/}
            <div className='customSpellForm__descriptionDiv'>                
              <div className='customSpellForm__textareaDiv'>
              <b>Description</b>
              {errors.spellDesc && <span className='customSpellForm__errorSpan'>{errors.spellDesc.message}</span>}
                {/* <textarea 
                  className={errors.spellDesc?'customSpellForm__textareaInput --error --longest':'customSpellForm__textareaInput --longest'}
                  {...register('spellDesc',{
                    required:{
                      value: true,
                      message: 'Description required *'
                    },
                    maxLength: {
                      value: 4000,
                      message: 'Maximum characters reaeched *'
                    }
                  })}
                /> */}
              <Controller
                name="spellDesc"
                control={control}
                rules={{
                  required:{
                    value: true,
                    message: 'Description required *'
                  },
                  maxLength: {
                    value: 4000,
                    message: 'Maximum characters reaeched *'
                  },
                  minLength: {
                    value: 20,
                    message: 'Description required *'
                  }
                }}
                theme="snow"
                modules={modules}
                formats={['size', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'indent', 'link']}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    placeholder={"Write a description..."}
                    onChange={(text) => {
                      field.onChange(text);
                    }}
                  />
                )}
              />
              </div>
              <div className='customSpellForm__textareaDiv'>
                <b>At higher level</b>
                  {errors.spellHigherLevel && <span className='customSpellForm__errorSpan'>{errors.spellHigherLevel.message}</span>}
                  <textarea 
                    className={errors.spellHigherLevel?'customSpellForm__textareaInput --error --longest':'customSpellForm__textareaInput --longest'}
                    {...register('spellHigherLevel')}
                  />
              </div>
            </div>
            {createSpellError &&<div className='customSpellForm__errorDiv'>{createSpellError}</div>}
            {isCreated && <div className='customSpellForm__confirmationDiv'>Spell created succesfully</div>}

            <button 
              className={'customSpellForm__submit' + (isLoading?' --submitDisabled':'')}
              disabled={isLoading}
              type='submit'
            >
              CREATE SPELL
            </button>
          </div>
        </form>
    </div>
  )
}
