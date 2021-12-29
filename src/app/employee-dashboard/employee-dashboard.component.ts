import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employeeForm:any= FormGroup;
  employeedata !:any
  constructor(private _post:ShareService) { }

  ngOnInit(): void {
    this.employeeForm= new FormGroup({
      "First_Name" : new FormControl("",Validators.required),
      "last_Name" : new FormControl("",Validators.required),
      "Email" : new FormControl("",[Validators.email,Validators.required]),
      "number" :new FormControl("",Validators.required),
      "salary" :new FormControl("",Validators.required)
    })
    this.getAllEmployees()
  }



add(){
let obj:any={
  firstName:this.employeeForm.get("First_Name").value,
  lastName:this.employeeForm.get("last_Name").value,
  Email:this.employeeForm.get("Email").value,
  number:this.employeeForm.get("number").value,
  salary:this.employeeForm.get("salary").value
}

this._post.postData(obj).subscribe((res:any)=>{
  console.log(res);
  alert("Employee Add SuccessFully")
  //auto click to cancel-----------------------------------
  let ref = document.getElementById('cancel')
  ref?.click();
  //-------------
  this.employeeForm.reset();
  this.getAllEmployees();
  
})

}
 
getAllEmployees(){
  this._post.getData().subscribe((res:any)=>{
    console.log(res)
    this.employeedata=res;
  })
}

deleteEmployee(value:any){
  this._post.delete(value.id).subscribe((res:any)=>{
    alert("Employee Deleted")
    this.getAllEmployees();
  })
}
onEdit(value:any){
  
  this.employeeForm.controls['First_Name'].setValue(value.First_Name)
  this.employeeForm.controls['last_Name'].setValue(value.last_Name)
  this.employeeForm.controls['Email'].setValue(value.Email)
  this.employeeForm.controls['number'].setValue(value.number)
  this.employeeForm.controls['salary'].setValue(value.salary)
}
updateData(){
  let obj:any={
    firstName:this.employeeForm.get("First_Name").value,
    lastName:this.employeeForm.get("last_Name").value,
    Email:this.employeeForm.get("Email").value,
    number:this.employeeForm.get("number").value,
    salary:this.employeeForm.get("salary").value
  }
  this._post.updateData(obj,obj.id).subscribe((res)=>{
    alert("successfully Updated")
    //auto click to cancel-----------------------------------
  let ref = document.getElementById('cancel')
  ref?.click();
  //-------------
  this.employeeForm.reset();
  this.getAllEmployees();
  
  })

}
}
