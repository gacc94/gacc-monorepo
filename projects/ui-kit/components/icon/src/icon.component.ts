/**
 * Componente Angular que envuelve el web‑component `<bcp-icon>` del Design System BCP.
 *
 * @packageDocumentation
 */
import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	input,
	output,
} from "@angular/core";
import type { AccessibleIcon } from "./icon.types";

/**
 * `IconComponent` es un componente **standalone** con `OnPush` que expone sus
 * propiedades mediante **signals** (`input()`/`output()`).
 *
 * - `name` (requerido) corresponde al nombre exacto del icono según la lista
 *   oficial descrita en `ICON.md`.
 * - `color` acepta tokens de color del Design System (ej. `primary-500`).
 * - `size` permite los tamaños 16, 24, 32 y 48 px; por defecto 24.
 * - `accessible` provee la configuración de accesibilidad requerida por
 *   `<bcp-icon>`.
 * - `loaded` se emite cuando el web‑component dispara `ctrlIconDidLoad`.
 */
@Component({
	selector: "gacc-icon",
	standalone: true,
	templateUrl: "./icon.component.html",
	styleUrls: ["./icon.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconComponent {
	/** Nombre del icono (obligatorio). */
	readonly name = input.required<string>();

	/** Token de color opcional del Design System. */
	readonly color = input<string>();

	/** Tamaño en píxeles; valores permitidos 16,24,32,48. */
	readonly size = input<number>(24);

	/** Configuración de accesibilidad. */
	readonly accessible = input<AccessibleIcon>();

	/** Evento emitido cuando el icono ha sido cargado. */
	readonly loaded = output<void>();

	/** Clase CSS derivada del tamaño, útil para BEM modifiers. */
	get sizeClass(): string {
		return `gacc-icon--size-${this.size()}`;
	}

	/** Clase CSS derivada del color token. */
	get colorClass(): string | null {
		const c = this.color();
		return c ? `gacc-icon--color-${c}` : null;
	}
}
