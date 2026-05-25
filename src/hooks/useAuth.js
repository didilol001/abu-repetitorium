import { useState } from 'react'

const USERS_KEY = 'abu_users'
const SESSION_KEY = 'abu_session'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {}
}

function loadSession() {
  try {
    return localStorage.getItem(SESSION_KEY) || null
  } catch {
    return null
  }
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(loadSession)

  function login(username, password) {
    const users = loadUsers()
    if (!users[username]) return 'Benutzername nicht gefunden.'
    if (users[username] !== password) return 'Falsches Passwort.'
    localStorage.setItem(SESSION_KEY, username)
    setCurrentUser(username)
    return null
  }

  function register(username, password) {
    if (!username.trim()) return 'Benutzername darf nicht leer sein.'
    if (!password) return 'Passwort darf nicht leer sein.'
    const users = loadUsers()
    if (users[username]) return 'Benutzername bereits vergeben.'
    users[username] = password
    saveUsers(users)
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
