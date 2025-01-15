import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmpList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/get_all_employees');
      setEmployees(response.data.employees);
    } catch (err) {
      setError('Failed to fetch employees. Please try again later...');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmpData = () => {
    navigate('/create_emp');
  };

  const handleEdit = (id) => {
    navigate(`/edit_employee/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/delete_employee/${id}`);
        if (response.status === 200) {
          setEmployees(employees.filter((emp) => emp._id !== id));
          alert('Employee deleted successfully');
        }
      } catch (err) {
        alert('Failed to delete employee');
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/view_employee/${id}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Employee List</h1>
      <div className="mb-3 text-center">
        <button className="btn btn-success" onClick={handleEmpData}>
          Create Employee
        </button>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {employees.length > 0 ? (
        <div className="row">
          {employees.map((employee) => (
            <div key={employee._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p><strong>Name:</strong> {employee.name}</p>
                  <p><strong>Email:</strong> {employee.email}</p>
                  <p><strong>Mobile:</strong> {employee.mobile}</p>
                  <p><strong>Gender:</strong> {employee.gender}</p>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => handleEdit(employee._id)} className="btn btn-primary">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(employee._id)} className="btn btn-danger">
                      Delete
                    </button>
                    <button onClick={() => handleViewDetails(employee._id)} className="btn btn-warning">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No Employees Found.</p>
      )}
    </div>
  );
}

export default EmpList;
