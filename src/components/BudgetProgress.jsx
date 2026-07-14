export default function BudgetProgress({ progress }) {
  if (!progress) return null;

  const monthly = progress.monthly;

  return (
    <div className="section">
      <h2>Budget Progress</h2>

      {/* Monthly Budget */}
      {monthly && (
        <div style={{ marginBottom: 20 }}>
          <h3>Monthly Budget</h3>
          <p>Budget: ${monthly.budget}</p>
          <p>Spent: ${monthly.spent}</p>
          <p>Remaining: ${monthly.remaining}</p>

          <div style={{
            background: "#333",
            height: "10px",
            width: "100%",
            borderRadius: "5px",
            marginTop: "10px"
          }}>
            <div style={{
              background: monthly.exceeded ? "red" : "green",
              height: "10px",
              width: `${monthly.percent}%`,
              borderRadius: "5px"
            }}></div>
          </div>

          {monthly.exceeded && (
            <p style={{ color: "red", marginTop: "10px" }}>
              You exceeded your monthly budget!
            </p>
          )}
        </div>
      )}

      {/* Category Budgets */}
      <h3>Category Budgets</h3>
      {progress.categories.length === 0 && <p>No category budgets set.</p>}

      {progress.categories.map(cat => (
        <div key={cat.category} style={{ marginBottom: 20 }}>
          <strong>{cat.category}</strong>
          <p>Budget: ${cat.budget}</p>
          <p>Spent: ${cat.spent}</p>
          <p>Remaining: ${cat.remaining}</p>

          <div style={{
            background: "#333",
            height: "10px",
            width: "100%",
            borderRadius: "5px",
            marginTop: "10px"
          }}>
            <div style={{
              background: cat.exceeded ? "red" : "green",
              height: "10px",
              width: `${cat.percent}%`,
              borderRadius: "5px"
            }}></div>
          </div>

          {cat.exceeded && (
            <p style={{ color: "red", marginTop: "10px" }}>
              You exceeded your {cat.category} budget!
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
