import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class services {
    url = 'http://localhost:8464/files/';

    constructor(private http: Http, private route: ActivatedRoute) { }

    getProcess(process) {
        return this.http.get(this.url + 'get-env/' + process).pipe(map(res => res.json()));
    }

    getProcesses() {
        return this.http.get(this.url + 'get-files').pipe(map(res => res.json()));
    }
    
    createProcess(process,key,value) {
        return this.http.get(this.url + 'create-env/' + process + '/' + key + '/' + value).pipe(map(res => res.json()));
    }   


}