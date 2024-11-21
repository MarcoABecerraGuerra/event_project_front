import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from 'src/app/services/configuracion/trabajador.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-edit-trabajador',
  templateUrl: './edit-trabajador.component.html',
  styleUrls: ['./edit-trabajador.component.css']
})
export class EditTrabajadorComponent implements OnInit{
  formTrabajador: FormGroup;
  submitted: boolean = false;
  @Input() idTrabajador?: Number;
  @Input() trabajador?: any;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _trabajadorService: TrabajadorService
  ){
    this.formTrabajador = _fb.group({
      idtrabajador: new FormControl(0),
      nombre: new FormControl(''),
      experiencia: new FormControl(''),
      disponible: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  buildForm(){
    this.formTrabajador.get('idtrabajador')?.setValue(this.trabajador.idtrabajador);
    this.formTrabajador.get('nombre')?.setValue(this.trabajador.nombre);
    this.formTrabajador.get('experiencia')?.setValue(this.trabajador.experiencia);
    this.formTrabajador.get('disponible')?.setValue(this.trabajador.disponible);
  }

  actualizarTrabajador(){
    const dataToSend = this.formTrabajador.getRawValue();
    this._trabajadorService.Actualizar(dataToSend).subscribe({
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
