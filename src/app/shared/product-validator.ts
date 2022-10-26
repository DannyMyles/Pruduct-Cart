import { AbstractControl, ValidatorFn } from "@angular/forms"


//Creating a function validator that accepts more than one parameters(Factory function)

export function forbidenNameValidator (forbidenName: RegExp): ValidatorFn{
      return (control: AbstractControl): { [key: string]: any; } | null => {
            const forbiden = forbidenName.test(control.value);
            return forbiden ? { 'forbidenName': { 'value': control.value } } : null;
      };    
}
