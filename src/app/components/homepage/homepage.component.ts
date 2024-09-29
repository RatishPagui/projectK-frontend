import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ReviewsComponent } from "../reviews/reviews.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewserviceService } from '../../services/reviewservice.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';
import { BookingserviceService } from '../../services/bookingservice.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TruncatePipe } from '../../pipes/truncate';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ReviewsComponent, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, NgIf, CommonModule,TruncatePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  reviewForm: FormGroup;
  bookingForm: FormGroup;
  submitted = false;
  chunks:any;
  resizeSubject = new Subject<void>();
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {  // Explicitly typing the event
    this.resizeSubject.next();
  }
  constructor(private reviewSer: ReviewserviceService,
    private bookingService: BookingserviceService
  ) {
    this.reviewForm = new FormGroup({
      name: new FormControl('', Validators.required),
      review: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required)
    });

    this.bookingForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void { 
    this.getAllReviews();
    this.chunks = this.getChunkedReviews();

    this.resizeSubject.pipe(debounceTime(200)).subscribe(() => {
      this.chunks = this.getChunkedReviews();
    });
  }

  getChunkedReviews() {
    const screenWidth = window.innerWidth;
    let chunkSize: number;
    if (screenWidth < 576) {
      chunkSize = 1; // Mobile
    } else if (screenWidth < 768) {
      chunkSize = 2; // Tablet
    } else if (screenWidth < 1024) {
      chunkSize = 3; // Laptops
    } else {
      chunkSize = 4; // Large screens
    }

    const chunks = [];
    for (let i = 0; i < this.reviewList.length; i += chunkSize) {
      chunks.push(this.reviewList.slice(i, i + chunkSize));
    }
    return chunks;
  }

  reviewList: any;
  getAllReviews(): void {
    this.reviewSer.getReviewdata().subscribe(
      (data) => {
        this.reviewList = data;
        console.log('Review data received:', this.reviewList);
      },
      (error) => {
        console.error('Error fetching review data:', error);
      });
  }

  onAddReviews() {
    console.log(this.reviewForm.value)
    this.reviewSer.postReviewsData(this.reviewForm.value).subscribe(
      response => {
        console.log('Feedback submitted successfully!', response);
        this.reviewForm.reset();
      },
      error => {
        console.error('Error submitting feedback', error);
      }
    );
  }

  onBooking() {
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }

    this.bookingService.postBookingData(this.bookingForm.value).subscribe(
      response => {
        console.log('Form submitted successfully!', response);
        this.bookingForm.reset();
        this.submitted = false;
      },
      error => {
        console.error('Error submitting the form', error);
      }
    );
  }


  formattedDate: string | null = null;
  onDateChange(event: any): void {
    const selectedDate = event.value;
    if (selectedDate) {
      this.bookingForm.patchValue({ date: selectedDate });
    }
  }
}
