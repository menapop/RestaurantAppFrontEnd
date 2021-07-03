import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit , OnDestroy{
  islogin:boolean=false;
  roleId:number=0;
  sub!:Subscription;
  constructor(public authService:AuthService,private router:Router,public translate:TranslateService) {
    this.islogin=this.authService.isLogin();
    //this.roleId=this.authService.getRoleId();
  }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  ngOnInit(): void {

   this.sub=this.authService.loggedIn.subscribe(res=>{
     this.islogin=this.authService.isLogin();
     this.roleId=this.authService.getRoleId();
   });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/home'])
  }
  ToEnglish() {
    this.translate.use('en');
    document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr');
  }

  ToArabic() {
    this.translate.use('ar');
    document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl');
  }
}
