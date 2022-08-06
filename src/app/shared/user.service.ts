import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder , private http: HttpClient) { }
  readonly BaseUri  = "https://localhost:5001";

  formModel = this.fb.group({
    UserName : ['' , Validators.required],
    Email : [''  , Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
       Password : ['' , [Validators.required , Validators.minLength(4)]],
       ConfirmPassword : ['' , Validators.required]
    }, {validator : this.comparePasswords})
  });
  comparePasswords(fb: FormGroup){
    let ConfirmPassword =  fb.get('ConfirmPassword');
    console.log(ConfirmPassword);
    if(ConfirmPassword?.errors == null || 'passwordMismatch' in  ConfirmPassword.errors){
      if(fb.get('Password')?.value!= ConfirmPassword?.value){
          ConfirmPassword?.setErrors({
            passwordMismatch : true
          })
      }else{
        ConfirmPassword?.setErrors(null);
      }
    }
  }

  register(){
      var body = {
          UserName : this.formModel.value.UserName,
          Email : this.formModel.value.Email,
          Password : this.formModel.value.Passwords.Password,
          FullName : this.formModel.value.FullName
      };
     return this.http.post(this.BaseUri +"/Register" , body);
  }
}
