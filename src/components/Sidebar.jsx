import { Link } from "react-router-dom"
export default function Sidebar(){
    return(
        <div className="sidebar">
            <h2 className="sidebar-title">Finance</h2>
            <nav className="sidebar-nav">
                <Link to={'/dashboard'}>Dashboard</Link>
                <Link to={'/transactions'}>Transactions</Link>
                <Link to={'/insights'}>Insights</Link>
                <Link to={'/settings'}>Settings</Link>
            </nav>
        </div>
    )
}