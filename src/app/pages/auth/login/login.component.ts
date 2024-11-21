import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;

  constructor(private _fb: FormBuilder,
    private _loginService: LoginService,
    private _menuService: MenuService,
    private _router: Router,
    private _modalService: NgbModal) {
    this.loginGroup = _fb.group({
      username: new FormControl(''),
      pass: new FormControl('')
    });
  }

  ngOnInit(){

  }

  Acceder(){
    const dataToSend = this.loginGroup.getRawValue();
    console.log('datatoSend', dataToSend);
      this._loginService.AccederLogin(dataToSend).subscribe({
        next: (data) => {
          console.log('Respuesta',data); // Manejar la respuesta exitosa
          localStorage.setItem('infoUsuario',data.data);
          this._router.navigate(['/menu']);
          this.obtenerMenu();
        },
        error: (err) => {
          this.openAlerta("Alerta", JSON.parse(err.message).message);
        }
      }
    );
  }

  openAlerta(titulo: string, mensaje: string) {
    const modalRef = this._modalService.open(AlertComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.title = titulo;
    modalRef.componentInstance.text = mensaje;
  }


  obtenerMenu() {
    let data = {};
    this._menuService.obtenerMenu(data).subscribe(
      (val) =>{
        localStorage.removeItem('menu');
        localStorage.setItem('menu', JSON.stringify(val.data));
        //this._menuService.setMenuOptions(val.data);
    });
  }

  singOut() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
