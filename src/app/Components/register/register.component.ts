import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form !: FormGroup;
  constructor(private fb :FormBuilder, private authService: AuthService,private router : Router) { }

  ngOnInit(): void {
    if(this.authService.isLogin()){
      this.router.navigate(['/home']);
      window.location.reload();
    }
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      firstName:[null, Validators.required],
      mobile:[null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
Register()
{
  this.authService.Register(this.form.value).then(res=>{
    if(res){
     this.router.navigate(['/home'])
    }
    else{
      alert("Email Exist Before ")
    }
  });
}

}
