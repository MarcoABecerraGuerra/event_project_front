import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoEventoService } from 'src/app/services/configuracion/tipo-evento.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-new-tipo-evento',
  templateUrl: './new-tipo-evento.component.html',
  styleUrls: ['./new-tipo-evento.component.css']
})
export class NewTipoEventoComponent implements OnInit {

  formTipoEvento: FormGroup;
  submitted: boolean = false;
  @Input() idDistrito?: Number;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _tipoEventoService: TipoEventoService
  ){
    this.formTipoEvento = _fb.group({
      nombre: new FormControl('')
    })
  }

  ngOnInit(): void {

  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  guardarTipoEvento(){
    const dataToSend = this.formTipoEvento.getRawValue();
    this._tipoEventoService.Registrar(dataToSend).subscribe({
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
