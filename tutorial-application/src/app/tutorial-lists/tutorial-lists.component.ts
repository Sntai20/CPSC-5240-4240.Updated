import { Component, OnInit } from '@angular/core';
import { TutorialProxyService } from '../services/tutorial-proxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-lists',
  standalone : false,
  templateUrl: './tutorial-lists.component.html',
  styleUrls: ['./tutorial-lists.component.css']
})
export class TutorialListsComponent implements OnInit {
  tutorials: any[] = [];

  constructor(private router: Router, private proxy$: TutorialProxyService) {}

  ngOnInit() {
    this.proxy$.getTutorials().subscribe((result: any[]) => {
      this.tutorials = result;
      console.log('Tutorials fetched:', result);
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
