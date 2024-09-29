import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CarouselModule,NgFor,NgIf],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  testimonials = [
    {
      stars: Array(4).fill(0),
      halfStar: true,
      title: 'Great Service',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni dolores molestias veniam inventore itaque eius iure omnis, temporibus culpa id.',
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      name: 'Megan',
      designation: 'CEO of My Company'
    },
    // Add more testimonials here
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };
}
