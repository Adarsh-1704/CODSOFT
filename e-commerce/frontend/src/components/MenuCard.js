import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function MenuCard(props) {
  
  let options = props.options;
  let priceOptions = Object.keys(options)
  let foodItem = props.foodItem

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  let dispatch = useDispatchCart()
  let data = useCart()
  const priceRef = useRef()

  const handleAddToCart = async() => {

    let food = []
    for(const item of data) {
      if(item.id === foodItem._id && item.size === size) {
        console.log(item.name)
        food = item;
        break;
      }
    }

    if(food !== []) {
      if(food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size})
        console.log("update")
        return
      } 
        else if(food.size !== size) {
          await dispatch({type:"ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img})
          console.log("add")
      return
      }
      return
    }
    
    // await dispatch({type:"ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size})

    // console.log(data)
  }

  let finalPrice = qty * parseInt(options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div className="card mt-3" style={{ width: "100%", maxHeight: "100%" }}>
        <img src={foodItem.img} className="card-img-top w-20" style={{height:"160px", objectFit: "fill"}} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          {/* <p className="card-text">This is some text</p> */}
          <div className="w-120">
            <select className="m-2 h-100 bg-danger rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-danger rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>
            <div className="d-inline h-100 fs-5">
              ₹{finalPrice}/-
            </div>
          </div>
        <hr />
        <button className="btn btn-danger justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
