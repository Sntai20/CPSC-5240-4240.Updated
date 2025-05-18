import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TutorialProxyService } from '../tutorial-proxy.service';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'category', 'author', 'actions'];
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private tutorialService: TutorialProxyService) { }

  ngOnInit(): void {
    this.loadTutorials();
  }

  loadTutorials(): void {
    this.tutorialService.getAllTutorials().subscribe({
      next: (tutorials: any[]) => {
        this.dataSource = new MatTableDataSource<any>(tutorials);
        this.dataSource.sort = this.sort;
        console.log('Tutorials loaded from server:', tutorials);
      },
      error: (error) => {
        console.error('Error loading tutorials:', error);
      }
    });
  }

  viewTutorial(tutorialId: string): void {
    this.router.navigate(['/tutorials', tutorialId]);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }
}