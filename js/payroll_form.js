let isUpdate = false;
let employeePayrollObj = {};

/*UC 10 */
window.addEventListener('DOMContentLoaded', (event) => {
const name = document.querySelector('#name');
const textError = document.querySelector('.text-error');
name.addEventListener('input', function () {
    if (name.value.length == 0) {
        textError.textContent = "";
        return;
    }
    try {
        (new EmployeePayrollData()).name = name.value;;
        textError.textContent = "";
    } catch (e) {
        textError.textContent = e;
    }

});

//Date validation
const date = document.querySelector('#date');
window.addEventListener('input', function(){
    const startDate = new Date(Date.parse(getInputValuesById('#day')+" "+
                                                             ('#month')+" "+
                                                             ('#year')));
    try{
        (new EmployeePayrollData()).startDate = startDate;
        setTextValue('.date-error',"");
    }catch(e){
        setTextValue('.date-error',e);
    }                                                    
});



const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function() {
    output.textContent = salary.value; 
    });

checkForUpdate();
});




/*UC 11 */

const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}


const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValuesById('#name');
    }catch(e){
        setTextValue('.test-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValuesById('#salary');
    employeePayrollData.note = getInputValuesById('#notes');
    let date = getInputValuesById('#day') + " "+getInputValuesById('#month')+ " " + getInputValuesById('#year');
    employeePayrollData.date=Date.parse(date);
    alert("employeePayrollData.toString()");
    return employeePayrollData;
}


const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

const getInputValuesById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

/*UC12 - Saving employee payroll to local Storage */

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

/* UC13-Reset the form on clicking reset button */

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setSelectedIndex = (id, value) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

//UC21 Check For Update    
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

//setForm()
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

//set Selected Values
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if(value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}