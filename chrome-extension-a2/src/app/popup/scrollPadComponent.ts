import {Component, Output, EventEmitter, ElementRef} from '@angular/core';

@Component({
	selector: 'scroll-pad',
	templateUrl: '/app/popup/scrollPadComponent.html'
})
export class ScrollPadComponent{
	@Output() scrollScreen = new EventEmitter<number>();
	
	onScroll(args: WheelEvent){
		this.scrollScreen.emit(args.deltaY < 0 ? -1 : 1);
	}
}