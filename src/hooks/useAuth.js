import { getToken } from '../lib/storage'
import { useSyncExternalStore } from 'react'


function subscribe(callback) {
    const handler = () => callback()
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
}
function getSnapshot() { return !!getToken() }
function getServerSnapshot() { return false }

export function useAuth() {
    const isAuthed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    return { isAuthed }
}
