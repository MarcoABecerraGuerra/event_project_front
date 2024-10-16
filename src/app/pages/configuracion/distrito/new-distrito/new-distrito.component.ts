import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistritoService } from 'src/app/services/configuracion/distrito.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-new-distrito',
  templateUrl: './new-distrito.component.html',
  styleUrls: ['./new-distrito.component.css']
})
export class NewDistritoComponent implements OnInit {

  formDistrito: FormGroup;
  submitted: boolean = false;
  @Input() idDistrito?: Number;
  @Output() notifyParent: EventEmitter<String> = new EventEmitter<String>();

  constructor(private _fb: FormBuilder,
    public _activeModal: NgbActiveModal,
    private _modalService: NgbModal,
    private _distritoService: DistritoService
  ){
    this.formDistrito = _fb.group({
      nombre: new FormControl('')
    })
  }

  ngOnInit(): void {

  }

  close() {
    this._activeModal.dismiss('Cross click');
  }

  guardarDistrito(){
    const dataToSend = this.formDistrito.getRawValue();
    this._distritoService.Registrar(dataToSend).subscribe({
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
