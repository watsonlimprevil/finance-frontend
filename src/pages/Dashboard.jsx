import { useEffect, useState } from "react";
import { API_URL, authHeader } from "../utils/api.js";
import Summary from "../components/Summary.jsx";
import Transactions from "../components/Transactions.jsx";
import CategoryPieChart from "../components/CategoryPieChart.jsx";
import AddTransaction from "../components/AddTransactions.jsx";
import EditTransaction from "../components/EditTransactions.jsx";
import { DeleteConfirm } from "./Delete.jsx";
import MonthlyTrendChart from "../components/MonthlyTrendChart.jsx";
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting , setDeleting] = useState(null)
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState(null)
  const [page , setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages , setTotalPages] = useState(1)
  const [typeFilter , setTypeFilter] = useState('')
  const [categoryFilter , setCategoryFilter] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate , setEndate] = useState('')
  const [sort , setSort] = useState('');
  const [order, setOrder] = useState('desc')
  const [trends, setTrends]= useState([])
  useEffect(() => {
   
      reloadAll()
  
  }, []);

async function reloadAll() {
  setLoading(true);
  setError(null);

  try {
    await loadSummary();   // only summary reloads
    await loadTransactions()
    await loadTrends()
  } catch (error) {
    setError("Failed to load dashboard data");
  } finally {
    setLoading(false);
  }
}


  async function loadSummary() {
    const res = await fetch(`${API_URL}/transactions/summary`, {
      headers: authHeader()
    });
    console.log(res)
    setSummary(await res.json());
  }

  async function loadTransactions() {
    const res = await fetch(`${API_URL}/transactions?page=${page}&limit=${limit}&type=${typeFilter}&category=${categoryFilter}&startDate=${startDate}&endDate=${endDate}&sort=${sort}&order=${order}`, {
      headers: authHeader()
    });
    const data = await res.json();
    setTransactions(data.transactions);
    setTotalPages(Math.ceil(data.total / limit))
  }
  useEffect(() => {
    loadTransactions()
  }, [page])


 async function confirmDelete(){
  await fetch(`${API_URL}/transactions/${deleting.id}`, {
    method: 'DELETE',
    headers: authHeader()
  })
  setDeleting(null)
  reloadAll()
 }
 function cancelDelete() {
  setDeleting(null);
}

async function loadTrends(){
  const res = await fetch(`${API_URL}/transactions/trends` , {
    headers: authHeader()
  });

  const data = await res.json();
  setTrends(data.trends);
}

  // RENDER STATES
  if (loading) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p style={{ color: "white" }}>Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={reloadAll}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
    
      <h1>Dashboard</h1>
    
      <Summary summary={summary} />
      
      <CategoryPieChart data={summary?.byCategory || []} />
      

      <MonthlyTrendChart data={trends}/>
      <AddTransaction reload={reloadAll} />

      <EditTransaction editing={editing} cancel={() => setEditing(null)} reload={reloadAll} />

        <div style={{marginBottom : '20px'}}>
          <select value={typeFilter} onChange={e =>setTypeFilter(e.target.value)}>
            <option value=''>All Types</option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>

          </select>
          <select value={categoryFilter} onChange={e=> setCategoryFilter(e.target.value)}>
         <option value={''}>All Categories</option>
         <option value={'food'}>Food</option>
         <option value={'car'}>Car</option>
         <option value={'rent'}>Rent</option>
          </select>


          <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          placeholder="start date"
          />

          <input
          type="date"
          value={endDate}
          onChange={e=> setEndate(e.target.value)}
          placeholder="end date"
          />

          <select value={sort} onChange={e=> setSort(e.target.value)}>
            <option value=''>Sort By</option>
            <option value={'date'}>Date</option>
            <option value={'amount'}>Amount</option>
          </select>

          <select value={order} onChange={e=> setOrder(e.target.value)}>
            <option value={'desc'}>descending</option>
            <option value={'asc'}>Ascending</option>
          </select>
          <button onClick={()=> loadTransactions()}>Apply</button>
        </div>



      <Transactions
        transactions={transactions}
        reload={reloadAll}
        startEdit={t => setEditing(t)}
        remove={t=> setDeleting(t)}
      />

      <div style={{marginTop :' 20px'}} >
        <button
        disabled={page === 1}
        onClick={()=> setPage(page-1)}
        >
          previous
        </button>
        <span style={{margin : '0 10px'}}>
          Page {page} of {totalPages}
        </span>
        <button
        disabled={page === totalPages}
          onClick={()=> setPage(page+1)}
          > Next
        </button>
      </div>
      <DeleteConfirm
      deleting={deleting}
      cancel={cancelDelete}
      confirm={confirmDelete}
      />
      </div>
  );
}

