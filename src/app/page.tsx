'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { authClient } from '@/db/auth-client'

function Home() {
  const { data: session } = authClient.useSession() 
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = async () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
    onError: () => {
      window.alert('Error creating user')
    },
    onSuccess: () => {
      window.alert('User created successfully')
    }
    

  }
  
  )
  }
  if (session) {
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <h1>Welcome, {session.user.name}</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }
  return (
<div className='flex flex-col items-center justify-center h-screen gap-4'>
  <Input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
  <Input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
  <Input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
  <Button onClick={onSubmit}>Create User</Button>
</div>
  )
}

export default Home
