<template >
    <div>
        <!-- The table for editing an employee -->
        <table>
            <!-- This row displays the names of the properties -->
            <tr>
                <th>ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>ADDRESS</th>
                <th>PHONE</th>
                <th>DEPARTMENT</th>
                <th>POSITION</th>
                <th>SALARY</th>
                <th>AGE</th>
                <th>CREATED ON</th>
                <th>LAST UPDATE ON</th>
                <th class='close-icon' @click='closeEditTab'>
                    <i class="fas fa-times-circle"></i>
                </th>

            </tr>
                <!-- This row displays the current values of the employee who is going to be edited -->
            <tr>
                <td>{{ employee.id }}</td>
                <td>{{ employee.first_name}}</td>
                <td>{{ employee.last_name }}</td>
                <td>{{ employee.employee_address }}</td>
                <td>{{ employee.employee_phone }}</td>
                <td>{{ employee.department }}</td>
                <td>{{ employee.employee_position }}</td>
                <td>{{ employee.employee_salary }}</td>
                <td>{{ employee.employee_age }}</td>
                <td>{{ employee.createdAt }}</td>
                <td>{{ employee.updatedAt }}</td>
            </tr>
                <!-- This row is for the inputs of the changes -->
            <tr>
                <td>{{ employee.id }}</td>

                <!--First Name input-->
                <td>
                    <input 
                    type='text' 
                    class='first-name'
                    name='first-name'
                    id='first-name'
                    maxlength='30'
                    size='30'
                    pattern='[A-Z]{1}[a-z]{0,29}'
                    title='A name containing only letters starting with a capital letter. No more than 30 characters'
                    v-model="updatedEmployee.first_name"
                    />
                </td>

                <!--Last Name input-->
                <td>
                    <input 
                    type='text' 
                    class='last-name'
                    name='last-name'
                    id='last-name'
                    maxlength='30'
                    size='30'
                    pattern='[A-Z]{1}[a-z]{0,29}'
                    title='A name containing only letters starting with a capital letter. No more than 30 characters'
                    v-model="updatedEmployee.last_name"
                    />
                </td>

                <!--Address input-->
                <td>
                    <input 
                    type='text' 
                    class='address'
                    name='address'
                    id='address'
                    maxlength='55'
                    size='30'
                    title='An address with maximum 55 characters'
                    v-model="updatedEmployee.address"
                    />
                </td>

                <!--Telephone input-->
                <td>
                    <input 
                    type='tel' 
                    class='telephone'
                    name='telephone'
                    id='telephone'
                    maxlength='15'
                    size='30'
                    pattern='[0-9]{4,15}'
                    title='A phone number, maximum 15 characters'
                    v-model="updatedEmployee.phone"
                    />
                </td>

                <!--Department selection-->
                <td>
                    <select 
                    class='department'
                    name='department'
                    id='department'
                    v-model="updatedEmployee.department"
                    >
                    <option value='Sales'>Sales</option>
                    <option value='Human Resources'>Human Resources</option>
                    <option value='IT'>IT</option>
                    <option value='Logistics'>Logistics</option>
                    <option value='Accounting'>Accounting</option>
                    </select>
                </td>

                <!--Position input-->
                <td>
                    <input 
                    type='text' 
                    class='position'
                    name='position'
                    id='position'
                    maxlength='30'
                    size='30'
                    v-model="updatedEmployee.position"
                    />
                </td>

                <!--Salary input-->
                <td>
                    <input 
                    type='number' 
                    class='salary'
                    name='salary'
                    id='salary'
                    min='0'
                    v-model="updatedEmployee.salary"
                    />
                </td>

                <!--Age input-->
                <td>
                    <input 
                    type='number' 
                    class='age'
                    name='age'
                    id='age'
                    min='18'
                    max='100'
                    v-model="updatedEmployee.age"
                    />
                </td>
            </tr>
        </table>
        <!-- Commit Button -->
        <button @click="editEmployee">Commit Update</button>
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
    name: 'EditEmployee',
    data(){
        return{
            employee: {},
            updatedEmployee: {
                first_name: '',
                last_name: '',
                address: '',
                phone: '',
                department: '',
                position: '',
                salary: '',
                age: ''
            }
        }
    },
    props: [
        'employeeID',
        'showEdit'
    ],
    methods: {
        // Calls for the axios method that returns an employee by ID and parses the data to this.employee
        getEmployee(id){
            EmployeeDataService.get(id).
            then(res => {
                this.employee = res.data;
            })
        },
        //Validates the data from the inputs and if successful calls for the axios method to update the employee
        editEmployee() {
            const data = {};

            validateName(this.updatedEmployee.first_name, data, 'first_name');
            validateName(this.updatedEmployee.last_name, data, 'last_name');
            validateAddress(this.updatedEmployee.address, data);
            validatePhone(this.updatedEmployee.phone, data);
            validateDepartment(this.updatedEmployee.department, data);
            validatePosition(this.updatedEmployee.position, data);
            validateSalary(this.updatedEmployee.salary, data);
            validateAge(this.updatedEmployee.age, data);
          
            if (Object.keys(data).length < 1) return;

           EmployeeDataService.update(this.employeeID, data)
           .then(res =>{
               alert(res.data.message);
               this.$emit('employeeUpdated');
           })
        },
        //Emits the 'closeTab' event to the parent that closes this component
        closeEditTab() {
            this.$emit('closeTab')
        }
    },
    //When the component is created calls the getEmployee method
    created() {
        this.getEmployee(this.employeeID)
    }
}
</script>

<style scoped>
input {
    width: 100px;
}
</style>