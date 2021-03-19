const nameRegEx = /^[A-Z]{1}[a-z]{0,29}$/;
const phoneRegEx = /^(?:\d{4,15})$/;
const addressRegEx = /(?:\w+\,?\s?)+/;
const positionRegEx = /^(?:[A-Z]{1}[a-z]{0,29}\s?)+$/;
const salaryRegEx = /^\d{1,9}$/;
const ageRegEx = /^\d{2}$/;

//All validates check that the input is not undefined and not an empty string.

// Checks if the name input is no longer than 30 characters and 
// matches the pattern of 1 capital letter followed by 0 or 29 lowercase letters
function validateName(nameInput, nameOutput, outputProperty) {
    if (typeof nameInput !== 'undefined' &&
        nameInput.length >= 1 ) {
        if (nameInput.length > 30 ||
            !nameRegEx.test(nameInput)) {
                throw new Error('Invalid Name Input');           
        } else {
            nameOutput[outputProperty] = nameInput;
        }
    }
};

//Checks if the address input is not longer than 55 characters
function validateAddress(addressInput, addressOutput) {
    if (typeof addressInput !== 'undefined' &&
        addressInput.length >= 1 ){
        if (addressInput.length > 55 ||
            !addressRegEx.test(addressInput)) {
                throw new Error('Invalid Address Input');
        } else {
            addressOutput.employee_address = addressInput;
        }
    }
};

//Cheks if the phone input is betweeen 4 and 15 digits
function validatePhone(phoneInput, phoneOutput) {
    if (typeof phoneInput !== 'undefined' &&
        phoneInput.length >= 1) {
        if (phoneInput.length > 15 ||
            !phoneRegEx.test(phoneInput)) {
                throw new Error('Invalid Phone Number');
        } else {
            phoneOutput.employee_phone = phoneInput;
        }
    }
};

//Checks if the department input is one of the allowed values
function validateDepartment(departmentInput, departmentOutput) {
    if (typeof departmentInput !== 'undefined' &&
        departmentInput.length > 1) {
        if (departmentInput === 'Sales' ||
            departmentInput === 'Human Resources' ||
            departmentInput === 'IT' ||
            departmentInput === 'Logistics' ||
            departmentInput === 'Accounting') {
            departmentOutput.department = departmentInput;
        } else {
            throw new Error('Invalid department Input');

        }
    }
};

//Checks if the position input is no longer than 30 characters and
//each word starts with a capital letter
function validatePosition(positionInput, positionOutput) {
    if (typeof positionInput !== 'undefined' &&
        positionInput.length >= 1) {
        if (positionInput.length > 30 ||
            !positionRegEx.test(positionInput)) {
                throw new Error('Invalid Position Input');
        } else {
            positionOutput.employee_position = positionInput;
        }
    }
};

//Checks if the salary input is a number with between 1 and 9 digits
function validateSalary(salaryInput, salaryOutput) {
    if (typeof salaryInput !== 'undefined' &&
        salaryInput.length >= 1) {
        if(!salaryRegEx.test(salaryInput)){
            throw Error('Invalid Salary Input');
        } else {
            salaryOutput.employee_salary = salaryInput;
        }
    }
};

//Checks if the age input is between 18 and 75 years
function validateAge(ageInput, ageOutput) {
    if (typeof ageInput !== 'undefined' &&
        ageInput.length >= 1) {
        if (!ageRegEx.test(ageInput) ||
             ageInput < 18 ||
             ageInput > 75){
                 throw new Error('Invalid Age Input');
            } else {
                ageOutput.employee_age = ageInput;
            }
    }
};

module.exports = {
    validateName,
    validateAddress,
    validatePhone,
    validateDepartment,
    validatePosition,
    validateSalary,
    validateAge
};