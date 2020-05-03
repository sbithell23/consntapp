import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { FromNow, SubstringPipe, CustomeMoment, SanitizeHtmlPipe} from './pipes';

@NgModule({
  declarations: [FromNow, SubstringPipe, CustomeMoment, SanitizeHtmlPipe],
  imports: [IonicModule],
  exports: [FromNow, SubstringPipe, CustomeMoment, SanitizeHtmlPipe]
})
export class PipesModule { }
