<template>
    <div class='employee-form-container'>
        <h1>Employee Registration Form</h1>
    <form class='employee-form'>
        <!--First Name input-->
        <div>
        <label 
        for='first-name'
        >First name:</label
        >
        <input 
        type='text' 
        class='first-name'
        name='first-name'
        id='first-name'
        maxlength='30'
        size='30'
        pattern='[A-Z]{1}[a-z]{0,29}'
        title='A name containing only letters starting with a capital letter. No more than 30 characters'
        v-model='employee.first_name'
        required
        />
        </div>

        <!--Last Name input-->
        <div>
        <label 
        for='last-name'
        >Last Name:</label
        >
        <input 
        type='text' 
        class='last-name'
        name='last-name'
        id='last-name'
        maxlength='30'
        size='30'
        pattern='[A-Z]{1}[a-z]{0,29}'
        title='A name containing only letters starting with a capital letter. No more than 30 characters'
        v-model='employee.last_name'
        required
        />
        </div>

        <!--Address input-->
        <div>
        <label 
        for='address'
        >Address:</label
        >
        <input 
        type='text' 
        class='address'
        name='address'
        id='address'
        maxlength='55'
        size='30'
        title='An address with maximum 55 characters'
        v-model='employee.address'
        required
        />
        </div>

        <!--Telephone input-->
        <div>
        <label 
        for='telephone'
        >Telephone:</label
        >
        <input 
        type='tel' 
        class='telephone'
        name='telephone'
        id='telephone'
        maxlength='15'
        size='30'
        pattern='[0-9]{4,15}'
        title='A phone number, maximum 15 characters'
        v-model='employee.phone'
        required
        />
        </div>

        <!--Department selection-->
        <div>
        <label 
        for='department'
        >Department:</label
        >
        <select 
        class='department'
        name='department'
        id='department'
        v-model='employee.department'
        required
        >
        <option value='Sales'>Sales</option>
        <option value='Human Resources'>Human Resources</option>
        <option value='IT'>IT</option>
        <option value='Logistics'>Logistics</option>
        <option value='Accounting'>Accounting</option>
        </select>
        </div>

        <!--Position input-->
        <div>
        <label 
        for='position'
        >Position:</label
        >
        <input 
        type='text' 
        class='position'
        name='position'
        id='position'
        maxlength='30'
        size='30'
        v-model='employee.position'
        required
        />
        </div>

        <!--Salary input-->
        <div>
        <label 
        for='salary'
        >Salary:</label
        >
        <input 
        type='number' 
        class='salary'
        name='salary'
        id='salary'
        min='0'
        v-model='employee.salary'
        required
        />
        </div>

        <!--Age input-->
        <div>
        <label 
        for='age'
        >Age:</label
        >
        <input 
        type='number' 
        class='age'
        name='age'
        id='age'
        min='18'
        max='100'
        v-model='employee.age'
        required
        />
        </div>

        <button @click.prevent='saveEmployee()'>Register Employee</button>
    </form>
    </div>
</template>

<script>
// Imports the functions that call the axios HTTP methods
import EmployeeDataService from "../service/employeesDataService";

// Imports the validation for the inputs
import {validateName, 
        validateAddress, 
        validatePhone, 
        validateDepartment, 
        validatePosition,
        validateSalary,
        validateAge } from '../scripts/validation';

export default {
    name: 'EmployeeForm',
    data() {
        return {
            employee: {
                id: '',
                first_name: '',
                last_name: '',
                address: '',
                phone: '',
                department: '',
                position: '',
                salary: '',
                age: '',
                createdOn: '',
                updatedOn: ''
            }
        };
    },
    methods: {
        // Checks the input data and calls for the axios post method to create a new employee in the database 
        saveEmployee() {
            const data = {};

            // Checks if all the fields are filled in
            if (!this.employee.first_name ||
                !this.employee.last_name ||
                !this.employee.address ||
                !this.employee.phone ||
                !this.employee.department ||
                !this.employee.position ||
                !this.employee.salary ||
                !this.employee.age) {
                    alert('All fields must be filled');
                    return;
                }

            // Validates the input data
            validateName(this.employee.first_name, data, 'first_name');
            validateName(this.employee.last_name, data, 'last_name');
            validateAddress(this.employee.address, data);
            validatePhone(this.employee.phone, data);
            validateDepartment(this.employee.department, data);
            validatePosition(this.employee.position, data);
            validateSalary(this.employee.salary, data);
            validateAge(this.employee.age, data);


            // Calls for the axios post method
            EmployeeDataService.create(data)
            .then(res =>{
                this.employee.id = res.data.id;
                this.clearInput();
                alert(`Employee ${res.data.first_name} ${res.data.last_name} has been created with an ID of ${res.data.id}`);
            })
            .catch(e => {
                console.log(e.message + ': ' + e.response.statusText + ' - ' + e.response.data.message);
            });
        },
        // Clears the properties from this.employee and thus clearing the input fields
        clearInput() {
            this.employee = {};
        }
    }
};
</script>

<style scoped>
.employee-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, 500px);
    justify-content: space-evenly;
    border: 5px solid #24308b;
    border-radius: 25px;
      background-color: #4f99af;
}

h1 {
    color: #fff;
    text-shadow: 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
    -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
    -2px 0px 0 #000000, 0px -2px 0 #000000, -3px 3px 2px rgba(206,89,55,0);
}

label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
    -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
    -2px 0px 0 #000000, 0px -2px 0 #000000, -3px 3px 2px rgba(0, 0, 0, 0);
}

button {
    grid-column: 1/3;
}
</style>