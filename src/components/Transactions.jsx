import { API_URL, authHeader } from "../utils/api.js";

export default function Transactions({ transactions = [], reload, startEdit , remove}) {

  

  return (
    <div className="section">
      <h2>Your Transactions</h2>

      {transactions?.map(t => (
        <div key={t.id} className="transaction-item">
          {t.date} — {t.type} — {t.category} — ${t.amount}

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => startEdit(t)}
          >
            Edit
          </button>

          <button
            style={{ marginLeft: "10px", color: "red" }}
            onClick={() => remove(t)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
