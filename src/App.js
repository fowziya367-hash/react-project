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
  date: new Date().toLocaleString(),
};

    setTransactions([...transactions, newTransaction]);
    setIncome("");
    setExpense("");
    alert("✅ Transaction Added Successfully!");
  };
  const totalIncome = transactions.reduce(
  (sum, item) => sum + Number(item.income),
  0
);

const totalExpense = transactions.reduce(
  (sum, item) => sum + Number(item.expense),
  0
);

const foodCount = transactions.filter(
  (item) => item.category === "Food"
).length;

const travelCount = transactions.filter(
  (item) => item.category === "Travel"
).length;

const shoppingCount = transactions.filter(
  (item) => item.category === "Shopping"
).length;

const hour = new Date().getHours();
let greeting = "Good Evening 🌙";

if (hour < 12) {
  greeting = "Good Morning ☀️";
} else if (hour < 18) {
  greeting = "Good Afternoon 🌤️";
}

const [darkMode, setDarkMode] = useState(false);

const balance = totalIncome - totalExpense;
const budget = 1000;
const score =
  totalIncome === 0
    ? 100
    : Math.max(
        0,
        100 -
          (totalExpense / totalIncome) *
            100
      ).toFixed(0);
const goal = 5000; 
const averageExpense =
  transactions.length > 0
    ? (totalExpense / transactions.length).toFixed(2)
    : 0;
    const highestExpense = Math.max(
  ...transactions.map((t) => Number(t.expense)),
  0
);

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
   <h1>💰 Daily Expense Analytics Dashboard</h1>

<p>
  💡 Every rupee saved is a step toward your dreams.
</p>
      <p>📅 Date: {today}</p>
      <h3>🕒 {new Date().toLocaleTimeString()}</h3>
      <p>💡 Save money today, enjoy tomorrow!</p>
      <p>{greeting}</p>
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
       <div
  className="card">💰 Income: ₹{totalIncome}
</div>
       <div className="card">💸 Expense: {totalExpense}</div>
       <div className="card">🏦 Balance: {balance}</div>
       <div className="card">
  ❤️ Expense Health Score:
  {score}/100
</div>
       <div className="card">📊 Average Expense: {averageExpense}</div>
       <div className="card">
        🔥Highest Expense: ₹{highestExpense}
       </div>

       {balance >= 5000 && (
  <h2>🏆 Savings Champion!</h2>
)}
       {totalExpense > budget && (
       <h3 style={{ color: "red" }}>
        ⚠️ Budget Limit Exceeded!
       </h3>
       )}
       <p>
  Expense:{" "}
  {totalIncome > 0
    ? ((totalExpense / totalIncome) * 100).toFixed(1)
    : 0}
  %
</p>
       <h3>Expense Percentage</h3>
        <progress
          value={totalExpense}
          max={totalIncome || 1}
          style={{ width: "100%", height: "20px" }}
>       </progress>    
        <h3>🎯 Saving Goal ₹5000</h3>

        <progress
        value={balance}
        max={goal}
        style={{
        width: "100%",
        height: "20px",
  }}
>      </progress>    
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

{transactions.length === 0 && (
  <h3>No Transactions Yet 😔</h3>
)}

      {transactions.map((item, index) => (
       <div
  key={index}
  className="transaction"
  style={{
    backgroundColor: darkMode
      ? "rgba(255,255,255,0.1)"
      : "rgba(255,255,255,0.8)",
    color: darkMode ? "white" : "black",
  }}
>
          Income: {item.income} |
          Expense: {item.expense} |
          Category: {item.category}
          📅 {item.date}
          <button onClick={() => deleteTransaction(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;