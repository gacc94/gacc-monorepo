import type {
	EventEmitter,
	TemplateRef,
	Type,
	ViewContainerRef,
} from "@angular/core";

export const noopFn = () => {};
export type OnClickCallback<T> = (instance: T) => false | void | object;

export class GaccDialogOptions<T, U> {
	gaccCancelIcon?: string;
	gaccCancelText?: string | null;
	gaccClosable?: boolean;
	gaccContent?: string | TemplateRef<T> | Type<T>;
	gaccCustomClasses?: string | string[] | Set<string> | Record<string, any>;
	gaccData?: U;
	gaccDescription?: string;
	gaccHideFooter?: boolean;
	gaccMaskClosable?: boolean;
	gaccOkDestructive?: boolean;
	gaccOkDisabled?: boolean;
	gaccOkIcon?: string;
	gaccOkText?: string | null;
	gaccOnCancel?: EventEmitter<T> | OnClickCallback<T> = noopFn;
	gaccOnOk?: EventEmitter<T> | OnClickCallback<T> = noopFn;
	gaccTitle?: string | TemplateRef<T>;
	gaccViewContainerRef?: ViewContainerRef;
	gaccWidth?: string;
}
