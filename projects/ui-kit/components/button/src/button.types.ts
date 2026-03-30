/**
 * Types and enumerations for the Gacc Button hierarchy, conforming to BCP Guidelines.
 * @description Provides the necessary literal types to configure button permutations safely.
 */
export type GaccButtonTier = "primary" | "secondary";

/**
 * The functional and structural type of the button.
 * @description Combines native HTML types (`button`, `submit`) with design system semantic shapes (`rectangle`, `circle`, etc).
 * @type {string}
 */
export type GaccButtonType =
	| "button"
	| "rectangle"
	| "circle"
	| "fixed"
	| "icon"
	| "square"
	| "submit"
	| "text";

/**
 * Specific visual shapes for the button.
 * @description Serves as a strictly visual alternative to the functional `type` property.
 * @type {string}
 */
export type GaccButtonShape =
	| "rectangle"
	| "circle"
	| "fixed"
	| "icon"
	| "square"
	| "text";

/**
 * Visualization modes based on surface contrast modes.
 * @description Adjusts the element's palette tailored either for `light` or `dark` t¨hemes.
 * @type {string}
 */
export type GaccButtonMode = "light" | "dark";

/**
 * Standardized sizing scale for the button.
 * @type {string | undefined}
 */
export type GaccButtonSize = "sm" | "md" | "lg" | undefined;

/**
 * ARIA accessibility configuration.
 * @description Enforces strict mapping of ARIA attributes to comply with screen reader and WCAG standards.
 */
export interface GaccAccessibleButton {
	/** Non-visible label for screen readers. */
	ariaLabel?: string;
	/** Defines the ID of the element that labels the button. */
	ariaLabelledBy?: string;
	/** Defines the ID of an element that describes the button conceptually. */
	ariaDescribedBy?: string;
	/** Indicates whether the element is disabled to accessibility clients. */
	ariaDisabled?: boolean | "true" | "false";
}

/**
 * Advanced aesthetic overrides for specific corner cases.
 * @description Primarily used to override the native padding or set alternative cursor styles.
 */
export interface GaccButtonSetup {
	/** Overrides the native padding boundaries (in px). */
	size?: number;
	/** Adjusts the CSS cursor style during hover states. */
	cursor?: string;
}
