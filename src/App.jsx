import { createSignal, createEffect } from 'solid-js'

import dividerMbl from './assets/images/pattern-divider-mobile.svg'
import dividerDsk from './assets/images/pattern-divider-desktop.svg'
import diceIcon from './assets/images/icon-dice.svg'

export default function App() {
  const [advice, setAdvice] = createSignal()
  const [animation, setAnimation] = createSignal(false)
  const [animationType, setAnimationType] = createSignal('card-change-top')

  const randomAdvice = async () => {
    try {
      let res = await fetch('https://api.adviceslip.com/advice')
      let data = await res.json()
      setAdvice(data.slip)
    }
    catch(err) {
      console.log('Error: -->', err)
    }
  }

  const animationControl = () => {
    setAnimation(true)
    const randomNum = Math.floor(Math.random()*8)
    switch(randomNum){
      case 0:
        setAnimationType('card-change-top')
        break
      case 1:
        setAnimationType('card-change-right')
        break
      case 2:
        setAnimationType('card-change-bottom')
        break
      case 3:
        setAnimationType('card-change-left')
        break
      case 4:
        setAnimationType('card-change-top-right')
        break
      case 5:
        setAnimationType('card-change-bottom-right')
        break
      case 6:
        setAnimationType('card-change-bottom-left')
        break
      case 7:
        setAnimationType('card-change-top-left')
        break
      default:
        setAnimationType('card-change-top')
    }
    setTimeout(()=>{
      setAnimation(false)
    }, 2000)
  }

  createEffect(()=>{
    animationControl()
    randomAdvice()
  })

  return (
    <article class={animation()?`advice ${animationType()}`:"advice"}>
      <h1 class="advice__title">{advice() && `Advice #${advice().id}`}</h1>
      <p class="advice__text">{advice()?`${advice().advice}`:'Loading...'}</p>
      <picture class="advice__divider">
        <source media='(min-width: 1440px)' srcSet={dividerDsk}/>
        <img src={dividerMbl} alt="Divider" />
      </picture>
      <button class="advice__btn" type='button' 
      onClick={()=>{
        animationControl()
        randomAdvice()
      }}>
        <img src={diceIcon} alt="Dice" />
      </button>
      {animation()&&<div class="block-click"></div>}
    </article>
  )
}
