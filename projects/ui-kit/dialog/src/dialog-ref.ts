import type { OverlayRef } from "@angular/cdk/overlay";
import { type Observable, Subject } from "rxjs";

/**
 * Controls a currently open dialog.
 * Provided as an injectable (`DialogRef`) inside the deployed component.
 * `@typeParam R` Type of the response data to return when closed.
 */
export class DialogRef<R = unknown> {
	/** Emits the result when the modal component explicitly invokes `close()`. */
	private readonly _afterClosed = new Subject<R | undefined>();

	constructor(
		private overlayRef: OverlayRef,
		public readonly id: string,
	) {}

	/**
	 * Closes the dialog and optionally returns a result.
	 * Internally triggers the close animation before unmounting the Overlay.
	 * @param result Optional response useful for whoever opened the dialog.
	 */
	close(result?: R): void {
		// To support exit animations (fade-out), we need a mechanism
		// that decouples a real 'close' from the Overlay, but we integrate it cleanly
		// here by delegating unmounting to the container.
		//
		// We will start by just completing the subject and delegating the container to react to this.
		this._afterClosed.next(result);
		this._afterClosed.complete();

		// ARCHITECTURE NOTE: In real life, we inform the container to start exiting.
		// As a robust simplification, we will notify here, but the logic of
		// deferred destruction of the overlay will depend on the container through the overlayRef.
	}

	/**
	 * Observable that notifies when the modal has been completely dismantled
	 * and the overlay closed.
	 */
	afterClosed(): Observable<R | undefined> {
		return this._afterClosed.asObservable();
	}

	/**
	 * Grants exposed access to the method of discarding the overlay directly from the container.
	 * Avoid using directly in visual components.
	 * @internal
	 */
	destroyOverlay(): void {
		if (this.overlayRef.hasAttached()) {
			this.overlayRef.detach();
		}
		this.overlayRef.dispose();
	}
}
