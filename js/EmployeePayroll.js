class EmployeePayroll{

    //gettert and Settert for id
    get id() {return this.id;}
    set id(id){
        this._id = id;
    }

    //gettert and Settert for name
    get name() {return this._name;}
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if(nameRegex.test(name))
            this._name = name;
        else throw "Name is incorrect";
    }

    //gettert and Settert for profilePic
    get profilePic() {return this._profilePic};
    set profilrPic(profilePic){
        this._profilePic = profilePic;
    }

    //gettert and Settert for gender
    get gender() {return this._gender;}
    set gender(gender){
        this._gender = gender;
    }

    //gettert and Settert for department
    get department() {return this._departmetnt;}
    set department() {
        this._departmetnt = this.department;
    }

    //gettert and Settert for note
    get note() {return this._note;}
    set note(note){
        this._note = note;
    }

    //gettert and Settert for salary
    get salary() { return this._salary;}
    set salary(salary){
        this._salary = salary;
    }

    //gettert and Settert for startDate
    get startDate() { return this._startDate;}
    set startDate(startDate){
        this._startDate = startDate;
    }


    //method
    toString(){
        const options = {year: 'numeric', month: 'long', day: 'numeric'};   
        const empDate = this.startDate === undefined ? "undefined" :
                        this.startDate.toLocaleDateString("en-US",options);
        return "id=" +this.id+ ", name=" +this.name+ ", salary=" +this.salary+
        ", Gender=" +this.gender+ ",department= "+this.department+ ", ProfilePic= "+this.profilePic+
        ", startDate= " +empDate+ ", note= "+this.note;
    }

}