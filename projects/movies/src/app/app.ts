import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AvatarComponent } from "@gacc/ui-kit/components/avatar";
import { BadgeComponent } from "@gacc/ui-kit/components/badge";
import { ButtonComponent } from "@gacc/ui-kit/components/button";
import { CardComponent } from "@gacc/ui-kit/components/card";
import { DialogService } from "@gacc/ui-kit/components/dialog";
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
	private readonly dialogService = inject(DialogService);

	clickedBtn(msg: string) {
		console.log("Button clicked: ", msg);
	}

	openDialog() {
		const dialogRef = this.dialogService.open(ExampleDialogComponent, {
			data: { message: "¡Hola desde DialogService!" },
			width: "600px",
			disableClose: true,
			panelClass: "custom-dialog",
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("Diálogo cerrado, resultado:", result);
		});
	}
}
