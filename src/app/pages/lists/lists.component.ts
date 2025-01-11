import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ListService } from 'src/app/services/lists/list.service';
import { ListType } from 'src/app/shared/types/listType';

@Component({
  selector: 'lists',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterLink, RouterLinkActive],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  @Input('listId') listId: string = '';
  @Input('listsArray') listsArray: ListType[] = [];

  listService = inject(ListService);
  router = inject(Router);
  aRouter = inject(ActivatedRoute);

  loadingListId: string | null = null;

  constructor() {
    this.router.events.subscribe((event) => {
      // Reset loading when navigation ends
      if (event instanceof NavigationEnd) this.loadingListId = null;
    });
  }

  @Output('noteIconClicked') noteIconClickedInChild: EventEmitter<boolean> =
    new EventEmitter();

  noteIconClicked() {
    this.noteIconClickedInChild.emit();
  };

  onLinkClick(listId: string){
    // Don't show the spinner if we clicked in the current list. 
    if (this.aRouter.snapshot.params["listId"] === listId) return;
    this.loadingListId = listId;
  }

  deleteList() {
    this.listService.deleteList(this.listId).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/homePage/lists'); //? No Need just delete it from array
      },
    });
  }
}
