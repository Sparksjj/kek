import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { PaginationService } from './pagination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
  @Input('currentPage') currentPage: any;
  @Input('lastPage') lastPage: any;
  @Input('total') total: any;
  @Input('type') type: any;
  @Input('query') currentQuery: any;
  @Input('small') small: any;
  @Input('perPage') perPage: any;
  /*  @Input('states')         states: any[];*/
  @Input('showNavigation') showNavigation: boolean;
  private curentState = {
    value: 0
  };
  private showSpecial: boolean = true;
  public paginationPages: any;
  constructor(
    private router: Router,
    private paginationService: PaginationService
  ) {}
  ngOnInit() {
    /*    this.states.forEach((st:any)=>{
      if(st.active) {
        this.curentState.value = st.value;
      }
    })*/
  }

  changePerPage() {
    this.currentPage = 1;
    this.currentQuery['page'] = 1;
    this.currentQuery['perPage'] = this.curentState.value;
    this.router.navigate(['/' + this.type], {
      queryParams: this.currentQuery
    });
  }

  goToPage(input: any) {
    this.currentQuery['page'] = input.value;
    this.router.navigate(['/' + this.type], {
      queryParams: this.currentQuery
    });
    input.value = '';
  }

  ngOnChanges() {
    this.paginationPages = this.paginationService.getPaginationPages(
      this.currentPage,
      this.lastPage,
      7,
      this.showSpecial
    );
  }
  getQuery(newPage: any) {
    let q = JSON.stringify(this.currentQuery);
    q = JSON.parse(q);
    q['page'] = newPage;
    if (this.type == 'ticket') {
      q['refresh'] = q['refresh'] + 1;
    }
    return q;
  }
}
