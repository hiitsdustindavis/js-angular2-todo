import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from './task.model';

@Pipe ({
  name: "done",
  pure: false
})
export class DonePipe implements PipeTransform {
  transform(input: Task[], args) {
    var desiredDoneState = args[0];
    // "args" is a popular argument name, but it is not special or proprietary to JS.
    if(desiredDoneState === "done") {
      return input.filter((task) => {
        return task.done;
      });
    } else if(desiredDoneState === "notDone") {
      //The "fat arrow"(=>) is a Typescript syntax for "function." So you can remove the word "function" and put "=>" after the argument. Cool!
      return input.filter((task) => {
        return !task.done;
      });
    } else {
      return input;
    }
  }
}
