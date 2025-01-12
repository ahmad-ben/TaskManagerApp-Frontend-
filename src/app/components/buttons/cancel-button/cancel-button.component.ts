import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cancel-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-button.component.html', //?? Just inline
  styleUrls: ['./cancel-button.component.scss'] //?? Just inline
})
export class CancelButtonComponent {
  @Input() path! : string;
  @Input() isProcessing! : boolean;
}
