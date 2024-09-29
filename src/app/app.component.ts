import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { HttpClientModule } from '@angular/common/http';
import { ReviewserviceService } from './services/reviewservice.service';
import { BookingserviceService } from './services/bookingservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent,HttpClientModule],
  providers: [ReviewserviceService,BookingserviceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
