import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'change-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './change-button.component.html',
  styleUrls: ['./change-button.component.scss']
})
export class ChangeButtonComponent {
  @Input() buttonAction!: string;
  @Input() isProcessing!: boolean;
  @Input() isCanceling!: boolean;
  @Input() invalidInputVal!: boolean | null;
  @Output() change = new EventEmitter<void>();

  cancelButtonClicked() {
    this.change.emit(); 
  }

}
