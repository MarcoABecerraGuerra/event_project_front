import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/configuracion/cliente.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css']
})
export class NewClienteComponent implements OnInit{
  formCliente: FormGroup;
  submitted: boolean = false;
  @Input() idDistrito?: Number;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _clienteService: ClienteService
  ){
    this.formCliente = _fb.group({
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      direccion: new FormControl('')
    })
  }

  ngOnInit(): void {

  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  guardarCliente(){
    const dataToSend = this.formCliente.getRawValue();
    this._clienteService.Registrar(dataToSend).subscribe({
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
