import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: 'delete-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  @Input() deleteText!: string;
  @Input() isDeleting: boolean = false;
  
  @Output() btnClick = new EventEmitter();

  deleteBtnClicked() {
    this.btnClick.emit();
  }

}