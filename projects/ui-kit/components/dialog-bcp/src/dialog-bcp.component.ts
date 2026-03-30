import {
	ChangeDetectionStrategy,
	Component,
	type ComponentRef,
	CUSTOM_ELEMENTS_SCHEMA,
	computed,
	inject,
	type OnInit,
	signal,
	ViewContainerRef,
	viewChild,
} from "@angular/core";
import { DIALOG_BCP_CONFIG, type DialogBcpConfig } from "./dialog-bcp-options";
import { DialogBcpRef } from "./dialog-bcp-ref";

/**
 * @description Enterprise Web Component wrapper acting as Dynamic container for injected components.
 * Driven strictly via native `@angular/core` ApplicationRef without CDK.
 * Interacts bidirectionally with `<bcp-modal>` Web component from the shared library.
 *
 * @template T Defines the injected Component Type representing the modal body payload.
 * @template R Defines the return Type mapped backward when the dialog interactions finish.
 */
@Component({
	selector: "gacc-dialog-bcp",
	standalone: true,
	templateUrl: "./dialog-bcp.component.html",
	styleUrl: "./dialog-bcp.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GaccDialogBcpComponent<T, R> implements OnInit {
	/**
	 * @type {DialogBcpConfig<T, R>}
	 * @description Configuration payloads containing visual rules and behaviors passed down from the Dialog Service.
	 */
	protected readonly config = inject<DialogBcpConfig<T, R>>(DIALOG_BCP_CONFIG);

	/**
	 * @type {DialogBcpRef<T, R>}
	 * @description Reference controller to communicate back success or cancellations with the Service caller.
	 */
	private readonly dialogRef = inject<DialogBcpRef<T, R>>(DialogBcpRef);

	/**
	 * @description Signal holding reference to ViewContainer native layout.
	 * Required to execute the manual creation and insertion of dynamic inner components.
	 */
	protected readonly viewContainer = viewChild.required("viewContainer", {
		read: ViewContainerRef,
	});

	/**
	 * @type {ComponentRef<T>}
	 * @description Instance pointer of the nested, dynamically generated user component wrapper.
	 */
	private componentRef!: ComponentRef<T>;

	/**
	 * @type {import('@angular/core').WritableSignal<boolean>}
	 * @description Control plane to trigger the Web Component modal attribute toggle (`is-open`).
	 */
	protected readonly isOpen = signal<boolean>(false);

	/**
	 * @description Evaluates dynamic classes passed through the dialog configuration mapping array.
	 * Follows purely BEM methodology CSS injections without leaking encapsulations.
	 * @returns {string} Fully evaluated DOM string targeting `bcp-modal` styles.
	 */
	protected readonly bcpClasses = computed(() => {
		const customClasses = this.config.customClass;
		if (typeof customClasses === "string") {
			return `gacc-dialog-bcp ${customClasses}`;
		}
		return "gacc-dialog-bcp";
	});

	/**
	 * @description Component lifecycle hooked internally triggered immediately after component generation.
	 * Responsibilities: Render dynamic child, wire custom Inputs with `setInput()`, bind interaction
	 * endpoints through Native `DialogRef` mappings, and synchronously spawn the web component visual states.
	 * @returns {void}
	 */
	ngOnInit(): void {
		// 1. Programmatic instantiation via ViewContainerRef pointing to <ng-container>
		this.componentRef = this.viewContainer().createComponent(
			this.config.content,
		);

		// 2. Dynamic Input injection using the native setInput API
		// Ensures full compatibility with Input Signals and zoneless detection cycles
		if (this.config.inputs) {
			Object.entries(this.config.inputs).forEach(([key, value]) => {
				this.componentRef.setInput(key, value);
			});
		}

		// 3. Exposes the instance for bidirectional interaction (onOk, onCancel, etc.)
		this.dialogRef.componentInstance = this.componentRef.instance;

		// 4. Immediate / synchronous opening of the Web Component
		// By the time it renders in the DOM, it's born with `is-open="true"`
		this.isOpen.set(true);
	}

	/**
	 * @description Callback method triggered by the primary confirm button (`<bcp-button variant="primary">`).
	 * Safely triggers the optionally configured `onOk` delegate mapped via `config`.
	 * Finalizes and closes the dialog ref with the custom payload if applicable.
	 * @returns {void}
	 */
	onOkClick(): void {
		if (this.config.onOk) {
			const result = this.config.onOk(this.componentRef.instance);
			this.dialogRef.close(result);
		} else {
			this.dialogRef.close();
		}
	}

	/**
	 * @description Triggered by the secondary cancel button.
	 * Its sole responsibility is to visually close the modal by toggling the state.
	 * It does NOT execute cleanup; that is delegated to the `onWebComponentClosed` event.
	 * @returns {void}
	 */
	onCancelClick(): void {
		this.isOpen.set(false);
	}

	/**
	 * @description Event listener catching natively dispatched CustomEvents from `<bcp-modal>` like `ctrlCloseModal`.
	 * Dispatches optionally provided callback hooks like `onCancel` prior to shutting down the `DialogRef` streams.
	 * @returns {void}
	 */
	onWebComponentClosed(): void {
		if (this.config.onCancel) {
			this.config.onCancel();
		}
		this.dialogRef.close();
	}
}
