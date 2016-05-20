import {Component, Input, Output, EventEmitter} from '@angular/core';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'timeout-selector',
	templateUrl: '/app/popup/timeoutSelectorComponent.html',
	directives: [DROPDOWN_DIRECTIVES]
})
export class TimeoutSelectorComponent {
	@Input() selectedTimeout: number;
	@Output() changed = new EventEmitter<number>();
	timeouts = [15, 30, 60, 120];
	
	constructor() {
	}

	changeTimeout(timeout: number) {
		this.changed.emit(timeout);
	}
}