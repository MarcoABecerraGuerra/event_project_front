import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { NewContratacionComponent } from './new-contratacion/new-contratacion.component';
import { ContratacionService } from 'src/app/services/principal/contratacion.service';
import { EditContratacionComponent } from './edit-contratacion/edit-contratacion.component';

@Component({
  selector: 'app-contratacion',
  templateUrl: './contratacion.component.html',
  styleUrls: ['./contratacion.component.css']
})
export class ContratacionComponent implements OnInit {

  filterDistrito: FormGroup;
  submitted: boolean = false;
  contratacionList: any[] = [];

  constructor(private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _contratacionService: ContratacionService
  ){
    this.filterDistrito = _fb.group({
      nombreDistrito: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.obtenerListaContratacion();
  }

  obtenerListaContratacion(){
    let data = {};
    this._contratacionService.ObtenerLista(data).subscribe(
      (val) =>{
        this.contratacionList = val.data;
    });

  }

  OpenModalNuevaContratacion(){

    const modalRef = this._modalService.open(NewContratacionComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaContratacion();
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

  OpenModalEditarContratacion(contratacion: any){

    const modalRef = this._modalService.open(EditContratacionComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.contratacion = contratacion;
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaContratacion();
    });

  }

  EliminarContratacion(contratacion: any){
    const dataToSend = contratacion;
    this._contratacionService.Eliminar(dataToSend).subscribe({
      next: (data) => {
        this.openAlerta("Alerta", data.message);
        this.obtenerListaContratacion();
      },
      error: (err) => {
        this.openAlerta("Alerta", JSON.parse(err.message).message);
      }
    });
  }

  EliminarContratacionAlert(contratacion: any){
    const modalRef = this._modalService.open(AlertComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.title = 'Alerta!';
    modalRef.componentInstance.text = `¿Está seguro de eliminar la contratacion?`;
    modalRef.componentInstance.showButtonConfirm = true;
    modalRef.componentInstance.showButtonCancell = true;
    modalRef.componentInstance.textConfirm = 'SI';
    modalRef.componentInstance.textCancell = 'NO';
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.EliminarContratacion(contratacion);
    });
  }

}
