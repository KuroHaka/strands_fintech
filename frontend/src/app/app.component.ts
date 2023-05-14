import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';

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

    }
    onFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files != null){
            let image = target.files[0]
            console.log(image.name)
        }
    }
}