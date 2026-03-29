import {
	Component,
	inject,
	inputBinding,
	outputBinding,
	signal,
	type Type,
	twoWayBinding,
	ViewContainerRef,
} from "@angular/core";
import { ButtonComponent } from "@gacc/ui-kit/components/button";
import { GACC_MODAL_DATA, GaccDialogRef } from "@gacc/ui-kit/components/dialog";

@Component({
	selector: "app-example-dialog",
	standalone: true,
	imports: [ButtonComponent],
	styles: [
		`
        p { color: #555; line-height: 1.5; margin-bottom: 24px; }
        .actions { display: flex; gap: 8px; justify-content: flex-end; }
        `,
	],
	template: `
    <p>
      Este es un ejemplo de contenido dinámico insertado de forma pura en el diálogo, actuando ajeno al header y footer administrado por el GaccDialogComponent.
      <br/><br/>
      Los datos recibidos por inyección son: <strong>{{ data?.message }}</strong>
    </p>

    <div class="actions">
      <!-- Example usage of programmatic inner override functionality if the default footer is disabled -->
      <gacc-button variant="outline" (clicked)="closeDialog(false)">Rechazar Interno</gacc-button>
    </div>
  `,
})
export class ExampleDialogComponent {
	data = inject<{ message: string }>(GACC_MODAL_DATA, { optional: true });
	private dialogRef = inject(GaccDialogRef);

	private vcf = inject(ViewContainerRef);
	private component!: Type<any>;

	closeDialog(result: boolean) {
		this.dialogRef.close(result);
	}
}
