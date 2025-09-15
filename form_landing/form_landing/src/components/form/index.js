import { useState } from 'react';
import { submitFormData } from '../../data';
import '../../styles/Form.css';

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
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await submitFormData(formData);
      setSuccess(true);
      setFormData({}); // Reset form
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
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
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
          <label htmlFor="veteran_status">Veteran Status</label>
          <select
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
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="income_range">Income Range</label>
          <select
            id="income_range"
            name="income_range"
            value={formData.income_range}
            onChange={handleChange}
          >
            <option value="">Select Income Range</option>
            <option value="0-25000">$0 - $25,000</option>
            <option value="25001-50000">$25,001 - $50,000</option>
            <option value="50001-75000">$50,001 - $75,000</option>
            <option value="75001-100000">$75,001 - $100,000</option>
            <option value="100001+">$100,001+</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="previous_homebuyer"
              checked={formData.previous_homebuyer}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                previous_homebuyer: e.target.checked
              }))}
            />
            Previous Homebuyer
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Form submitted successfully!</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Form;
