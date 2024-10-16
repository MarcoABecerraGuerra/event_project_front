import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

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
    private _modalService: NgbModal
  ){
    this.filterDistrito = _fb.group({
      nombreDistrito: new FormControl('')
    })
  }

  ngOnInit(): void {

  }

  OpenModalNuevaContratacion(){

  }

  OpenModalEditarContratacion(contratacion: any){

  }

  EliminarContratacionAlert(contratacion: any){

  }

}
