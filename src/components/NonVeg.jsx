import React from "react";

function NonVeg() {
  // Array of Objects
  const nonVegItems = [
    {
      id: 1,
      name: "Chicken",
      price: 250,
      image: "images/chicken.jpg",
      description: "Fresh farm chicken rich in protein.",
    },
    {
      id: 2,
      name: "Mutton",
      price: 750,
      image: "images/mutton.jpg",
      description: "Premium quality tender mutton.",
    },
    {
      id: 3,
      name: "Fish",
      price: 350,
      image: "images/fish.jpg",
      description: "Fresh sea fish full of Omega-3.",
    },
    {
      id: 4,
      name: "Prawns",
      price: 500,
      image: "images/prawns.jpg",
      description: "Juicy prawns perfect for seafood lovers.",
    },
    {
      id: 5,
      name: "Eggs",
      price: 80,
      image: "images/eggs.jpg",
      description: "Farm fresh eggs packed with protein.",
    },
  ];

  // Convert the array of objects into list items
  const nonVegListItems = nonVegItems.map((item) => (
    <li key={item.id}>
      {item.id} - {item.name} - ₹{item.price} - {item.description} -
      <br />
      <img
        src={item.image}
        alt={item.name}
        width="150"
        height="100"
      />
      <br />
      <button
        onClick={() => console.log(`${item.name} is added into cart`)}
      >
        Add To Cart
      </button>
      <hr />
    </li>
  ));

  return (
    <>
      <h1 style={{color:'red'}}>This is Non-Veg Items Page...</h1>

      <ol>
        {nonVegListItems}
      </ol>
    </>
  );
}

export default NonVeg;