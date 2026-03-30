import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    output,
    ViewEncapsulation,
} from '@angular/core';
import type {
    GaccButtonTier,
    GaccButtonType,
    GaccButtonShape,
    GaccButtonMode,
    GaccButtonSize,
    GaccAccessibleButton,
    GaccButtonSetup,
} from './button.types';

/**
 * Primary component for Gacc Buttons.
 * @description Governed by BCP guidelines regarding accessibility, typography, light/dark modes, and interactive states.
 * 
 * @example
 * <gacc-button
 *   tier="primary"
 *   type="rectangle"
 *   size="md"
 *   [active]="true"
 *   [accessibleConfig]="{ ariaLabel: 'Confirm payment' }"
 *   (ctrlClick)="onConfirm()"
 * >
 *   Confirm
 * </gacc-button>
 */
@Component({
    selector: 'gacc-button',
    template: `
        <button
            class="gacc-button"
            [class]="buttonClasses()"
            [disabled]="disabled()"
            [attr.aria-label]="accessibleConfig()?.ariaLabel"
            [attr.aria-labelledby]="accessibleConfig()?.ariaLabelledBy"
            [attr.aria-describedby]="accessibleConfig()?.ariaDescribedBy"
            [attr.aria-disabled]="disabled() || accessibleConfig()?.ariaDisabled"
            [attr.type]="nativeType()"
            [style.cursor]="buttonSetup().cursor"
            [style.padding.px]="buttonSetup().size"
            (click)="onClicked($event)"
            (focus)="onFocus($event)"
            (blur)="onBlur($event)"
        >
            <!-- Slot Start / Icon Start -->
            @if (hasContent()) {
                <span class="gacc-button__start">
                    <ng-content select="[slot=start]"></ng-content>
                </span>
            }

            <!-- Default Content -->
            <span class="gacc-button__content">
                <ng-content></ng-content>
            </span>

            <!-- Slot End / Icon End -->
            @if (hasContent()) {
                <span class="gacc-button__end">
                    <ng-content select="[slot=end]"></ng-content>
                </span>
            }

            <!-- Slot Icon Only -->
            @if (hasContent()) {
                <span class="gacc-button__icon-only">
                    <ng-content select="[slot=icon-only]"></ng-content>
                </span>
            }
        </button>
    `,
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
    /** 
     * Marks the button as active (acting similarly to a selected toggle state). 
     * @type {InputSignal<boolean>}
     */
    active = input<boolean>(false);

    /** 
     * Animates the bottom border on hover. (Only applicable with type="text"). 
     * @type {InputSignal<boolean>}
     */
    borderAnimate = input<boolean>(false);

    /** 
     * Disables user interaction and adds disabled focus visual cues. 
     * @type {InputSignal<boolean>}
     */
    disabled = input<boolean>(false);

    /** 
     * Expands the button to occupy the full width of its container. 
     * @type {InputSignal<boolean>}
     */
    fullWidth = input<boolean>(false);

    /** 
     * Advanced customizations overriding predefined borders, padding, and cursor shapes. 
     * @type {InputSignal<GaccButtonSetup>}
     */
    buttonSetup = input<GaccButtonSetup>({ size: 0, cursor: 'pointer' });

    /** 
     * The base color scheme orientation. Useful for very dark or very light backgrounds. 
     * @type {InputSignal<GaccButtonMode>}
     */
    mode = input<GaccButtonMode>('light');

    /** 
     * Default dimension scale of the button. 
     * @type {InputSignal<GaccButtonSize>}
     */
    size = input<GaccButtonSize>(undefined);

    /** 
     * Visual hierarchy weight of the call to action (CTA). 
     * @type {InputSignal<GaccButtonTier>}
     */
    tier = input<GaccButtonTier>('primary');

    /** 
     * Defines the operative functional layout pattern. 
     * @type {InputSignal<GaccButtonType>}
     */
    type = input<GaccButtonType>('button');

    /** 
     * Priority definition for structural configuration, replacing native `type` weights if it is not form-related. 
     * @type {InputSignal<GaccButtonShape>}
     */
    shape = input<GaccButtonShape>('rectangle');

    /** 
     * Strict mapping to ARIA properties, dictating content for screen readers. 
     * @type {InputSignal<GaccAccessibleButton | undefined>}
     */
    accessibleConfig = input<GaccAccessibleButton>();

    // --- Output Signals ---

    /** 
     * Triggered safely upon native click unless disabled. 
     * @type {OutputEmitterRef<void>}
     */
    ctrlClick = output<void>();

    /** 
     * Triggered when the button gains focus. 
     * @type {OutputEmitterRef<void>}
     */
    ctrlFocus = output<void>();

    /** 
     * Triggered when the button loses focus. 
     * @type {OutputEmitterRef<void>}
     */
    ctrlBlur = output<void>();

    /**
     * @description Dynamically resolves the list of BEM classes based on the active inputs.
     * @returns {string} Space-separated CSS classes string.
     */
    protected buttonClasses = computed(() => {
        const classes = [
            `gacc-button--${this.tier()}`,
            `gacc-button--${this.mode()}`,
            `gacc-button--type-${this.type()}`,
            `gacc-button--shape-${this.shape()}`,
        ];

        if (this.size()) {
            classes.push(`gacc-button--size-${this.size()}`);
        }
        if (this.active()) {
            classes.push('gacc-button--active');
        }
        if (this.fullWidth()) {
            classes.push('gacc-button--full-width');
        }
        if (this.borderAnimate() && this.type() === 'text') {
            classes.push('gacc-button--border-animate');
        }

        return classes.join(' ');
    });

    /**
     * @description Extracts the native `<button type="...">` attribute, considering functional structure vs styling defaults.
     * @returns {"submit" | "button"}
     */
    protected nativeType = computed(() => {
        const t = this.type();
        return t === 'submit' ? 'submit' : 'button';
    });

    /** 
     * @description Helper used conditionally by the template's *ngIf/@if directives for content rendering constraints. 
     * @returns {boolean}
     */
    hasContent(): boolean {
        return true; 
    }

    /**
     * @description Intercepts the native MouseEvent to validate disabled states before broadcasting.
     * @param {MouseEvent} event 
     */
    onClicked(event: MouseEvent): void {
        if (!this.disabled()) {
            this.ctrlClick.emit();
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * @description Manages native FocusEvent propagation to output.
     * @param {FocusEvent} _event 
     */
    onFocus(_event: FocusEvent): void {
        this.ctrlFocus.emit();
    }

    /**
     * @description Manages native BlurEvent (focusout) propagation to output.
     * @param {FocusEvent} _event 
     */
    onBlur(_event: FocusEvent): void {
        this.ctrlBlur.emit();
    }
}
