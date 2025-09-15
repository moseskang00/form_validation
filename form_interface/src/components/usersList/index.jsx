import { useState } from 'react';
import { onGetAllFormData } from '../../data';
import './index.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await onGetAllFormData();
            setUsers(data);
        } catch (err) {
            setError(err.message || 'Error on get All call');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="users-list-container">
            <div className="users-list-header">
                <h1>Users List</h1>
                <button 
                    className="search-button" 
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="table-container">
                <table className="users-table">
                    <thead className="thead-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Veteran Status</th>
                            <th>Income Range</th>
                            <th>Previous Homebuyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.formID}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.veteran_status}</td>
                                <td>{user.income_range}</td>
                                <td>{user.previous_homebuyer ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="8" className="no-data">
                                    No data available. Click search to load users.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersList;