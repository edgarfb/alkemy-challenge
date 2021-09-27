import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import LogIn from "./components/LogIn/LogIn";

const token = "1621075358241982";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE";
const baseUrl = `https://superheroapi.com/api/1621075358241982/search/batman`;
// const baseUrl = `https://superheroapi.com/api/${token}/search/batman`;
// const baseUrl = `http://challenge-react.alkemy.org?email=challenge@alkemy.org&password=react`;
// const baseUrl = "https://jsonplaceholder.typicode.com/posts";

function App() {
  return (
    <div className="container toCenter">
      <LogIn />
    </div>
  );
}

export default App;
