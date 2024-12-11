import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/configuracion/cliente.service';
import { DistritoService } from 'src/app/services/configuracion/distrito.service';
import { TipoEventoService } from 'src/app/services/configuracion/tipo-evento.service';
import { TrabajadorService } from 'src/app/services/configuracion/trabajador.service';
import { ContratacionService } from 'src/app/services/principal/contratacion.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-new-contratacion',
  templateUrl: './new-contratacion.component.html',
  styleUrls: ['./new-contratacion.component.css']
})
export class NewContratacionComponent implements OnInit{

  formContratacion: FormGroup;
  submitted: boolean = false;
  clientes: any = [];
  trabajadores: any = [];
  tiposEvento: any = [];
  distritos: any = [];

  @Input() idContratacion?: Number;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _contratacionService: ContratacionService,
    private _clienteService: ClienteService,
    private _trabajadorService: TrabajadorService,
    private _tipoEventoService: TipoEventoService,
    private _distritoService: DistritoService
  ){
    this.formContratacion = _fb.group({
      idcliente: new FormControl(0),
      idtrabajador: new FormControl(0),
      idtipo_evento: new FormControl(0),
      iddistrito: new FormControl(0),
      idestado: new FormControl(1),
      fecha_evento: new FormControl(''),
      precio: new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.precargarListas();
  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  guardarContratacion(){
    const dataToSend = this.formContratacion.getRawValue();
    this._contratacionService.Registrar(dataToSend).subscribe({
      next: (data) => {
        this.notifyParent.next(data.message);
        this.close();
      },
      error: (err) => {
        this.openAlerta("Alerta", JSON.parse(err.message).message);
      }
    });
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

  obtenerListaClientes(){
    let data = {};
    this._clienteService.ObtenerLista(data).subscribe(
      (val) =>{
        this.clientes = val.data;
    });

  }

  obtenerListaTrabajador(){
    let data = {};
    this._trabajadorService.ObtenerLista(data).subscribe(
      (val) =>{
        this.trabajadores = val.data;
    });

  }

  obtenerListaTipoEvento(){
    let data = {};
    this._tipoEventoService.ObtenerLista(data).subscribe(
      (val) =>{
        this.tiposEvento = val.data;
    });

  }

  obtenerListaDistrito(){
    let data = {};
    this._distritoService.ObtenerLista(data).subscribe(
      (val) =>{
        this.distritos = val.data;
    });

  }

  precargarListas(){
    this.obtenerListaClientes();
    this.obtenerListaTrabajador();
    this.obtenerListaTipoEvento();
    this.obtenerListaDistrito();
  }



}
