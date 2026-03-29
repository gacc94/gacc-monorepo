import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'gacc-badge',
    template: `
        <span class="gacc-badge" [class]="'gacc-badge--' + variant()">
            <ng-content></ng-content>
            {{ text() }}
        </span>
    `,
    styleUrl: './badge.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
    text = input<string>('');
    variant = input<'primary' | 'success' | 'warning' | 'danger'>('primary');
}
