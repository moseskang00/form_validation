import { useState } from 'react';
import { onSubmitFormData } from '../../data';
import './index.css';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        veteran_status: '',
        age: '',
        income_range: '',
        previous_homebuyer: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // making this thing async
        setLoading(true);
        setSuccess(false);

        try {
            console.log("Moses kang making sure formData", formData);
            await onSubmitFormData(formData);
            setSuccess(true);
            setFormData({});
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                        className="form-input"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                        className="form-input"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Veteran Status</label>
                    <select
                        className="form-select"
                        id="veteran_status"
                        name="veteran_status"
                        value={formData.veteran_status}
                        onChange={handleChange}
                    >
                        <option value="">Select Veteran Status</option>
                        <option value="veteran">Veteran</option>
                        <option value="non_veteran">Non-Veteran</option>
                        <option value="active_duty">Active Duty</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                        className="form-input"
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="0"
                        max="120"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Income Range</label>
                    <select
                        className="form-select"
                        id="income_range"
                        name="income_range"
                        value={formData.income_range}
                        onChange={handleChange}
                    >
                        <option value="">Select Income Range</option>
                        <option value="0-100">$0-100</option>
                        <option value="101-150">$101-150</option>
                        <option value="151-200">$151-200</option>
                    </select>
                </div>

                <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        id="previous_homebuyer"
                        name="previous_homebuyer"
                        checked={formData.previous_homebuyer}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            previous_homebuyer: e.target.checked
                        }))}
                    />
                    <label className="form-label">Previous Homebuyer</label>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Form submitted successfully!</div>}
                
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Form;