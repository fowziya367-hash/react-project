import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const today = new Date().toLocaleDateString();
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
  const savedData = localStorage.getItem("transactions");

  if (savedData) {
    setTransactions(JSON.parse(savedData));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);

  const deleteTransaction = (indexToDelete) => {
  setTransactions(
    transactions.filter((_, index) => index !== indexToDelete)
  );
  };

  const addTransaction = () => {
    const newTransaction = {
      income,
      expense,
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setIncome("");
    setExpense("");
  };
  const totalIncome = transactions.reduce(
  (sum, item) => sum + Number(item.income),
  0
  );

const totalExpense = transactions.reduce(
  (sum, item) => sum + Number(item.expense),
  0
);
const [darkMode, setDarkMode] = useState(false);

const balance = totalIncome - totalExpense;
const foodCount = transactions.filter(
  (item) => item.category === "Food"
).length;

const travelCount = transactions.filter(
  (item) => item.category === "Travel"
).length;

const shoppingCount = transactions.filter(
  (item) => item.category === "Shopping"
).length;

 return (
    <div
    className="container"
    style={{
    padding: "20px",
    backgroundColor: darkMode ? "black" : "white",
    color: darkMode ? "white" : "black",
    minHeight: "100vh",
  }}
>
  <button onClick={() => setDarkMode(!darkMode)}>
    Toggle Dark Mode
  </button>
      <h1>Daily Expense Analytics Dashboard</h1>
      <p>Date: {today}</p>
      <input
        type="number"
        placeholder="Enter Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Enter Expense"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <br /><br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
      </select>

      <br /><br />

      <button
        onClick={addTransaction}
        style={{
        backgroundColor: "green",
        color: "white",
        marginRight: "10px"
        }}
>
       Add Transaction
      </button>
    <button
      onClick={() => setTransactions([])}
      style={{
      backgroundColor: "red",
      color: "white"
      }}
>
      Clear All
    </button>
      <div className="summary"
         style={{
         backgroundColor: darkMode ? "#333" : "#f4f4f4",
         color: darkMode ? "white" : "black",
         }}
  >
        <h2>Summary</h2>
         <div className="card">💰 Income: {totalIncome}</div>
         <div className="card">💸 Expense: {totalExpense}</div>
         <div className="card">🏦 Balance: {balance}</div>
          <p>Total Transactions: {transactions.length}</p>

      </div>
        <h2>Category Stats</h2>

          <p>Food Transactions:
           {foodCount}
          </p>

          <p>Travel Transactions:
           {travelCount}
          </p>

          <p>Shopping Transactions:
           {shoppingCount}
          </p>
         


<h2>Transactions</h2>

      {transactions.map((item, index) => (
        <div key={index} className="transaction"
         style={{
         backgroundColor: darkMode ? "#333" : "#f4f4f4",
         color: darkMode ? "white" : "black",
         }}>
          Income: {item.income} |
          Expense: {item.expense} |
          Category: {item.category}
          <button onClick={() => deleteTransaction(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;