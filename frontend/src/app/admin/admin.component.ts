import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private quote = 'Loading....';

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getData().subscribe(({ status, user }) => {
    if (status === 'ok') {
      this.quote = user.quote;
    } else {
      this.quote = '[SOMETHING WENT WRONG!]';
    }
    });
  }

  saveQuote(quoteText: string) {
    console.log(quoteText);
    this.quote = quoteText;
    this.user.updateQuote(quoteText).subscribe(({status}) => {
      // TODO use RXJS to rewrite it.
    });
  }

}
