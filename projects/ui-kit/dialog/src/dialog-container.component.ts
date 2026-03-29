import {
	type AnimationEvent,
	animate,
	state,
	style,
	transition,
	trigger,
} from "@angular/animations";
import { A11yModule } from "@angular/cdk/a11y";

import {
	CdkPortalOutlet,
	type ComponentPortal,
	PortalModule,
} from "@angular/cdk/portal";
import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	type OnInit,
	signal,
	viewChild,
} from "@angular/core";
import type { DialogConfig } from "./dialog-config";
import type { DialogRef } from "./dialog-ref";

const ANIMATION_TIMINGS = "150ms cubic-bezier(0.25, 0.8, 0.25, 1)";

/**
 * Visual container for the modal Dialog, mounted programmatically on top of the UI.
 * Acts as a host supporting animations with the `@angular/animations` library.
 */
@Component({
	selector: "gacc-dialog-container",
	standalone: true,
	imports: [PortalModule, A11yModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["./dialog-container.component.scss"],
	host: {
		// A11y
		role: "dialog",
		"[attr.aria-modal]": "true",
		// Animations and Binding
		"[@dialogAnimation]": "state()",
		"(@dialogAnimation.done)": "onAnimationDone($event)",
	},
	animations: [
		trigger("dialogAnimation", [
			state("void, exit", style({ opacity: 0, transform: "scale(0.9)" })),
			state("enter", style({ opacity: 1, transform: "scale(1)" })),
			transition("* => enter", animate(ANIMATION_TIMINGS)),
			transition("* => void, * => exit", animate(ANIMATION_TIMINGS)),
		]),
	],
	template: `
    <!-- Host container injects cdkTrapFocus so that
         when tabbing, we don't visually leave the modal  -->
    <div
      class="gacc-dialog-focus-trap"
      cdkTrapFocus
      cdkTrapFocusAutoCapture
    >
      <!-- Dynamic Outlet for Angular CDK Portal -->
      <!-- This is where the requested component in open() is actually inserted -->
      <ng-template cdkPortalOutlet></ng-template>
    </div>
  `,
})
export class DialogContainerComponent implements OnInit {
	// Local view management
	readonly portalOutlet = viewChild.required(CdkPortalOutlet);
	readonly state = signal<"void" | "enter" | "exit">("enter");

	private _config!: DialogConfig;
	private _dialogRef!: DialogRef<unknown>;

	/**
	 * Attaches the Standalone component from the user's view (e.g. your edit modal) to our hollow UI.
	 */
	attachComponentPortal<T>(portal: ComponentPortal<T>): void {
		this.portalOutlet().attachComponentPortal(portal);
	}

	/**
	 * Vital metadata to know what to do when pressing ESC or clicking on the background.
	 */
	applyConfig(config: DialogConfig, dialogRef: DialogRef<unknown>): void {
		this._config = config;
		this._dialogRef = dialogRef;

		// Subscribe to the logical closure dictated by _afterClosed in DialogRef,
		// indicating to this component to start the final animation and destruction.
		this._dialogRef.afterClosed().subscribe(() => {
			this.state.set("exit"); // Invokes Transition: '* => exit'
		});
	}

	ngOnInit() {
		this.state.set("enter"); // Trigger start animation
	}

	/**
	 * Intercept "Escape" event. Preventive A11y approach:
	 * Close without optional logical return unless `disableClose` is active.
	 */
	@HostListener("document:keydown.escape", ["$event"])
	handleEscapeKey(event: KeyboardEvent | Event): void {
		if (!this._config.disableClose) {
			event.preventDefault();
			this._dialogRef.close();
		}
	}

	/**
	 * Delegated listener for backdrop click via Overlay.
	 * `Overlay` emits this in the document listener; it requires connecting it in our environment if necessary.
	 * For simplicity, we capture if the underlying direct layout background was clicked.
	 */
	// ... Note: The backdrop click is usually handled by attaching to the overlayRef, which we will do globally in the next step or handle here with injection.

	/**
	 * Fired automatically by `@angular/animations`.
	 */
	onAnimationDone(event: AnimationEvent): void {
		if (event.toState === "exit") {
			// Clean destruction guaranteed only if the fade-out animation is fully completed.
			this._dialogRef.destroyOverlay();
		}
	}
}
