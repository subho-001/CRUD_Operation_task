import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateEmployee() {
    const isValidName = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})*$/;
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidMobile = /^[6-9]\d{9}$/;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const submittingData = async (data) => {
        console.log("Form Data:", data);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("gender", data.gender);

        try {
            const response = await axios.post('http://localhost:3000/api/create_emp', formData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            if (response.status === 200) {
                alert('Employee details added successfully!');
                navigate('/');
            }
        } catch (error) {
            if(error.response) {
                alert(error.response.data.message)
            } else if(error.request) {
                alert("error occure while connecting the server", error.message)
            } else {
                console.error(error);
                alert('An error occurred while submitting the form');
            }
        }
    };

    const handleBackToList = () => {
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit(submittingData)} className="border p-4 rounded shadow">
                <h2 className="text-center mb-4">Create Employee</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        {...register("name", {
                            required: { value: true, message: "*Employee name is required" },
                            pattern: { value: isValidName, message: "*Enter a valid name" }
                        })}
                    />
                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        {...register("email", {
                            required: { value: true, message: "*Employee email is required" },
                            pattern: { value: isValidEmail, message: "*Enter a valid email ID" }
                        })}
                    />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile No.</label>
                    <input
                        id="mobile"
                        type="text"
                        className="form-control"
                        {...register("mobile", {
                            required: { value: true, message: "*Mobile number is required" },
                            pattern: { value: isValidMobile, message: "*Enter a 10-digit valid mobile number" }
                        })}
                    />
                    {errors.mobile && <div className="text-danger">{errors.mobile.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                        <label className="form-check-label me-3">
                            <input
                                type="radio"
                                value="Male"
                                className="form-check-input"
                                {...register("gender", { required: "*Gender is required" })}
                            />
                            Male
                        </label>
                        <label className="form-check-label me-3">
                            <input
                                type="radio"
                                value="Female"
                                className="form-check-input"
                                {...register("gender", { required: "*Gender is required" })}
                            />
                            Female
                        </label>
                    </div>
                    {errors.gender && <div className="text-danger">{errors.gender.message}</div>}
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Create Employee</button>
                </div>
            </form>
            <div className="mt-3">
                <button type="button" className="btn btn-secondary" onClick={handleBackToList}>Back to Employee List</button>
            </div>
        </div>
    );
}

export default CreateEmployee;
