import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import  { SidebarComponent} from '../app/components/sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




import {
  AgmCoreModule,
} from '@agm/core';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {MenuService} from 'app/services/menu.service'
// import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    OAuthModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [
    MenuService,
    AuthService,
    SidebarComponent,
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
