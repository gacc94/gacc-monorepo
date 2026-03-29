import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent, CardComponent } from 'ui-kit';

@Component({
    selector: 'gacc-root',
    imports: [RouterOutlet, ButtonComponent, CardComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('movies');

    clickedBtn(msg: string) {
        console.log('Button clicked: ', msg);
    }
}
