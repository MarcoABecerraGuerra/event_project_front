import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/configuracion/cliente.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit{

  formCliente: FormGroup;
  submitted: boolean = false;
  @Input() idCliente?: Number;
  @Input() cliente?: any;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _clienteService: ClienteService
  ){
    this.formCliente = _fb.group({
      idcliente: new FormControl(0),
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      direccion: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  buildForm(){
    this.formCliente.get('idcliente')?.setValue(this.cliente.idcliente);
    this.formCliente.get('nombre')?.setValue(this.cliente.nombre);
    this.formCliente.get('telefono')?.setValue(this.cliente.telefono);
    this.formCliente.get('email')?.setValue(this.cliente.email);
    this.formCliente.get('direccion')?.setValue(this.cliente.direccion);
  }

  actualizarCliente(){
    const dataToSend = this.formCliente.getRawValue();
    this._clienteService.Actualizar(dataToSend).subscribe({
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

}
