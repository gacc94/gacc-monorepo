import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@gacc/ui-kit/button';
import { CardComponent } from '@gacc/ui-kit/card';
import { InputComponent } from '@gacc/ui-kit/input';
import { AvatarComponent } from '@gacc/ui-kit/avatar';
import { BadgeComponent } from '@gacc/ui-kit/badge';
import { SpinnerComponent } from '@gacc/ui-kit/spinner';

@Component({
    selector: 'gacc-root',
    imports: [
        RouterOutlet,
        ButtonComponent,
        CardComponent,
        InputComponent,
        AvatarComponent,
        BadgeComponent,
        SpinnerComponent,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('movies');

    clickedBtn(msg: string) {
        console.log('Button clicked: ', msg);
    }
}
