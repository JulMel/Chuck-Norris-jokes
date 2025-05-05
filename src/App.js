import { useState, useEffect } from "react";

const App = () => {
  const [quote, setQuote] = useState(""); // výchozí quote nechám prázdné

  const url = "https://api.chucknorris.io/jokes/random";

  const getQuote = async () => {
    const response = await fetch(url); // vytáhnu citát z url jako JSON
    const data = await response.json(); // do data uložím citát jako objekt
    const finalQuote = data["value"]; // do finalQuote uložím samotný citát, který je v objektu jako "value"
    setQuote(finalQuote); // finalQuote nastavím jako setQuote pro useState
  };

  useEffect(() => {
    getQuote(); // zavolám funkci - načte citát

    const interval = setInterval(() => {
      getQuote(); // každých 10 vteřin načti nový citát
    }, 15000); // 15 000 milisekund = 10 vteřin

    return () => clearInterval(interval); // úklid, když se komponenta zruší
  }, []); // funkce se spustí pouze jednou po refreshi

  return (
    <div className="container">
      <h1>Vtipy o Chucku Norrisovi</h1>
      <h2>{quote}</h2>
      <button onClick={getQuote}>Další vtip</button>
    </div> // přidám tlačítko pro další vtip
  );
};

export default App;
