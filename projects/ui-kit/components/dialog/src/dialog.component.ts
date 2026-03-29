import { OverlayModule } from "@angular/cdk/overlay";
import {
	BasePortalOutlet,
	CdkPortalOutlet,
	type ComponentPortal,
	PortalModule,
	type TemplatePortal,
} from "@angular/cdk/portal";
import { NgClass } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	type ComponentRef,
	computed,
	ElementRef,
	type EmbeddedViewRef,
	inject,
	output,
	viewChild,
} from "@angular/core";
import { ButtonComponent } from "@gacc/ui-kit/components/button";
import { GaccDialogOptions } from "./dialog-options";
import type { GaccDialogRef } from "./dialog-ref";

@Component({
	selector: "gacc-dialog",
	standalone: true,
	imports: [OverlayModule, PortalModule, ButtonComponent, NgClass],
	templateUrl: "./dialog.component.html",
	styleUrl: "./dialog.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"[class]": "classes()",
		"[style.max-width]": "config.gaccWidth ? config.gaccWidth : null",
		"animate.enter": "dialog-enter",
		"animate.leave": "dialog-leave",
	},
	exportAs: "gaccDialog",
})
export class GaccDialogComponent<T, U> extends BasePortalOutlet {
	private readonly host = inject(ElementRef<HTMLElement>);
	protected readonly config = inject(GaccDialogOptions<T, U>);

	protected readonly classes = computed(() => {
		const customClasses = this.config.gaccCustomClasses;
		if (Array.isArray(customClasses)) {
			return ["gacc-dialog", ...customClasses].join(" ");
		}
		if (typeof customClasses === "string") {
			return `gacc-dialog ${customClasses}`;
		}
		return "gacc-dialog";
	});

	dialogRef?: GaccDialogRef<T>;

	protected readonly isStringContent =
		typeof this.config.gaccContent === "string";

	readonly portalOutlet = viewChild.required(CdkPortalOutlet);

	okTriggered = output<void>();
	cancelTriggered = output<void>();

	constructor() {
		super();
	}

	getNativeElement(): HTMLElement {
		return this.host.nativeElement;
	}

	attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
		if (this.portalOutlet()?.hasAttached()) {
			throw new Error(
				"Attempting to attach modal content after content is already attached",
			);
		}
		return this.portalOutlet()?.attachComponentPortal(portal);
	}

	attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
		if (this.portalOutlet()?.hasAttached()) {
			throw new Error(
				"Attempting to attach modal content after content is already attached",
			);
		}
		return this.portalOutlet()?.attachTemplatePortal(portal);
	}

	onOkClick() {
		this.okTriggered.emit();
	}

	onCloseClick() {
		this.cancelTriggered.emit();
	}
}
