import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    output,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@gacc/ui-kit/components/input';
import { ButtonComponent } from '@gacc/ui-kit/components/button';

/**
 * Gacc Form Component
 * @description A composed form component that integrates the gacc-input and gacc-button components.
 * It demonstrates how to build a reactive form utilizing the company's UI kit elements.
 */
@Component({
    selector: 'gacc-form',
    imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
    template: `
        <form [formGroup]="formGroup()" (ngSubmit)="onSubmit()" class="gacc-form">
            @if (title()) {
                <h3 class="gacc-form__title">{{ title() }}</h3>
            }

            <div class="gacc-form__content">
                <gacc-input
                    class="gacc-form__field"
                    [label]="emailLabel()"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    [value]="formGroup().get('email')?.value || ''"
                    (valueChange)="updateField('email', $event)"
                    [error]="getErrorMessage('email')"
                ></gacc-input>

                <gacc-input
                    class="gacc-form__field"
                    [label]="passwordLabel()"
                    type="password"
                    placeholder="********"
                    [value]="formGroup().get('password')?.value || ''"
                    (valueChange)="updateField('password', $event)"
                    [error]="getErrorMessage('password')"
                ></gacc-input>
            </div>

            <div class="gacc-form__actions">
                <gacc-button
                    tier="primary"
                    type="submit"
                    [disabled]="formGroup().invalid || isLoading()"
                    [fullWidth]="true"
                >
                    {{ submitText() }}
                </gacc-button>
            </div>
        </form>
    `,
    styleUrl: './form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FormComponent {
    /** Title of the form */
    title = input<string>('Iniciar Sesión');

    /** Label for the email field */
    emailLabel = input<string>('Correo Electrónico');

    /** Label for the password field */
    passwordLabel = input<string>('Contraseña');

    /** Text for the submit button */
    submitText = input<string>('Ingresar');

    /** Determines if the form is in a loading state */
    isLoading = input<boolean>(false);

    /** Event emitted when the form is successfully submitted. Emits the form value. */
    formSubmit = output<{ email: string; password: string }>();

    /** Reactive Form Group instance */
    protected formGroup = computed(() => {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    });

    constructor(private fb: FormBuilder) {}

    /**
     * Updates a specific field in the Reactive Form when the gacc-input changes.
     * @param field The name of the field to update
     * @param value The new value
     */
    updateField(field: string, value: string): void {
        const control = this.formGroup().get(field);
        if (control) {
            control.setValue(value);
            control.markAsTouched();
        }
    }

    /**
     * Resolves error messages for a specific form control.
     * @param field The field name
     * @returns The error message if any, otherwise undefined
     */
    getErrorMessage(field: string): string | undefined {
        const control = this.formGroup().get(field);
        if (control?.invalid && (control.dirty || control.touched)) {
            if (control.hasError('required')) return 'Este campo es obligatorio.';
            if (control.hasError('email')) return 'El formato del correo es inválido.';
            if (control.hasError('minlength')) return 'Debe tener al menos 6 caracteres.';
        }
        return undefined;
    }

    /**
     * Handles the native form submission.
     */
    onSubmit(): void {
        if (this.formGroup().valid && !this.isLoading()) {
            const rawValue = this.formGroup().getRawValue();
            this.formSubmit.emit({
                email: rawValue.email || '',
                password: rawValue.password || ''
            });
        } else {
            this.formGroup().markAllAsTouched();
        }
    }
}
