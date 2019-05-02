import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message = 'Loading...';
  sessionUser = null;
  private quote = new Subject<string>();

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getData().subscribe(({ status, user }) => {
      if (status === 'ok') {
        this.sessionUser = user;
        this.message = user.quote;
      } else {
        this.message = 'Fail to load data...';
      }
    });

    // introduce rxjs later
    // this.quote.pipe(
    //       // wait 300ms after each keystroke before considering the term
    //       debounceTime(300),
    //       // ignore new term if same as previous term
    //       distinctUntilChanged(),
    //       // debuging
    //       tap((quoteInput: string) => {
    //         console.log(quoteInput);
    //         this.user.updateQuote(quoteInput);
    //       })
    //     );
  }

  updateQuote(quoteInput: string) {
    if ( this.sessionUser && quoteInput !== this.sessionUser.quote) {
      this.user.updateQuote(quoteInput).subscribe((arg) => console.log(arg));
    }
  }

}
