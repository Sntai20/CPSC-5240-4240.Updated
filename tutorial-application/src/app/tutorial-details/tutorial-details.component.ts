import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialProxyService } from '../services/tutorial-proxy.service';
import { CommunityNoteProxyService } from '../services/community-note-proxy.service';
import { ICommunityNoteModel } from '../../../../src/interfaces/ICommunityNoteModel';
import { ICommentModel } from '../../../../src/interfaces/ICommentModel';

@Component({
  selector: 'app-tutorial-details',
  standalone: false,
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  tutorial: any;
  communityNotes: ICommunityNoteModel[] = [];
  noteComments:   ICommentModel[]       = [];
  dropdownOpen    = false;
  selectedNote:   ICommunityNoteModel | null = null;
  newCommentText  = '';
  expandedSteps = new Set<number>();
  completedSteps = new Set<number>();

  showNewModal = false;
  newNoteTitle = '';
  newNoteText = '';


  constructor(
    private route: ActivatedRoute,
    private tutorialProxy: TutorialProxyService,
    private noteProxy: CommunityNoteProxyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tutorialProxy.getTutorialById(id)
      .subscribe((tut: any) => {
        this.tutorial = tut;
        this.loadCommunityNotes();
      });
  }

  private loadCommunityNotes(): void {
    this.noteProxy
      .getByTutorialId(this.tutorial.tutorialId)
      .subscribe((notes: ICommunityNoteModel[]) => {
        this.communityNotes = notes;
      });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  openNote(note: ICommunityNoteModel): void {
    this.selectedNote = note;
    this.dropdownOpen = false;
    this.noteProxy
      .getComments(note.noteId)
      .subscribe((comments: ICommentModel[]) => {
        this.noteComments = comments;
      });
  }

  closeNote(): void {
    this.selectedNote   = null;
    this.noteComments   = [];
    this.newCommentText = '';
  }

  postComment(): void {
    if (!this.selectedNote?.noteId || !this.newCommentText.trim()) {
      return;
    }
    this.noteProxy
      .addComment(this.selectedNote.noteId, this.newCommentText.trim())
      .subscribe((c: ICommentModel) => {
        this.noteComments.push(c);
        this.newCommentText = '';
      });
  }

  toggleStep(stepNumber: number): void {
    if (this.expandedSteps.has(stepNumber)) {
      this.expandedSteps.delete(stepNumber);
    } else {
      this.expandedSteps.add(stepNumber);
    }
  }

  toggleComplete(stepNumber: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.completedSteps.add(stepNumber);
    } else {
      this.completedSteps.delete(stepNumber);
    }
  }

  openNewNote(): void {
    this.newNoteTitle = '';
    this.newNoteText = '';
    this.showNewModal = true;
  }

  closeNewNote(): void {
    this.showNewModal = false;
  }

    postNote(): void {
    if (
      !this.tutorial ||
      !this.newNoteTitle.trim() ||
      !this.newNoteText.trim()
    ) {
      return;
    }
    const payload: Partial<ICommunityNoteModel> = {
      tutorialId: this.tutorial.tutorialId,
      userId:     'testuser1',  // PLACEHOLDER USER: REMEMBER TO REPLACE WITH REAL USER ONCE IMPLEMENTED
      title:      this.newNoteTitle.trim(),
      text:       this.newNoteText.trim()
    };
    this.noteProxy.addNote(payload).subscribe((note) => {
      this.communityNotes.unshift(note);
      this.closeNewNote();
    });
  }

  goBack(): void {
    this.router.navigate(['/tutorials']);
  }
}
