import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state,{id:action.id, name:action.name,qty:action.qty, size:action.size, price:action.price, img:action.img}]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr

        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if(food.id === action.id && food.size === action.size) {
                    arr[index] = {...food, qty: parseInt(action.qty) + parseInt(food.qty), price:  action.price + food.price}
                }
            })
            return arr

        case "DROP":
            let empArr = []
            return empArr
                    
        default:
            console.log("Error in Reducer")
            break;
    }
}

export const CartProvider = ({children}) => {
  
    const [state, dispatch] = useReducer(reducer, [])
  
    return (

        <cartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </cartDispatchContext.Provider>

  )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);