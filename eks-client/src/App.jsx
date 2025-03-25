import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [sayi1, setSayi1] = useState(0);
  const [sayi2, setSayi2] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/add", {
        num1: Number(sayi1),
        num2: Number(sayi2),
      });
      console.log(response.data);
      setResponseMessage(`Sonuç: ${response.data.data.result}`);
    } catch (error) {
      setResponseMessage(
        `Hata: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="form-container">
      <h1>İki Sayıyı Gönder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sayı 1:</label>
          <input
            type="number"
            value={sayi1}
            onChange={(e) => setSayi1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sayı 2:</label>
          <input
            type="number"
            value={sayi2}
            onChange={(e) => setSayi2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Gönder</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
