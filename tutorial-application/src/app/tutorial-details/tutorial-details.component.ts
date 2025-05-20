import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialProxyService } from '../tutorial-proxy.service';

@Component({
  selector: 'app-tutorial-details',
  standalone : false,
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  tutorial: any;

  constructor(
    private route: ActivatedRoute,
    private proxy$: TutorialProxyService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.proxy$.getTutorialById(id).subscribe((result) => {
        this.tutorial = result;
        console.log('Tutorial details:', result);
      });
    }
  }

  goBack() {
    this.router.navigate(['/tutorials']);
  }
}
