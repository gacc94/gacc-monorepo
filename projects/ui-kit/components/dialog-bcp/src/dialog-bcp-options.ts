import { InjectionToken, type Type } from "@angular/core";

/**
 * @description Accessible configuration for the main BCP modal container.
 */
export interface BcpAccessibleConfig {
	/** @type {string | undefined}  @description The ID of the element that labels the modal container. */
	containerAriaLabelledby?: string;
	/** @type {string | undefined} @description The ID of the element that describes the modal container. */
	containerAriaDescribedby?: string;
}

/**
 * @description Accessible configuration for the BCP modal header.
 */
export interface BcpAccessibleHeaderConfig {
	/** @type {string | undefined} @description The accessible aria-label name for the close icon in the header. */
	accessibleNameCloseIcon?: string;
}

/**
 * @description Type-safe configuration layer mapping Angular behavior to the BCP Web Component.
 * Acts as the payload when opening a new dialog.
 */
export interface DialogBcpConfig<T = unknown, R = unknown> {
	// Angular Layer
	/** @type {Type<T>} @description The Angular component type to be dynamically instantiated inside the modal. */
	content: Type<T>;
	/** @type {Partial<T> | undefined} @description Strict dynamic data binding inputs to inject into the instantiated component. */
	inputs?: Partial<T>;
	/** @type {string | undefined} @description Custom CSS classes (ideally following BEM methodology) injected into the `<bcp-modal>` element. */
	customClass?: string;

	// BCP Web Component Layer
	/** @type {"sm" | "md" | "lg" | "xl" | undefined} @description Defines the responsive size variation of the modal. */
	size?: "sm" | "md" | "lg" | "xl";
	/** @type {number | undefined} @description Forces a specific maximum height for the modal (px). */
	height?: number;
	/** @type {number | undefined} @description Forces a specific maximum width for the modal (px). */
	width?: number;
	/** @type {boolean | undefined} @description When set to true, clicking the backdrop will not close the modal. */
	ignoreBackdropClick?: boolean;
	/** @type {boolean | undefined} @description Makes the modal occupy the full screen on mobile breakpoint. */
	responsiveFullScreen?: boolean;
	/** @type {boolean | undefined} @description Disables interaction with the rest of the application while the modal is open. */
	shouldInertBody?: boolean;
	/** @type {BcpAccessibleConfig | undefined} @description Advanced accessibility mappings for screen readers. */
	accessibleConfig?: BcpAccessibleConfig;

	// Headers and Texts
	/** @type {boolean | undefined} @description Controls the visibility of the close icon in the header. Default is true. */
	headerShowCloseIcon?: boolean;
	/** @type {BcpAccessibleHeaderConfig | undefined} @description Accessible mappings for the header block. */
	headerAccessibleConfig?: BcpAccessibleHeaderConfig;
	/** @type {string | undefined} @description HTML allowed title string rendered inside the modal header. */
	title?: string;
	/** @type {string | undefined} @description HTML allowed description string rendered below the title in the body. */
	description?: string;
	/** @type {string | undefined} @description HTML allowed text for the primary confirm button. If omitted, the button is not rendered. */
	okText?: string;
	/** @type {string | undefined} @description HTML allowed text for the secondary cancel button. If omitted, the button is not rendered. */
	cancelText?: string;

	// Inversion of Control flow
	/**
	 * @description Callback executed when the primary confirm button is clicked.
	 * @type {((instance: T) => R | undefined) | undefined}
	 * @returns The result payload `R` that will be fed to the `afterClosed()` stream.
	 */
	onOk?: (instance: T) => R | undefined;
	/**
	 * @description Callback executed when the modal is closed natively via backdrop click, esc key, or the secondary close/cancel buttons.
	 * @type {(() => void) | undefined}
	 */
	onCancel?: () => void;
}

/**
 * @description The InjectionToken used to provide the dialog configuration payload during the component instantiation.
 * @type {InjectionToken<DialogBcpConfig<unknown, unknown>>}
 */
export const DIALOG_BCP_CONFIG = new InjectionToken<
	DialogBcpConfig<unknown, unknown>
>("DIALOG_BCP_CONFIG");
