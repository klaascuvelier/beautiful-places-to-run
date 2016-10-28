import { Component, Input } from "@angular/core";

@Component({
    selector: 'run-card',
    templateUrl: 'run-card.component.html',
    styleUrls: [ 'run-card.component.less' ]
})
export class RunCardComponent {
    @Input() slug: String;
    @Input() image: String;
    @Input() location: String;
    @Input() completed: boolean = false;
}