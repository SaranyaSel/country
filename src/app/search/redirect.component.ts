import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: ` `,
  styles: []
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

}
