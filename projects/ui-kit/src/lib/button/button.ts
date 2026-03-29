import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'ui-button',
    standalone: true,
    template: `
        <button
            class="ui-button"
            [class.ui-button--primary]="variant() === 'primary'"
            [class.ui-button--secondary]="variant() === 'secondary'"
            [class.ui-button--danger]="variant() === 'danger'"
            [class.ui-button--outline]="variant() === 'outline'"
            [class.ui-button--full-width]="fullWidth()"
            [disabled]="disabled()"
            (click)="clicked.emit($event)"
        >
            <ng-content></ng-content>
            @if (text()) {
                <span>{{ text() }}</span>
            }
        </button>
    `,
    styleUrl: './button.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    variant = input<'primary' | 'secondary' | 'danger' | 'outline'>('primary');
    fullWidth = input<boolean>(false);
    disabled = input<boolean>(false);
    text = input<string>();

    clicked = output<MouseEvent>();
}
