import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'link-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() linkUrl!: string;
  @Input() imageSource!: string;
  @Input() imageAltText!: string;
  @Input() linkText!: string;
}
