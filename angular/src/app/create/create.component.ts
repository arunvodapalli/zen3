import { Component, OnInit } from '@angular/core';
import { services } from '../services/services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  process: string;
  key: string;
  value: any;
  files = [];
  constructor(public service : services) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles(){
    this.service.getProcesses().subscribe(result => {
      if (result.success) {
        this.files = result.message
      }
      else{
        alert(result.message);
      }
    })
  }

  storeProcess() {
    if (this.process) {
      if (this.key) {
        if (this.value) {
          this.service.createProcess(this.process,this.key,this.value).subscribe(result => {
            if (result.success) {
              this.files.push(this.process+'.env')
              alert('create successfully')
              this.process = '';
              this.value = '';
              this.key = '';
            }
            else {
              alert(result.message)
            }
          })
        }
        else {
          alert('Enter key value');
        }
      }
      else {
        alert('Enter key name');
      }
    }
    else {
      alert('Enter process name');
    }
  }

}
