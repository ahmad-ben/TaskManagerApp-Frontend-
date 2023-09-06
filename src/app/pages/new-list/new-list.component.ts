import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CheckWhiteSpaceDirective } from 'src/app/directives/whiteSpace/check-white-space.directive';
import { ListService } from 'src/app/services/lists/list.service';


@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    CheckWhiteSpaceDirective
  ],
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})

export class NewListComponent {
  inputValue: string = "";
  buttonClicked: boolean = false;

  listService = inject(ListService);
  route = inject(Router);

  createList(newListForm: NgForm){

    this.buttonClicked = true;
    if(newListForm.invalid) return;

    this.listService.createList(this.inputValue)
      .subscribe({
        next: (newListFromDB: any) => {
          this.route.navigateByUrl(`/lists/${newListFromDB._id}`);
        }
      })

  }

}


