import { useState } from 'react'
import './App.css'
import * as data from './data'
import Form from './components/form'
import UsersList from './components/usersList'

function App() {

  return (
    <>
      <div className="card">
        <Form />
        <UsersList />
      </div>
    </>
  )
}

export default App