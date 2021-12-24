import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  column=[
    {"headerName":"Name","field":"name"},
    {"headerName":"Age","field":"age"},
    {"headerName":"Gender","field":"gender"}
  ]
  rowInfo=[
    {"name":"kamalakar","age":"29","gender":"Male"},
    {"name":"Ram","age":"2925","gender":"Male"},
    {"name":"Seetha","age":"20","gender":"FeMale"},
    {"name":"Mohan","age":"21","gender":"Male"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
