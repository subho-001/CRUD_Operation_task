const mongoose = require('mongoose')

const createEmployeeSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    mobile:{type:String,required:true},
    gender:{type:String, required:true},
},{timestamps:true})


const CreateEmployee = mongoose.model('CreateEmployee',createEmployeeSchema);

module.exports = {
    CreateEmployee
}
