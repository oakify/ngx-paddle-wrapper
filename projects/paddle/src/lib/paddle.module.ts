import { NgModule } from '@angular/core';
import { PaddleDirective } from './paddle.directive';
import { PaddleService } from './paddle.service';

@NgModule({
  declarations: [PaddleDirective],
  imports: [],
  providers: [PaddleService],
  exports: [PaddleDirective],
})
export class PaddleModule {}
