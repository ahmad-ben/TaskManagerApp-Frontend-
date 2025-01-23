import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd, ActivatedRoute } from '@angular/router';
import { finalize, pipe } from 'rxjs';
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
  @Input('dropdownVisibility') dropdownVisibility!: boolean;

  @Output('changeDropdownVisibility') changeDropdownVisibility = new EventEmitter();

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
    this.changeDropdownVisibility.emit(false);
  };

  onLinkClick(listId: string){
    // Don't show the spinner if we clicked in the current list. 
    if (this.aRouter.snapshot.params["listId"] === listId) return;
    this.loadingListId = listId;
    this.changeDropdownVisibility.emit(false);
  }
}
