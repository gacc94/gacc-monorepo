import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "gacc-card",
	template: `
        <article class="gacc-card">
            @if (title() || subtitle()) {
                <header class="gacc-card__header">
                    @if (title()) {
                        <h3 class="gacc-card__title">{{ title() }}</h3>
                    }
                    @if (subtitle()) {
                        <p class="gacc-card__subtitle">{{ subtitle() }}</p>
                    }
                </header>
            }
            <div class="gacc-card__content">
                <ng-content></ng-content>
            </div>
        </article>
    `,
	styleUrl: "./card.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
	title = input<string>();
	subtitle = input<string>();
}
