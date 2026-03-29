import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AvatarComponent } from "@gacc/ui-kit/components/avatar";
import { BadgeComponent } from "@gacc/ui-kit/components/badge";
import { ButtonComponent } from "@gacc/ui-kit/components/button";
import { CardComponent } from "@gacc/ui-kit/components/card";
import { GaccDialogService } from "@gacc/ui-kit/components/dialog";
import { InputComponent } from "@gacc/ui-kit/components/input";
import { SpinnerComponent } from "@gacc/ui-kit/components/spinner";
import { ExampleDialogComponent } from "./example-dialog/example-dialog.component";

@Component({
	selector: "gacc-root",
	imports: [
		RouterOutlet,
		ButtonComponent,
		CardComponent,
		InputComponent,
		AvatarComponent,
		BadgeComponent,
		SpinnerComponent,
	],
	templateUrl: "./app.html",
	styleUrl: "./app.scss",
})
export class App {
	protected readonly title = signal("movies");
	private readonly dialogService = inject(GaccDialogService);

	clickedBtn(msg: string) {
		console.log("Button clicked: ", msg);
	}

	openDialog() {
		this.dialogService.create({
			gaccContent: ExampleDialogComponent,
			gaccTitle: "Dialog Example",
			gaccDescription:
				"Este es el subtitulo administrado directamente por la nueva configuración",
			gaccData: { message: "¡Hola desde GaccDialogService!" },
			gaccWidth: "600px",
			gaccClosable: true,
			gaccMaskClosable: false,
			gaccCustomClasses: "custom-dialog",
			gaccCancelText: "Cancelar Acción",
			gaccOkText: "Continuar",
			gaccOkDestructive: true,
			gaccOnOk: ({ dialogRef }: any) => {
				console.log("Dialog Ok Callback Fired", {
					result: dialogRef.componentInstance,
				});
			},
			gaccOnCancel: ({ dialogRef }: any) => {
				console.log("Dialog Cancel Callback Fired", {
					result: dialogRef.componentInstance,
				});
			},
		});
	}
}
