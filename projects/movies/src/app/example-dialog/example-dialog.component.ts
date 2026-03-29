import { Component, inject } from "@angular/core";
import { ButtonComponent } from "@gacc/ui-kit/components/button";
import { DIALOG_DATA, DialogRef } from "@gacc/ui-kit/components/dialog";

@Component({
	selector: "app-example-dialog",
	standalone: true,
	imports: [ButtonComponent],
	styles: [
		`
        h2 { margin-top: 0; }
        p { color: #555; line-height: 1.5; margin-bottom: 24px; }
        .actions { display: flex; gap: 8px; justify-content: flex-end; }
        `,
	],
	template: `
    <h2>Dialog Example</h2>
    <p>
      Este es un ejemplo de contenido dinámico insertado en el diálogo.
      Los datos recibidos son: <strong>{{ data?.message }}</strong>
    </p>

    <div class="actions">
      <gacc-button variant="outline" (click)="closeDialog(false)">Cancelar</gacc-button>
      <gacc-button variant="primary" (click)="closeDialog(true)">Aceptar</gacc-button>
    </div>
  `,
})
export class ExampleDialogComponent {
	data = inject<{ message: string }>(DIALOG_DATA, { optional: true });
	private dialogRef = inject(DialogRef<boolean>);

	closeDialog(result: boolean) {
		this.dialogRef.close(result);
	}
}
