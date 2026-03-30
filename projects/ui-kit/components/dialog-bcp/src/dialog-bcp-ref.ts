import { type Observable, Subject } from "rxjs";

/**
 * @description Handle to a running dialog-bcp component wrapper.
 * Used for programmatic interactions (closing with a result, getting the rendered instance, and listening to close events).
 * @template T Type of the inner component injected via ViewContainerRef.
 * @template R Type of the result passed back when the dialog closes.
 */
export class DialogBcpRef<T = unknown, R = unknown> {
	/**
	 * @type {Subject<R | undefined>}
	 * @description Private subject acting as an event bus to dispatch the dialog closing event.
	 */
	private readonly _afterClosed = new Subject<R | undefined>();

	/**
	 * @type {T | null}
	 * @description Property holding the rendered component instance mapped to the `content` property of the config.
	 * Can be injected and mutated by the user inside the web component wrapper.
	 */
	componentInstance: T | null = null;

	/**
	 * @description Unicast observable emitting when the web-component dialog wrapper gets closed.
	 * @returns {Observable<R | undefined>} Observable stream containing the dialog result payload `R`.
	 */
	afterClosed(): Observable<R | undefined> {
		return this._afterClosed.asObservable();
	}

	/**
	 * @description Finalizes the dialog stream. Used inside the DialogBcpService and Angular Wrapper to trigger cleanup.
	 * Dispatches the event to the `afterClosed` subscribers and completes the observable to prevent memory leaks.
	 * @param {R | undefined} [result] - Optional payload containing the response data from the dialog action.
	 * @returns {void}
	 */
	close(result?: R): void {
		this._afterClosed.next(result);
		this._afterClosed.complete();
	}
}
