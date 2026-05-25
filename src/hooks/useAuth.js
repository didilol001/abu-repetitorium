import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

const SESSION_KEY = 'abu_session'

function loadSession() {
  try {
    return localStorage.getItem(SESSION_KEY) || null
  } catch {
    return null
  }
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(loadSession)

  async function login(username, password) {
    const { data, error } = await supabase
      .from('users')
      .select('password')
      .eq('username', username)
      .single()

    if (error || !data) return 'Benutzername nicht gefunden.'
    if (data.password !== password) return 'Falsches Passwort.'

    localStorage.setItem(SESSION_KEY, username)
    setCurrentUser(username)
    return null
  }

  async function register(username, password) {
    if (!username.trim()) return 'Benutzername darf nicht leer sein.'
    if (!password) return 'Passwort darf nicht leer sein.'

    const { error } = await supabase
      .from('users')
      .insert({ username, password })

    if (error) {
      if (error.code === '23505') return 'Benutzername bereits vergeben.'
      return 'Fehler beim Registrieren. Bitte erneut versuchen.'
    }

    localStorage.setItem(SESSION_KEY, username)
    setCurrentUser(username)
    return null
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
  }

  return { currentUser, login, register, logout }
}
