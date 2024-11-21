import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from 'src/app/services/configuracion/trabajador.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-new-trabajador',
  templateUrl: './new-trabajador.component.html',
  styleUrls: ['./new-trabajador.component.css']
})
export class NewTrabajadorComponent {

  formTrabajador: FormGroup;
  submitted: boolean = false;
  @Input() idTrabajador?: Number;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _trabajadorService: TrabajadorService
  ){
    this.formTrabajador = _fb.group({
      nombre: new FormControl(''),
      experiencia: new FormControl(''),
      disponible: new FormControl(''),
    })
  }

  ngOnInit(): void {

  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  guardarTrabajador(){
    const dataToSend = this.formTrabajador.getRawValue();
    this._trabajadorService.Registrar(dataToSend).subscribe({
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
