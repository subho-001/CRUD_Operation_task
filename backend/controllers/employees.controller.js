const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { CreateEmployee } = require('../model/employees.model');
dotenv.config()


const createEmployee =async(req, res)=>{
    try {
        let {name, email, mobile, gender} =req.body;

        console.log("body", req.body);


        if(!name || !email || !mobile || !gender) {
            return res.status(400).json({message:"All fields are required"}) 
        }

        let isEmailExist = await CreateEmployee.findOne({email});

        if(isEmailExist) {
            return res.status(400).json({message:"Employee is already exist with this Email id!"})
        }

        let isMobileExist = await CreateEmployee.findOne({mobile});

        if(isMobileExist) {
            return res.status(400).json({message:"Employee is already exist with this mobile number!"})
        }

        let createdEmployee = await CreateEmployee.create({name, email, mobile, gender});
        
        console.log("createEmployee", createdEmployee);
        
        res.status(200).json({message:"Employee created successfully", createdEmployee})
        
    } catch(err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

const editEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { email } = req.body;

        // Check for duplicate email
        const existingEmployee = await CreateEmployee.findOne({ email });
        if (existingEmployee && existingEmployee._id.toString() !== employeeId) {
            return res.status(400).json({
                error: true,
                message: 'Email already exists for another employee',
            });
        }

        const updatedEmployee = await CreateEmployee.findByIdAndUpdate(
            employeeId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: true, message: 'Employee not found' });
        }

        res.status(200).json({
            error: false,
            message: 'Employee updated successfully',
            employee: updatedEmployee,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                error: true,
                message: 'Duplicate key error: Email must be unique',
            });
        }
        res.status(500).json({ error: true, message: 'Server error', details: err.message });
    }
};


// Delete Employee Controller
const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        console.log("deleting employee with id:", employeeId);

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ error: true, message: 'Invalid employee ID' });
        }
        
        const deletedEmployee = await CreateEmployee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ error: true, message: 'Employee not found' });
        }

        res.status(200).json({ error: false, message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
};

module.exports = { createEmployee, deleteEmployee, editEmployee};
