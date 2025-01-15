import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/get_employee/${id}`);
      setEmployee(response.data.employee);
    } catch (err) {
      setError('Failed to fetch employee details. Please try again later...');
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card p-4 shadow-sm">
            <h1 className="text-center mb-4">Employee Details</h1>
            <div className="mb-3">
              <p><strong>Name:</strong> {employee.name}</p>
            </div>
            <div className="mb-3">
              <p><strong>Email:</strong> {employee.email}</p>
            </div>
            <div className="mb-3">
              <p><strong>Mobile:</strong> {employee.mobile}</p>
            </div>
            <div className="mb-3">
              <p><strong>Gender:</strong> {employee.gender}</p>
            </div>
            <div className="d-flex justify-content-center">
              <button onClick={handleBackToList} className="btn btn-secondary">Back to Employee List</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
