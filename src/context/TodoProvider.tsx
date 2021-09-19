import React, { createContext, ReactNode, useContext, useState } from 'react'

const Context = createContext({} as IContextValues)
Context.displayName = 'TodoContext'

// Hook
export const useTodoContext = () => useContext(Context)

// HOC
export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<ITodo[]>([])

    return (
        <Context.Provider value={{ todos, setTodos }}>
            {children}
        </Context.Provider>
    )
}

// Interfaces
interface IContextValues {
   todos: ITodo[]
   setTodos: (todos: ITodo[]) => void
}

export interface ITodo {
    content: string
    done: boolean
    id: string
}
