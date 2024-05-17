import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  session:boolean = false;
  sessionData?:string;
 
  constructor()
  {

  }

  ngOnInit() {
    this.obtenerDatosSesion();
  }

  obtenerDatosSesion()
  {
    this.sessionData = localStorage.getItem('authToken') || undefined;
    console.log(this.sessionData)

    if (this.sessionData !== undefined)
      {
        this.session = true;
      }

  }
  

}
