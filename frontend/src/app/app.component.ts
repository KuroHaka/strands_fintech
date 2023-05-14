import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    title = 'frontend';
    view2: boolean = false

    constructor(private backend: BackendService) { }

    ngOnInit(): void {
        this.backend.post("group/get", {
            "req": {
                "group_id": "0"
            }
        }, new HttpHeaders({
            'Content-Type': 'application/json'
        })).subscribe((data: any) => {


            if (Object.keys(data.group).length != 0) this.view2 = true;
        });
    }

    onFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files != null) {
            let image = target.files[0]

            this.convertFile(image).subscribe(base64 => {

                this.backend.post("group/create_receipt", {
                    "login": {
                        "username": "userPFM11"
                    },

                    "req": {
                        "img64": base64
                    }
                }, new HttpHeaders({
                    'Content-Type': 'application/json'
                })).subscribe((data: any) => {
                    console.log(data)
                    this.view2 = true;
                })
            });
        }
    }

    convertFile(file: File): Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));
        return result;
    }
    uploadButton() {

    }
}