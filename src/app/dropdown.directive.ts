import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[cmsDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor() { }

    @HostListener('click') toggle() {
        this.isOpen = !this.isOpen;
    }
}
