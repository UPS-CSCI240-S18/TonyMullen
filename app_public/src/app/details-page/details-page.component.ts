import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Loc8rDataService } from '../loc8r-data.service';
import { Location } from '../location';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  providers: [Loc8rDataService]
})
export class DetailsPageComponent implements OnInit {

  constructor(
    private loc8rDataService: Loc8rDataService,
    private route: ActivatedRoute
  ) { }

  newLocation: Location;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.get('locationId');
        return this.loc8rDataService.getLocationById(id);
      })
      .subscribe((newLocation: Location) => {
        this.newLocation = newLocation
        this.pageContent.header.title = newLocation.name;
        this.pageContent.sidebar = `${newLocation.name} is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.\n\nIf you\'ve been and you like it - or if you don\'t - please leave a review to help others just like you.`
      })
  }

  pageContent = {
    header : {
      title : '',
      strapline : ''
    },
    sidebar : ''
  }

}
