import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialProxyService } from '../tutorial-proxy.service';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css']
})
export class TutorialDetailComponent implements OnInit {
  tutorialId: string = '';
  tutorial: any = null;
  comments: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tutorialService: TutorialProxyService
  ) { }

  ngOnInit(): void {
    this.tutorialId = this.route.snapshot.params['tutorialId'];
    this.loadTutorial();
    this.loadAllComments(); // Since we don't have a tutorial-specific comments endpoint
  }

  loadTutorial(): void {
    this.tutorialService.getTutorialById(this.tutorialId).subscribe({
      next: (tutorial: any) => {
        this.tutorial = tutorial;
        this.loading = false;
        console.log('Tutorial details:', tutorial);
      },
      error: (err) => {
        this.error = 'Error loading tutorial';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadAllComments(): void {
    this.tutorialService.getAllComments().subscribe({
      next: (allComments: any[]) => {
        // Filter comments to only show ones related to this tutorial
        this.comments = allComments.filter(comment => 
          comment.tutorialId === this.tutorialId
        );
        console.log('Tutorial comments:', this.comments);
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/tutorials']);
  }
}