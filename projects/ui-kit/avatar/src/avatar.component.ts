import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'gacc-avatar',
    template: `
        <div class="gacc-avatar" [class]="'gacc-avatar--' + size()">
            @if (src()) {
                <img
                    [src]="src()"
                    [alt]="alt()"
                    class="gacc-avatar__image"
                    (error)="handleError()"
                />
            } @else {
                <span class="gacc-avatar__fallback">{{ getInitials() }}</span>
            }
        </div>
    `,
    styleUrl: './avatar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
    src = input<string>();
    alt = input<string>('Avatar');
    size = input<'sm' | 'md' | 'lg'>('md');
    name = input<string>('User');

    hasError = false;

    handleError() {
        this.hasError = true;
    }

    getInitials(): string {
        if (!this.name()) return 'U';
        const parts = this.name().trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return this.name().substring(0, 2).toUpperCase();
    }
}
