export default function Sidebar(){
    return(
        <div className="sidebar">
            <h2 className="sidebar-title">Finance</h2>
            <nav className="sidebar-nav">
                <a href="/dashboard">Dashboard</a>
                <a href="/transactions">Transactions</a>
                <a href="/insights">Insights</a>
                <a href="/settings">Settings</a>
            </nav>
        </div>
    )
}