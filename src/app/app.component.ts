import { Component, OnInit } from '@angular/core';
import { PaddleService } from 'paddle';
import {
  PaddleEventCallbackData,
  PADDLE_EVENT_TYPE,
} from 'projects/paddle/src/lib/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngx-paddle-wrapper';

  constructor(private paddleServ: PaddleService) {}

  ngOnInit(): void {
    this.paddleServ.create({
      vendor: 123456,
      eventCallback: (data: PaddleEventCallbackData) => {
        this.checkEvent(data);
      },
    });
  }

  onSubscribe() {
    this.paddleServ.open({
      product: 654321,
    });
  }

  checkEvent(data: PaddleEventCallbackData) {
    // Handle Event
    if (data.event === PADDLE_EVENT_TYPE.CheckoutComplete) {
      console.log('User has completed checkout!');
    } else {
      console.log(data.event);
    }
  }
}
