/**
 * Tipos y interfaces para el componente Icon.
 *
 * @packageDocumentation
 */

/** Configuración de accesibilidad para un icono */
export interface AccessibleIcon {
	/** Nombre accesible para lectores de pantalla */
	iconAccessibleName: string;
	/** Título opcional que aparece como tooltip */
	iconAccessibleTitle?: string;
}

/** Configuración completa del icono */
export interface IconConfig {
	/** Nombre exacto del icono (ver lista oficial) */
	name: string;
	/** Token de color del Design System, ej. 'primary-500' */
	color?: string;
	/** Tamaño en píxeles (16, 24, 32, 48) */
	size?: 16 | 24 | 32 | 48;
	/** Configuración de accesibilidad */
	accessible?: AccessibleIcon;
}
