import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TutorialsService } from './tutorials.service';
import { RestService } from './rest.service';
import { KeywordsService } from '../services/keyword.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [TutorialsService, KeywordsService, RestService],
})
export class ModelModule {}
