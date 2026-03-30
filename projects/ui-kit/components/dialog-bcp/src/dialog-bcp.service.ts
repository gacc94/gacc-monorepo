import { DOCUMENT } from "@angular/common";
import {
	ApplicationRef,
	createComponent,
	createEnvironmentInjector,
	type EmbeddedViewRef,
	EnvironmentInjector,
	Injectable,
	inject,
} from "@angular/core";
import { take } from "rxjs";
import { GaccDialogBcpComponent } from "./dialog-bcp.component";
import { DIALOG_BCP_CONFIG, type DialogBcpConfig } from "./dialog-bcp-options";
import { DialogBcpRef } from "./dialog-bcp-ref";

/**
 * @description Orchestrator service managing the dynamic creation, injection, and destruction of `GaccDialogBcpComponent` instances.
 * Operates outside of conventional Angular View encapsulation, appending elements directly onto the Document Body.
 */
@Injectable({
	providedIn: "root",
})
export class GaccDialogBcpService {
	/**
	 * @type {ApplicationRef}
	 * @description Reference to the root application used to manually hook dynamically instanced views to the CD cycle.
	 */
	private readonly appRef = inject(ApplicationRef);

	/**
	 * @type {EnvironmentInjector}
	 * @description Base context injector used to derive and provide isolated InjectionTokens per modal instance.
	 */
	private readonly environmentInjector = inject(EnvironmentInjector);

	/**
	 * @type {Document}
	 * @description Platform agnostic document reference safe for SSR (Server Side Rendering) DOM manipulation.
	 */
	private readonly document = inject(DOCUMENT);

	/**
	 * @description Instantiates and opens a BcpDialog wrapper manually rendering a `<bcp-modal>` element inside the DOM.
	 * Leverages Hexagonal Separation by not depending on CDK Overlay modules, reducing bundle size footprint.
	 *
	 * @template T Type of the Angular component to be rendered dynamically.
	 * @template R Expected type returned when the dialog successfully resolves.
	 *
	 * @param {DialogBcpConfig<T, R>} config - Type-safe configuration bridging Angular component context into Web Components domain.
	 * @returns {DialogBcpRef<T, R>} DialogBcpRef handle allowing manual stream closing and instance querying.
	 */
	open<T, R>(config: DialogBcpConfig<T, R>): DialogBcpRef<T, R> {
		const dialogRef = new DialogBcpRef<T, R>();

		// 1. Create a scoped child injector supplying component-specific configuration tokens
		const internalInjector = createEnvironmentInjector(
			[
				{ provide: DIALOG_BCP_CONFIG, useValue: config },
				{ provide: DialogBcpRef, useValue: dialogRef },
			],
			this.environmentInjector,
		);

		// 2. Instantiate the wrapper component structurally detached from template views
		const componentRef = createComponent(GaccDialogBcpComponent, {
			environmentInjector: this.environmentInjector,
			elementInjector: internalInjector,
		});

		// 3. Attach specifically to Angular Change Detection tree to hydrate bindings natively
		this.appRef.attachView(componentRef.hostView);

		// 4. Retrieve pure DOM element instance to append it synchronously to Body Context
		const domElement = (componentRef.hostView as EmbeddedViewRef<unknown>)
			.rootNodes[0] as HTMLElement;
		this.document.body.appendChild(domElement);

		// 5. Automatic Garbage Collection when dialog is fully processed logically by the underlying Observables
		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				this.appRef.detachView(componentRef.hostView);
				componentRef.destroy();
			});

		return dialogRef;
	}
}
