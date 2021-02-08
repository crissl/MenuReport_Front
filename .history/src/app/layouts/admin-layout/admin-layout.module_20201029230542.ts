import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { PacComponent } from 'app/pages/pac/pac.component';
import { DatosPersonalesComponent } from 'app/pages/secciones/datos-personales/datos-personales.component';
import { DatosAcademicosComponent } from 'app/pages/secciones/datos-academicos/datos-academicos.component';
import { CrearMenuComponent } from '../../pages/crear-menu/crear-menu.component';
import { ContenidoMenuComponent } from '../../pages/contenido-menu/contenido-menu.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { ProfilesComponent } from '../../profiles/profiles.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    PacComponent,
    DatosPersonalesComponent,
    DatosAcademicosComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CrearMenuComponent,
    ContenidoMenuComponent,
    ProfileComponent,
    ProfilesComponent


  ]
})

export class AdminLayoutModule {}
