// src/contexts/AuthContext.tsx

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { TUser } from '@/types/user'
import { toast } from 'sonner'

interface AuthContextType {
    user: User | null
    profile: TUser | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<TUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) console.error('Erreur récupération session', error)
            if (session?.user) {
                setUser(session.user)
                fetchUserProfile(session.user.id)
            }
            setLoading(false)
        }

        getSession()

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                setUser(session.user)
                fetchUserProfile(session.user.id)
            }
            if (event === 'SIGNED_OUT') {
                setUser(null)
                setProfile(null)
            }
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    const fetchUserProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles') // ta table contenant les profils
            .select('*')
            .eq('user_id', userId)
            .single()

        if (error) {
            console.error('Erreur récupération profil', error)
        } else {
            setProfile(data)
        }
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            console.error('Erreur connexion', error)
            throw error
        }

        if (data.session?.user) {
            setUser(data.session.user)
            await fetchUserProfile(data.session.user.id)
        }
        setLoading(false)
    }

    const signOut = async () => {
        const signOutPromise = async () => {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            setUser(null)
            setProfile(null)
        }

        toast.promise(
            signOutPromise(),
            {
                loading: 'Déconnexion en cours...',
                success: 'Déconnecté avec succès ✅',
                error: 'Erreur lors de la déconnexion ❌',
            }
        )
    }


    return (
        <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth doit être utilisé à l’intérieur de AuthProvider')
    }
    return context
}
