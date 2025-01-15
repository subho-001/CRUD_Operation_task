const express = require('express')
const { createEmployee, editEmployee, deleteEmployee} = require('../controllers/employees.controller')

const { CreateEmployee } = require('../model/employees.model');
const router = express.Router();

router.use(express.json());

router.post('/create_emp',(req,res,next)=>{
    console.log('request body', req.body);
    next();
}, createEmployee)

router.get('/get_all_employees', async (req,res)=>{
    try{
        const employees = await CreateEmployee.find();
        
        res.status(200).json({error:false, employees})
    } catch(err) {
        res.status(500).json({error:true, message:err.message})
    }
});

router.get('/get_employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await CreateEmployee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: true, message: 'Employee not found' });
        }
        return res.status(200).json({ error: false, employee });
    } catch (err) {
        return res.status(500).json({ error: true, message: err.message });
    }
});

router.put('/edit_employee/:id', editEmployee);
router.delete('/delete_employee/:id', deleteEmployee);

module.exports = router;

