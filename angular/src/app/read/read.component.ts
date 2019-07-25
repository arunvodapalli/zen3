import { Component, OnInit } from '@angular/core';
import { services } from '../services/services';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  process: string;
  fileData
  files = [];
  showProcess = false;
  processName :string

  constructor(public service: services) { }

  ngOnInit() {
    this.getFiles()
  }
  getFiles() {
    this.service.getProcesses().subscribe(result => {
      if (result.success) {
        this.files = result.message
      }
      else {
        alert(result.message);
      }
    })
  }
  getProcess() {
    if (this.process) {
      this.service.getProcess(this.process).subscribe(result => {
        if (result.success) {
          console.log(result)
          this.fileData = result.message
          this.showProcess = true
          this.processName = this.process
          this.processName = this.processName.replace('.env','')
          this.process = ''
        }
        else {
          alert(result.message)
        }
      })
    }
    else {

    }
  }

}
