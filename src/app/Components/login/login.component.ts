import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form !: FormGroup;
  constructor(private fb :FormBuilder, private authService: AuthService,private router : Router) { }

  ngOnInit(): void {
    if(this.authService.isLogin())
        this.router.navigate(['/home'])
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  Login()
{
  this.authService.login(this.form.value).then(res=>{
    if(res){
     this.router.navigate(['/home']);

    }
    else{
      alert("Invalid UserName or Password")
    }
  });
}
}
