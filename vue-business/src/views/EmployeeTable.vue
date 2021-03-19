<template>
    <div>
    <div id='employee-display'>
        <!-- This table displays all the employees -->
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

            </tr>

            <!-- This row displays each employee's details -->
            <template v-for="employee in employees">
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

                <!-- Button to Edit an Employee-->
                <td 
                id='edit' 
                class='edit-icon' 
                title='Edit employee' 
                @click="showEditEmployee(employee.id), 
                showEdit=!showEdit" 
                >
                    <i class="fas fa-pencil-alt"></i>
                </td>
                <!-- Button to Delete an Employee -->
                <td 
                id='delete' 
                class='delete-icon' 
                title='Delete employee' 
                @click="deleteEmployee(employee.id)"
                >
                    <i class="fas fa-user-slash"></i>
                </td>
            </tr>
            </template>
        </table>
    </div>

    <!-- Button to Register a new Employee -->
    <button @click="createNewEmployee()">Register New Employee</button>

        <EditEmployee :showEdit='showEdit' :employeeID='employeeID' v-if="showEdit" v-on:closeTab="closeEditTab()" v-on:employeeUpdated='employeeUpdated()'/>

    </div>
</template>

<script>
window.$ = window.jQuery = require('jquery');
import EmployeeDataService from "../service/employeesDataService"
import EditEmployee from "../components/editEmployee"

export default {
    name: 'EmployeeTable',
    data() {
        return {
            employees: [],
            showEdit: false,
            employeeID: ''
        }
    },
    components: {
        EditEmployee 
    },
    methods: {

        // Gets all the employees
        getEmployees() {
            EmployeeDataService.getAll()
            .then(res =>{
                this.employees = res.data;
            })
            .catch(e => {
                console.log(e);
            });
        },

        // Redirects to the Employee Registration page
        createNewEmployee(){
            this.$router.push({ name: 'Employees_Form'});
        },

        // Deletes an employee
        deleteEmployee(id) {
           if(confirm(`Are you sure you want to delete user with ID ${id}`)){
               $.ajax({
               url: 'http://localhost:8080/api/employees' + '/' + id,
               type: 'DELETE',
               success: (res) =>{
                   alert(res.message);
                   this.getEmployees();
               }
           })
           }     
        },

        // Passes the ID of the employee who is going to be edited to the editEmployee component
        showEditEmployee(id){
            this.employeeID = id;        
        },
        // Turn the showEdit property to false and that closes the editEmployee component
        closeEditTab() {
            this.showEdit = false;
        },
        // When the editEmployee component comfirms that an employee has been edited call the getEmployees method and 
        // update the table with the new data
        employeeUpdated(){
            this.getEmployees();
        }
    },
    // Before the view is mounted calls the getEmployees method to get the data needed for the table
    beforeMount(){
        this.getEmployees();
    }
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

tr th {
    text-align: center;
}

td, th {
  border: 1px solid #fff;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #fff;
}

[class$='-icon'] {
    cursor: pointer;
}
</style>