import {createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload};
        case 'LOGOUT':
            return {user: null};
        default:
            return state
    }
}

export const AuthContextProvider = ( {children} )=> {  //{children} represents all the components that AuthContextProvider wraps

    const [state, dispatch] = useReducer(authReducer, {user: null})

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type:'LOGIN',payload: user})
        }
    },[])

    console.log('AuthContext state:', state)




return (
        <AuthContext.Provider value ={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>

)
}

/*
1) Se crea un contexto -> const AuthContext = createContext();
AuthContext es un COMPONENTE que puede PROVEER INFORMACION (datos, funciones, state/useState, etc..)
Este componente tiene el metodo ".provider" para proveer dicha informacion 
La informacion se guarda en sus props, en este caso llamada "value={data enviada}"
 
2) Este componente AuthContext es retornado por OTRO COMPONENTE -> AuthContextProvider = ({children}) =>{}
El parametro {children} hace referencia a TODOS LOS COMPONENTES HIJOS que <AuthContext.Provider> va a envolver
  
3) <AuthContextProvider> va a ser importado para envolver a nuestro componente <App>, dandole acceso a lo que hayamos guardado en "value={data enviada}"
  
4) Para acceder a los valores de este contexto se usa useContext()
En cualquier componente hijo de nuestro provider podemos llamar "const context = useContext(AuthContext)"
 */