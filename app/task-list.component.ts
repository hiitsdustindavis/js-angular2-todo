import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskComponent } from './edit-task.component';
import { NewTaskComponent } from './new-task.component';
import {DonePipe} from './done.pipe';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  pipes: [DonePipe],
  directives: [TaskComponent, EditTaskComponent, NewTaskComponent],
  template: `
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">Show All</option>
      <option value="done">Show Done</option>
      <option value="notDone" selected="selected">Show Not Done</option>
      // This select list connects to the DonePipe class. Cool!
    </select>
    <task-display *ngFor="#currentTask of taskList | done:filterDone"
      (click)="taskClicked(currentTask)"
      [class.selected]="currentTask === selectedTask"
      [task]="currentTask">
    </task-display>
    <edit-task *ngIf="selectedTask" [task]="selectedTask"></edit-task>
    <new-task (onSubmitNewTask)="createTask($event)"></new-task>
  `
})

export class TaskListComponent {
  public taskList: Task[];
  public filterDone: string = "notDone";
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log("Hector here:" + clickedTask);
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
  createTask(description: string): void {
    this.taskList.push(
      new Task(description, this.taskList.length)
    );
  }
  onChange(filterOption) {
    this.filterDone = filterOption;
    console.log(this.filterDone);
  }
}
