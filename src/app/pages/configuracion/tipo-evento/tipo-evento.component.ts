import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { EditTipoEventoComponent } from './edit-tipo-evento/edit-tipo-evento.component';
import { NewTipoEventoComponent } from './new-tipo-evento/new-tipo-evento.component';
import { TipoEventoService } from 'src/app/services/configuracion/tipo-evento.service';

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.css']
})
export class TipoEventoComponent implements OnInit{

  filterTipoEvento: FormGroup;
  submitted: boolean = false;
  tipoEventoList: any[] = [];

  constructor(private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _tipoEventoService: TipoEventoService
  ){
    this.filterTipoEvento = _fb.group({
      nombreTipoEvento: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.obtenerListaTipoEvento();
  }

  OpenModalNuevoCliente(){

    const modalRef = this._modalService.open(NewTipoEventoComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaTipoEvento();
    });

  }

  OpenModalEditarTipoEvento(tipoEvento: any){

    const modalRef = this._modalService.open(EditTipoEventoComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'xl'
    });
    modalRef.componentInstance.tipoEvento = tipoEvento;
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.openAlerta('Operación Exitosa', $event);
      this.obtenerListaTipoEvento();
    });

  }

  obtenerListaTipoEvento(){
    let data = {};
    this._tipoEventoService.ObtenerLista(data).subscribe(
      (val) =>{
        this.tipoEventoList = val.data;
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

  EliminarTipoEvento(tipoevento: any){
    const dataToSend = tipoevento;
    this._tipoEventoService.Eliminar(dataToSend).subscribe({
      next: (data) => {
        this.openAlerta("Alerta", data.message);
        this.obtenerListaTipoEvento();
      },
      error: (err) => {
        this.openAlerta("Alerta", JSON.parse(err.message).message);
      }
    });
  }

  EliminarTipoEventoAlert(tipoevento: any){
    const modalRef = this._modalService.open(AlertComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.title = 'Alerta!';
    modalRef.componentInstance.text = `¿Está seguro de eliminar el distrito ${tipoevento.nombre}`;
    modalRef.componentInstance.showButtonConfirm = true;
    modalRef.componentInstance.showButtonCancell = true;
    modalRef.componentInstance.textConfirm = 'SI';
    modalRef.componentInstance.textCancell = 'NO';
    modalRef.componentInstance.notifyParent.subscribe(($event: any) => {
      this.EliminarTipoEvento(tipoevento);
    });
  }

}
