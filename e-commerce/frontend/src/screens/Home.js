import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuCard from "../components/MenuCard";

export default function Home() {
  const [search, setSearch] = useState("")
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const localData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    localData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1508736793122-f516e3ba5569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YnVyZ2VyfHx8fHx8MTY5NDI2ODYxMg&ixlib=rb-4.0.3&q=80&w=1080"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1530006261244-0ae043004358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGFzdHJ5fHx8fHx8MTY5NDI2ODU4MQ&ixlib=rb-4.0.3&q=80&w=1080"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFyYmVxdWV8fHx8fHwxNjk0MjY4NjMz&ixlib=rb-4.0.3&q=80&w=1080"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem
                        .filter(
                          (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                        )
                        .map((filterItem) => {
                          return (
                            <div
                              key={filterItem._id}
                              className="col-10 col-md-6 col-lg-3"
                            >
                              <MenuCard
                                foodItem = {filterItem}
                                options={filterItem.options[0]}
                              />
                            </div>
                          );
                        })}
                </div>
              );
            })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
