import { InjectionToken } from '@angular/core';

/**
 * Injection token used to share `data` with the component 
 * rendered inside a modal dialog. Provides type safety.
 * @example `public data = inject<MyDataInterface>(DIALOG_DATA);`
 */
export const DIALOG_DATA = new InjectionToken<unknown>('UiDialogData');
