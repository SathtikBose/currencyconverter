import { useEffect, useState } from "react";

function App() {
  const rates = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "GBP",
    "HKD",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR",
  ];

  const [amount, setAmount] = useState(10);
  const [fromCur, setFromCur] = useState(null);
  const [toCur, setToCur] = useState(null);
  const [response, setResponse] = useState(null);

  async function convertCur() {
    if (fromCur && toCur) {
      const curData = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const curResponse = await curData.json();
      setResponse(curResponse);
      console.log(curResponse);
    }
  }

  return (
    <div className="container">
      <h2 className="text-center my-3">Currency Converter App 🤑</h2>
      <div className="container">
        <input
          type="number"
          className="form-control"
          aria-label="Amount"
          placeholder="Enter the amount"
          value={amount < 0 ? 0 : amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? 0 : parseInt(e.target.value))
          }
        />
        <div className="d-flex justify-content-between">
          <select
            className="form-select my-3"
            aria-label="Default select example"
            onChange={(e) => setFromCur(e.target.value)}
          >
            <option defaultValue={null}>From</option>
            {rates.map((curCode, index) => (
              <option key={index}>{curCode}</option>
            ))}
          </select>
          <select
            className="form-select my-3 mx-3"
            aria-label="Default select example"
            onChange={(e) => setToCur(e.target.value)}
          >
            <option defaultValue={null}>To</option>
            {rates.map((curCode, index) => (
              <option key={index}>{curCode}</option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-success my-3"
            onClick={convertCur}
          >
            Convert
          </button>
        </div>
        {response && (
          <div className="container text-center">
            <h4>Result:</h4>
            <p>
              {amount} {fromCur} = {response.rates[toCur]} {toCur}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
