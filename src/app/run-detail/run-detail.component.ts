import { Component, Input, EventEmitter, Output, HostListener } from "@angular/core";

@Component({
    selector: 'run-detail',
    templateUrl: './run-detail.component.html',
    styleUrls: [ './run-detail.component.less' ]
})
export class RunDetailComponent {
    @Input() image: String;
    @Input() location: String;
    @Input() description: String;
    @Input() completed: boolean;

    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onCompleted: EventEmitter<any> = new EventEmitter();

    @HostListener('click', ['$event', '$target'])
    close (event) {
        if (event.target.tagName === 'RUN-DETAIL') {
            this.onClose.emit();
        }
    }
}