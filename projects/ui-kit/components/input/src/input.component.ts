import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'gacc-input',
    template: `
        <div class="gacc-input">
            @if (label()) {
                <label class="gacc-input__label">{{ label() }}</label>
            }
            <input
                class="gacc-input__field"
                [type]="type()"
                [placeholder]="placeholder()"
                [disabled]="disabled()"
                [value]="value()"
                (input)="onChange($event)"
            />
            @if (error()) {
                <span class="gacc-input__error">{{ error() }}</span>
            }
        </div>
    `,
    styleUrl: './input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
    label = input<string>();
    placeholder = input<string>('');
    type = input<'text' | 'password' | 'email' | 'number'>('text');
    disabled = input<boolean>(false);
    value = input<string>('');
    error = input<string>();

    valueChange = output<string>();

    onChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.valueChange.emit(target.value);
    }
}
