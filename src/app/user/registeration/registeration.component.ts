import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  constructor(public service: UserService , private toastr: ToastrService ) { }

  ngOnInit() {
  }
  onSubmit(){
    this.service.register().subscribe(
        (res : any) => {
            if(res.succeeded){
              this.service.formModel.reset();
              this.toastr.success('New User!' , 'Registeration Successfully');
            }else{
             res.errors.forEach((elements: { code: any , description : any; }) =>{
               switch(elements.code){
                 case 'DuplicateUserName':
                   //Duplicate Username//
                   this.toastr.error(elements.description , 'Registeartion Failed');
                  break;

                  default:
                    //Registeration Failed//
                    this.toastr.error(elements.description , 'Registeartion Failed');
                  break;
               }
             })
            }
        },
        error => {
          console.log(error);
        }
    )
  }

}
