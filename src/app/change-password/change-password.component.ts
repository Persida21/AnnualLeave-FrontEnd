
import { Component ,OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, } from '@angular/forms';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  implements OnInit {
    reactiveForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
        this.reactiveForm = this.formBuilder.group({
            username: new FormControl(null, [Validators.required] ),
            password: new FormControl(['']),
            confirmPassword: new FormControl(['', Validators.required]),
        }, {
            validator:[this.MustMatch('password', 'confirmPassword')] 
        });
    }
    submitted: boolean = false;
    get f() { return this.reactiveForm.controls; }
    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            console.log("mustmatch")
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    ngOnInit() { }
    ch(e: any) {
        if (e.checked) {
            this.reactiveForm.controls['password'].setValidators([Validators.required])
            this.reactiveForm.controls['password'].updateValueAndValidity()
        }
        else {
            this.reactiveForm.controls['password'].setValidators(null)
            this.reactiveForm.controls['password'].updateValueAndValidity()
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.reactiveForm.invalid) {
            return;
        }
    }
}