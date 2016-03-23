import {Component} from 'angular2/core';
import {Task} from './task.model';

@Component({
  selector: 'edit-task',
  inputs: ['task'],
  template: `
  <div class= "task-form">
  <h3>Edit Description: </h3>
  <input [(ngModel)]="task.description" class="col-sm-8 input-lg"/>
  </div>
  `
})

export class EditTaskComponent {
  public task: Task;
}
