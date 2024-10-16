import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistritoService } from 'src/app/services/configuracion/distrito.service';
import { NewDistritoComponent } from './new-distrito/new-distrito.component';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { EditDistritoComponent } from './edit-distrito/edit-distrito.component';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.css']
})
export class DistritoComponent implements OnInit{

  filterDistrito: FormGroup;
  submitted: boolean = false;
  distritoList: any[] = [];

  constructor(private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _distritoService: DistritoService
  ){
    this.filterDistrito = _fb.group({
      nombreDistrito: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.obtenerListaDistrito();
  }

  OpenModalNuevoDistrito(){

    const modalRef = this._modalService.open(NewDistritoComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaDistrito();
    });

  }

  OpenModalEditarDistrito(distrito: any){

    const modalRef = this._modalService.open(EditDistritoComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.distrito = distrito;
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaDistrito();
    });

  }

  obtenerListaDistrito(){
    let data = {};
    this._distritoService.ObtenerLista(data).subscribe(
      (val) =>{
        this.distritoList = val.data;
    });

  }

  openAlerta(titulo: string, mensaje: string) {
    const modalRef = this._modalService.open(AlertComponent , {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.title = titulo;
    modalRef.componentInstance.text = mensaje;
  }

  EliminarDistrito(distrito: any){
    const dataToSend = distrito;
    this._distritoService.Eliminar(dataToSend).subscribe({
      next: (data) => {
        this.openAlerta("Alerta", data.message);
        this.obtenerListaDistrito();
      },
      error: (err) => {
        this.openAlerta("Alerta", JSON.parse(err.message).message);
      }
    });
  }

  EliminarDistritoAlert(distrito: any){
    const modalRef = this._modalService.open(AlertComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.title = 'Alerta!';
    modalRef.componentInstance.text = `¿Está seguro de eliminar el distrito ${distrito.nombre}`;
    modalRef.componentInstance.showButtonConfirm = true;
    modalRef.componentInstance.showButtonCancell = true;
    modalRef.componentInstance.textConfirm = 'SI';
    modalRef.componentInstance.textCancell = 'NO';
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.EliminarDistrito(distrito);
    });
  }

}
