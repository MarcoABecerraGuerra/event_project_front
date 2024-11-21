import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoEventoService } from 'src/app/services/configuracion/tipo-evento.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-edit-tipo-evento',
  templateUrl: './edit-tipo-evento.component.html',
  styleUrls: ['./edit-tipo-evento.component.css']
})
export class EditTipoEventoComponent {

  formTipoEvento: FormGroup;
  submitted: boolean = false;
  @Input() idtipoEvento?: Number;
  @Input() tipoEvento?: any;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _tipoEventoService: TipoEventoService
  ){
    this.formTipoEvento = _fb.group({
      iddistrito: new FormControl(0),
      nombre: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  buildForm(){
    this.formTipoEvento.get('idtipo_evento')?.setValue(this.tipoEvento.idtipo_evento);
    this.formTipoEvento.get('nombre')?.setValue(this.tipoEvento.nombre);
  }

  actualizarTipoEvento(){
    const dataToSend = this.formTipoEvento.getRawValue();
    this._tipoEventoService.Actualizar(dataToSend).subscribe({
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
