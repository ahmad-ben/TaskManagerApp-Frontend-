import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'redirect-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redirect-button.component.html',
  styleUrls: ['./redirect-button.component.scss']
})
export class RedirectButtonComponent {
  @Input() buttonImageUrl!: string;
  @Input() buttonDescription!: string;
  @Input() buttonText!: string;

  @Output() btnClicked = new EventEmitter<void>();

  redirectButtonClicked(){
    this.btnClicked.emit();
  }

}
