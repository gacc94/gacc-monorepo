/**
 * Configuration for opening a modal dialog.
 * Enables strong typing of the context data via `<D>`.
 */
export interface DialogConfig<D = unknown> {
	/** Data injected into the user component that renders the modal. */
	data?: D;

	/** Width of the dialog. Supports px, %, vw values (`'400px'`, `'80vw'`, etc). */
	width?: string;

	/** Height of the dialog. */
	height?: string;

	/** Max-height. Usually '90vh' or similar to prevent it from exceeding the screen. */
	maxHeight?: string;

	/** Max-width. Usually '90vw' or '100vw'. */
	maxWidth?: string;

	/** If `true`, the modal cannot be closed by clicking outside or pressing `Esc`. */
	disableClose?: boolean;

	/** Additional CSS class for the modal's panel container. Useful for strict theming. */
	panelClass?: string | string[];

	/** CSS class to inject into the dialog backdrop. */
	backdropClass?: string | string[];

	/** Id of the element to focus when the dialog finishes animating (initial focus). Useful for forms. */
	autoFocus?: boolean | string;
}
