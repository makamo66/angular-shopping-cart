import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-check-out',
  templateUrl: 'check-out.component.html',
  styleUrls: ['check-out.component.scss']
})
/*
@NgModule({
  imports: [
    RouterModule
  ]
})*/

export class CheckOutComponent implements OnInit {
  title = 'Firestore CRUD Operations Students App';

  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

  //constructor(private crudService: CrudService) { }
constructor(private crudService: CrudService, public router: Router, private route: ActivatedRoute){}
  ngOnInit() {
    this.crudService.read_Students().subscribe(data => {

      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.students);

    });
  }

  CreateRecord() {
    let record = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;
    this.crudService.create_NewStudent(record).then(resp => {
      this.studentName = "";
      this.studentAge = undefined;
      this.studentAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
public checkOut(): void {
//this.router.navigate(['../check-out/check-out']);
//this.router.navigate(['./check-out/check-out'], {relativeTo: this.route});
//this.router.navigate(['CheckOut']); 
this.router.navigateByUrl('/check-out/check-out');
//router.navigate(['../22'], {relativeTo: route});
//this.router.navigateByUrl('http://localhost:4200/check-out/check-out');
}
  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }

}

