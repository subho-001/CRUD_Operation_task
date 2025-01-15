import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditEmployee() {
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/get_employee/${id}`);
                setEmployee(response.data.employee);
                setLoading(false);
            } catch (error) {
                if(error.response) {
                    alert(error.response.data.message)
                } else if(error.request) {
                    alert("error occure while connecting the server", error.message)
                } else {
                    console.error(error);
                    alert('An error occurred while fetching the data', error.message);
                }
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            name: employee.name,
            email: employee.email,
            mobile: employee.mobile,
            gender: employee.gender,
        };

        try {
            const response = await axios.put(
                `http://localhost:3000/api/edit_employee/${id}`,
                updatedData
            );

            if (response.status === 200) {
                alert('Employee updated successfully!');
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                console.error('Error updating employee:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    const handleBackToList = () => {
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <h2 className="text-center mb-4">Edit Employee</h2>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-control"
                        value={employee.name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control"
                        value={employee.email || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input
                        id="mobile"
                        type="text"
                        name="mobile"
                        className="form-control"
                        value={employee.mobile || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        className="form-select"
                        value={employee.gender || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Update Employee</button>
                </div>
            </form>
            <div className="mt-3">
                <button type="button" className="btn btn-secondary" onClick={handleBackToList}>
                    Back to Employee List
                </button>
            </div>
        </div>
    );
}

export default EditEmployee;
