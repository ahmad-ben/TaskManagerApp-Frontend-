import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'cancel-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterLink],
  templateUrl: './cancel-button.component.html', //?? Just inline
  styleUrls: ['./cancel-button.component.scss'] //?? Just inline
})
export class CancelButtonComponent {
  @Input() path! : string;
  @Input() isProcessing! : boolean;
  @Input() isCanceling! : boolean;
  @Output() cancel = new EventEmitter<void>();

  cancelButtonClicked() {
    this.cancel.emit(); 
  }
}
