import { Overlay, OverlayConfig, type OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector, inject, type Type } from "@angular/core";
import type { DialogConfig } from "./dialog-config";
import { DialogContainerComponent } from "./dialog-container.component";
import { DialogRef } from "./dialog-ref";
import { DIALOG_DATA } from "./dialog-tokens";

/**
 * Globally injectable service responsible for dynamically instantiating modals
 * supported by the `Overlay` from `@angular/cdk/overlay`.
 * Implements "Separation of Concerns" architecture, creating isolated Ref instances and Injectors.
 */
@Injectable({
	providedIn: "root",
})
export class DialogService {
	private overlay = inject(Overlay);
	private injector = inject(Injector);

	private readonly DEFAULT_CONFIG: DialogConfig = {
		disableClose: false,
		autoFocus: true,
	};

	/**
	 * Opens a component as a floating dialog panel (Modal).
	 *
	 * @param component Standalone component type to render in the modal body.
	 * @param config (Optional) Base configurations.
	 * @returns An injectable `DialogRef` control to interact programmatically (e.g. close).
	 */
	open<T, R = unknown, D = unknown>(
		component: Type<T>,
		config?: DialogConfig<D>,
	): DialogRef<R> {
		const dialogConfig: DialogConfig<D> = {
			...this.DEFAULT_CONFIG,
			...config,
		} as DialogConfig<D>;

		// 1. Create the native overlay host.
		const overlayRef = this.createOverlay(dialogConfig);

		// 2. Instantiate the "DialogRef" control for this specific modal.
		const dialogRef = new DialogRef<R>(
			overlayRef,
			`gacc-dialog-${Math.random().toString(36).substring(2, 9)}`,
		);

		// 3. Create the injector that propagates DIALOG_DATA and DialogRef locally to the target component.
		const localInjector = this.createInjector(
			dialogConfig,
			dialogRef as unknown as DialogRef<unknown>,
		);

		// 4. Attach the DIALOG CONTAINER to the overlay so it paints the backdrop and manages A11y.
		// We use the container to wrap the body.
		const containerPortal = new ComponentPortal(
			DialogContainerComponent,
			null,
			localInjector,
		);
		const containerRef = overlayRef.attach(containerPortal);

		// 5. Attach and paint the User Component dynamically inside the container.
		const instance = containerRef.instance as DialogContainerComponent;
		instance.attachComponentPortal(new ComponentPortal(component));
		instance.applyConfig(
			dialogConfig,
			dialogRef as unknown as DialogRef<unknown>,
		);

		// 6. Configure closing by clicking on the dark background (backdrop)
		overlayRef.backdropClick().subscribe(() => {
			if (!dialogConfig.disableClose) {
				dialogRef.close();
			}
		});

		return dialogRef;
	}

	/**
	 * Generates the portal in the DOM root with opaque backgrounds and floating positioning strategy.
	 */
	private createOverlay(config: DialogConfig): OverlayRef {
		const overlayConfig = new OverlayConfig({
			hasBackdrop: true,
			scrollStrategy: this.overlay.scrollStrategies.block(), // Prevents scrolling on the background body
			positionStrategy: this.overlay
				.position()
				.global()
				.centerHorizontally()
				.centerVertically(),
			backdropClass: config.backdropClass || "cdk-overlay-dark-backdrop",
			panelClass: config.panelClass,
		});

		if (config.width) overlayConfig.width = config.width;
		if (config.height) overlayConfig.height = config.height;
		if (config.maxWidth) overlayConfig.maxWidth = config.maxWidth;
		if (config.maxHeight) overlayConfig.maxHeight = config.maxHeight;

		return this.overlay.create(overlayConfig);
	}

	/**
	 * Builds the "Isolated" dependency environment (Local Injector).
	 * Allows the user component to transparently `let ref = inject(DialogRef)`.
	 */
	private createInjector(
		config: DialogConfig<unknown>,
		dialogRef: DialogRef<unknown>,
	): Injector {
		return Injector.create({
			parent: this.injector,
			providers: [
				{ provide: DialogRef, useValue: dialogRef },
				{ provide: DIALOG_DATA, useValue: config.data },
			],
		});
	}
}
