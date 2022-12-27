# Angular Paddle Wrapper

This is an Angular wrapper library for Paddle.js.

The author has no affiliation with Paddle.com Market Limited.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4
and updated to Angular v15.

## How to use

Make sure you have an active Paddle account and have read the docs on [paddle.com](https://developer.paddle.com/).

#### 1a) Install with NPM

```shell
$ npm install ngx-paddle-wrapper
```

#### 1b) Or Yarn

```shell
$ yarn add ngx-paddle-wrapper
```

#### 2) Import the PaddleModule

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PaddleModule } from 'ngx-paddle-wrapper';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PaddleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### 3a) The easy way, using the `ngxPaddle` Directive

```html
<button
  ngxPaddle
  [vendor]="123456"
  [product]="654321"
  email="test@test.com"
  (onCheckoutEvent)="checkEvent($event)"
></button>
```

#### 3b) The less easy way, using the Service directly

Since most of the functionality is through the service you can imlpement this yourself to customize to your needs further.

```typescript
import { Component, AfterViewInit } from '@angular/core';

import {
  PaddleService,
  PaddleCheckoutOptions,
  PaddleEventCallbackData,
  PADDLE_EVENT_TYPE,
} from 'ngx-paddle-wrapper';

export class ComponentThatImplementsPaddle implements AfterViewInit {
  private paddleOptions: PaddleCheckoutOptions = {
    product: 654321,
    title: 'Test Title',
    message: 'Test Message',
    coupon: 'TEST',
    email: 'test@test.com',
  };

  constructor(private paddleServ: PaddleService) {}

  // Create and open programatically once the library is loaded.
  ngAfterViewInit() {
    this.paddleServ.create({
      vendor: 123456,
      eventCallback: this.checkEvent,
    });
  }

  onSubscribe() {
    this.paddleServ.open(this.paddleOptions);
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
```

#### 3c) Use Available Options (see official docs for more)

For Directive:
| Attribute/prop | input/output | optional/required | Type |Description |
| --------------- | ------------ | ----------------- | -------- | -------------------------- |
| vendor | input | required | number | Your vendor id |
| product | input | required | number | Your product id |
| title | input | optional | string | See docs |
| message | input | optional | string | See docs |
| coupon | input | optional | string | See docs |
| email | input | optional | string | See docs |
| onCheckoutEvent | output | optional | string | See docs |

For Service: all other options

#### 4) Get Price

```typescript
import { Component, AfterViewInit } from '@angular/core';

import {
  PaddleProductPrice,
  PaddleService,
  PaddleCheckoutOptions,
  PaddleEventCallbackData,
  PADDLE_EVENT_TYPE,
} from 'ngx-paddle-wrapper';

export class ComponentThatImplementsPaddle implements AfterViewInit {
  private paddleOptions: PaddleCheckoutOptions = {
    product: 654321,
    title: 'Test Title',
    message: 'Test Message',
    coupon: 'TEST',
    email: 'test@test.com',
  };
  price: PaddleProductPrice;

  constructor(private paddleServ: PaddleService) {}

  // Create and open programatically once the library is loaded.
  ngAfterViewInit() {
    this.paddleServ.create({
      vendor: 123456,
      eventCallback: this.checkEvent,
    });
    // GET YOUR PRODUCTS PRICE:
    const numberOfProductsToPrice = 2;
    this.price = await this.paddleServ.getPrice(this.paddleOptions.product, numberOfProductsToPrice);
    // OR (quantity defaults to 1):
    this.price = await this.paddleServ.getPrice(this.paddleOptions.product);
  }
  [...]
}
```

## How to contribute

Want to contribute to this project? Awesome! There are many ways you can contribute, see below.

### Opening issues

Open an issue to report bugs or to propose new features. If you have a general usage question please note that this is just a wrapper and most questions should be directed to the actual library in Stack Overflow etc.

### Proposing pull requests

Pull requests are more than welcome. Note that if you are going to propose drastic changes or new features, be sure to open an issue for discussion first, to make sure that your PR will be accepted before you spend effort coding it.

### Todo

Tests!

### Building ngx-paddle-wrapper

In the root directory of the repo:

```bash
ng build paddle --configuration production
```

### Publishing

```bash
npm login
cd dist/paddle
npm publish --access public
```

### Installing for local development

```bash
cd dist/paddle
npm pack
```

In destination project

```bash
npm install ../../../ngx-paddle/wrapper/dist/paddle/saschwarz-ngx-paddle-wrapper-1.0.0.tgz
```
