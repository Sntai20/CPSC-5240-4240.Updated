import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorialProxyService } from '../tutorial-proxy.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() tutorialId: string = '';
  @Input() comments: any[] = [];
  @Output() commentsUpdated = new EventEmitter<void>();
  
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tutorialService: TutorialProxyService
  ) {
    this.commentForm = this.fb.group({
      author: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      // Create the comment object following your backend model
      const comment = {
        ...this.commentForm.value,
        tutorialId: this.tutorialId,
        createdAt: new Date().toISOString()
      };
      
      this.tutorialService.createComment(comment).subscribe({
        next: () => {
          this.commentForm.reset();
          this.commentsUpdated.emit();
        },
        error: (err) => {
          console.error('Error creating comment:', err);
        }
      });
    }
  }
}