import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    API.get("/expenses").then(res => setExpenses(res.data));
  }, []);

  const addExpense = async () => {
    const res = await API.post("/expenses", { title, amount });
    setExpenses([...expenses, res.data]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    setExpenses(expenses.filter(e => e._id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Expense Tracker</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" type="number" />
      <button onClick={addExpense}>Add</button>

      <ul>
        {expenses.map(e => (
          <li key={e._id}>
            {e.title} - ${e.amount}
            <button onClick={() => deleteExpense(e._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;