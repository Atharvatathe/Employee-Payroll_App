//declare global variable for employee payroll list
let empPayrollList; 
window.addEventListener('DOMContentLoaded', () => {
    empPayrollList = getEmployeePayrollDataFromLocalStorage();
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHTML();
    localStorage.removeItem('editEmp');
});

//get Employee Data from local storage
const getEmployeePayrollDataFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [] ;
}

const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>start Date</th><th>Actions</th>";
    if ( empPayrollList.length == 0 ) return;
    let innerHtml = `${headerHtml}`;
    
    for  ( const employeePayrollData of empPayrollList){
        innerHtml = `${innerHtml}
         <tr>
             <td>
                 <img class="profile" alt="" src="${employeePayrollData._profilePic}">
             </td>
             <td>${employeePayrollData._name}</td>
             <td>${employeePayrollData._gender}</td>
             <td>${getDeptHtml(employeePayrollData._department)}</td>
             <td>${employeePayrollData._salary}</td>
             <td>${stringifyDate(employeePayrollData._startDate)}</td>
             <td> 
                 <img id="${employeePayrollData._id}" onclick ="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                 <img id="${employeePayrollData._id}" "onclick="update(this)" alt="edit"    src="../assets/icons/create-black-18dp.svg">
             </td>
         </tr>
         `;
    }
     document.querySelector('#table-display').innerHTML=innerHtml;
}

//populate all department from department list
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class ='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

// remove employee details from payroll list
const remove = (node)=> {
    let employeePayrollData = empPayrollList.find(empData=>empData._id == node.id);
    if (!employeePayrollData) return;
    const index = empPayrollList
                  .map(empData=>empData._id)
                  .indexOf(employeePayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHTML();
}

const update = (node) => {
    let employeePayrollData = empPayrollList.find(empData=>empData._id == node.id);
    if (!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData));
    window.location.replace("../pages/book_form.html");    
}

