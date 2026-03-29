import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'gacc-spinner',
    template: `
        <div class="gacc-spinner" [class]="'gacc-spinner--' + size()" role="status">
            <span class="gacc-spinner__sr-only">Loading...</span>
        </div>
    `,
    styleUrl: './spinner.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
    size = input<'sm' | 'md' | 'lg'>('md');
}
