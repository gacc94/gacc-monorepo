import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'gacc-button',
    template: `
        <button
            class="gacc-button"
            [class.gacc-button--primary]="variant() === 'primary'"
            [class.gacc-button--secondary]="variant() === 'secondary'"
            [class.gacc-button--danger]="variant() === 'danger'"
            [class.gacc-button--outline]="variant() === 'outline'"
            [class.gacc-button--full-width]="fullWidth()"
            [disabled]="disabled()"
            (click)="clicked.emit($event)"
        >
            <ng-content></ng-content>
            @if (text()) {
                <span>{{ text() }}</span>
            }
        </button>
    `,
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    variant = input<'primary' | 'secondary' | 'danger' | 'outline'>('primary');
    fullWidth = input<boolean>(false);
    disabled = input<boolean>(false);
    text = input<string>();

    clicked = output<MouseEvent>();
}
