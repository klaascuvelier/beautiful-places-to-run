import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from "@angular/core/src/metadata/directives";
import { FirebaseAuth } from "angularfire2";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.less']
})
export class HeaderComponent implements OnInit {

    @Input() auth:FirebaseAuth;
    @Output() onLogin = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    login () {
        this.onLogin.emit();
    }
}
