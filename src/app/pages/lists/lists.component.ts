import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ListService } from 'src/app/services/lists/list.service';
import { ListType } from 'src/app/shared/types/listType';

@Component({
  selector: 'lists',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  @Input('listId') listId: string = '';
  @Input('listsArray') listsArray: ListType[] = [];

  @Output('noteIconClicked') noteIconClickedInChild: EventEmitter<boolean> =
    new EventEmitter();

  listService = inject(ListService);
  router = inject(Router);

  noteIconClicked() {
    console.log('noteIconClicked in child works...');
    this.noteIconClickedInChild.emit();
  }

  deleteList() {
    console.log('deleteList works with', this.listId);
    this.listService.deleteList(this.listId).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/homePage/lists');
      },
    });
  }
}
