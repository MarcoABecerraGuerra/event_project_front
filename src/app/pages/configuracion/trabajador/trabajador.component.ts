import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from 'src/app/services/configuracion/trabajador.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { NewTrabajadorComponent } from './new-trabajador/new-trabajador.component';
import { EditTrabajadorComponent } from './edit-trabajador/edit-trabajador.component';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit{
  filterTrabajador: FormGroup;
  submitted: boolean = false;
  trabajadorList: any[] = [];

  constructor(private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _trabajadorService: TrabajadorService
  ){
    this.filterTrabajador = _fb.group({
      nombreDistrito: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.obtenerListaTrabajador();
  }

  OpenModalNuevoTrabajador(){

    const modalRef = this._modalService.open(NewTrabajadorComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaTrabajador();
    });

  }

  OpenModalEditarTrabajador(trabajador: any){

    const modalRef = this._modalService.open(EditTrabajadorComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.trabajador = trabajador;
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaTrabajador();
    });

  }

  obtenerListaTrabajador(){
    let data = {};
    this._trabajadorService.ObtenerLista(data).subscribe(
      (val) =>{
        this.trabajadorList = val.data;
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

  EliminarTrabajador(distrito: any){
    const dataToSend = distrito;
    this._trabajadorService.Eliminar(dataToSend).subscribe({
      next: (data) => {
        this.openAlerta("Alerta", data.message);
        this.obtenerListaTrabajador();
      },
      error: (err) => {
        this.openAlerta("Alerta", JSON.parse(err.message).message);
      }
    });
  }

  EliminarTrabajadorAlert(trabajador: any){
    const modalRef = this._modalService.open(AlertComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.title = 'Alerta!';
    modalRef.componentInstance.text = `¿Está seguro de eliminar el distrito ${trabajador.nombre}`;
    modalRef.componentInstance.showButtonConfirm = true;
    modalRef.componentInstance.showButtonCancell = true;
    modalRef.componentInstance.textConfirm = 'SI';
    modalRef.componentInstance.textCancell = 'NO';
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.EliminarTrabajador(trabajador);
    });
  }
}
