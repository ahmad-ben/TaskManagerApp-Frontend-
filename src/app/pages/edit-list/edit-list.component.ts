import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { ListService } from 'src/app/services/lists/list.service';

@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CheckWhiteSpaceDirective
  ],
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})

export class EditListComponent implements OnInit {
  inputValue: string = '';
  buttonClicked: boolean = false;
  listId: string = '';

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  listService = inject(ListService);

  ngOnInit(){
    this.listId = this.activatedRoute.snapshot.params['listId']; //=> IMPO: Change to observable if we will show the list of lists to change between them from this page it self
  }

  editList(editedListForm: NgForm){

    this.buttonClicked = true;
    if(editedListForm.invalid) return;

    this.listService.editList(this.listId, this.inputValue)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl(`lists/${this.listId}`)
        }
      });

  }

}
