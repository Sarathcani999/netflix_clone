import {Directive,OnInit,ElementRef,Renderer2,HostListener} from '@angular/core';

@Directive({
	selector : '[nav]'
})
export class NavDirective implements OnInit {
	
	constructor(private element : ElementRef , private renderer : Renderer2) {}

	@HostListener('window:scroll' , ['$event']) onWindowScroll(e : Event) {
		// console.log("SCROLLED")
		// console.log(window.pageYOffset);

		if (window.pageYOffset > 125) {
			this.renderer.setStyle(
				this.element.nativeElement ,
				'background-color',
				'#111'
			);
		} 

		if (window.pageYOffset <= 125) {
			this.renderer.setStyle(
				this.element.nativeElement ,
				'background',
				'none'
			);
		}
	}


	ngOnInit() : void {
		// console.log("NAV DIRECTIVE")
	}
}