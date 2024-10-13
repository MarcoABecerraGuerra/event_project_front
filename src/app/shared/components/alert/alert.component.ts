import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() title: string = "";
  @Input() text: string = "";
  @Input() showButtonConfirm: boolean = true;
  @Input() showButtonCancell: boolean = false;
  @Input() textButtonConfirm: string = "Aceptar";
  @Input() textButtonCancell: string = "";
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();

  constructor(public _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.showButtonCancell && this.showButtonConfirm) {
      if (!this.textButtonCancell || this.textButtonCancell == null || this.textButtonCancell == "") {
        this.textButtonCancell = "NO";
      }
      if (this.textButtonConfirm == "Aceptar") {
        this.textButtonConfirm = "SI";
      }
    }
  }

  submmited(){
    this.notifyParent.next('');
    this._activeModal.dismiss('Cross click');
  }

}
