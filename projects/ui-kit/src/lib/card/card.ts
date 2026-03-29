import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ui-card',
    standalone: true,
    template: `
        <article class="ui-card">
            @if (title() || subtitle()) {
                <header class="ui-card__header">
                    @if (title()) {
                        <h3 class="ui-card__title">{{ title() }}</h3>
                    }
                    @if (subtitle()) {
                        <p class="ui-card__subtitle">{{ subtitle() }}</p>
                    }
                </header>
            }
            <div class="ui-card__content">
                <ng-content></ng-content>
            </div>
        </article>
    `,
    styleUrl: './card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    title = input<string>();
    subtitle = input<string>();
}
