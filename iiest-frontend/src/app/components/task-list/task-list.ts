import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList implements OnInit {

  tasks: any[] = [];

  showModal = false;

  newTask: any = {
    assignedTo: 'Ali',
    dueDate: '',
    priority: 'High',
    description: '',
    status: 'Not Started'
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log("Tasks loaded:", data);
        this.tasks = data;
      },
      error: (err) => console.error(err)
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveTask() {

    if (!this.newTask.description || !this.newTask.dueDate) {
      alert("Please fill all fields");
      return;
    }

    console.log("Sending to backend:", this.newTask);

    this.taskService.createTask(this.newTask).subscribe({

      next: (res) => {

        console.log("Saved successfully:", res);

        this.closeModal();

        this.loadTasks();

        this.newTask = {
          assignedTo: 'Ali',
          dueDate: '',
          priority: 'High',
          description: '',
          status: 'Not Started'
        };

      },

      error: (err) => {
        console.error("Save error:", err);
        alert("Save failed. Check backend.");
      }

    });

  }

}