import {
  PaddleCheckoutOptions,
  PaddleConfig,
  PaddleProductPrice,
} from './interfaces';

import { Injectable } from '@angular/core';

declare let Paddle: any;

@Injectable({
  providedIn: 'root',
})
export class PaddleService {
  private loaded: Promise<void>;

  constructor() {}

  /**
   * Create a Paddle instance as soon as Paddle has loaded.
   * @param PaddleConfig config
   * @returns Promise<PaddleHandler>
   */
  public create(config: PaddleConfig): Promise<void> {
    return this.load().then(() => {
      Paddle.Setup(config);
    });
  }

  public open(checkout: PaddleCheckoutOptions): void {
    if (this.loaded) {
      Paddle.Checkout.open(checkout);
    }
  }

  public getPrice(
    productId: number,
    quantity: number = 1
  ): Promise<PaddleProductPrice> {
    if (this.loaded) {
      return new Promise<PaddleProductPrice>((resolve, reject) => {
        Paddle.Product.Prices(
          productId,
          quantity,
          (prices: PaddleProductPrice) => {
            if (!prices) reject('Error getting prices');
            resolve(prices);
          }
        );
      });
    }
    return Promise.reject('Paddle not loaded');
  }

  /**
   * Load or wait for the Paddle library to load.
   * @returns Promise<void>
   */
  private load(): Promise<void> {
    if (!this.loaded) {
      this.loaded = new Promise<void>((resolve, reject) => {
        const script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.paddle.com/paddle/paddle.js';
        script.onerror = (e: any) => reject(e);
        if (script.readyState) {
          script.onreadystatechange = () => {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null;
              resolve();
            }
          };
        } else {
          script.onload = () => {
            resolve();
          };
        }
        document.getElementsByTagName('body')[0].appendChild(script);
      });
    }

    return this.loaded;
  }
}
