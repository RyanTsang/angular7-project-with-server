import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppReducerState } from '../store/reducers/appReducers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  appReducerState$: Observable<AppReducerState>;
  private appReducerStateSubscription: Subscription;
  appState: AppReducerState;

  constructor(private store: Store<AppReducerState>) {
    this.appReducerState$ = store.select('appReducer');
  }

  ngOnInit() {
    this.appReducerStateSubscription = this.appReducerState$.subscribe((state) => {
      this.appState = state;
      console.log(this.appState);
    });
  }

  ngOnDestroy() {
    this.appReducerStateSubscription.unsubscribe();
  }

}
