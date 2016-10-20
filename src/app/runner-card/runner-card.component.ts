import { Component, Input } from "@angular/core";

@Component({
    selector: 'runner-card',
    templateUrl: './runner-card.component.html',
    styleUrls: ['./runner-card.component.less']
})
export class RunnerCardComponent {
    @Input() avatar: string;
    @Input() displayName: string;
    @Input() completedRunsCount: number;
    @Input() totalRunsCount: number;

    constructor () {

    }
}