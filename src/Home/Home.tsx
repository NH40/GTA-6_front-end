/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from "./Home.module.css"

const isSuccess = false

interface IFromState {
  name: string
  email: string
}

function Home() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {register, handleSubmit, reset} = useForm<IFromState>()

  const onSubmit: SubmitHandler<IFromState> = async (data) => {
    setIsLoading(true)
    try {
      const res = axios.post("http://localhost:5000/api", data)
      if(!res) return
      
      setIsSuccess(true)
      reset()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>

      {isSuccess ? 
      <div className={styles.success}>Форма отправлена</div>
      : 
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>GTA 6 - Оставь свою заявку</h1>
        <input type="name" placeholder='Введите Имя:' {...register("name")}/>
        <input type="email" placeholder='Введите Email:' {...register("email")}/>
        <button disabled={isLoading}>{isLoading ? "Загрузка" : "Хочу ГТА!"}</button> 
      </form>}
    </div>
  )
}

export default Home
