import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DuplicateDirective } from './carousel/duplicate.directive';
import { CarouselComponent } from "./carousel/carousel.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, CarouselComponent,RouterOutlet,DuplicateDirective]
})
export class AppComponent {
  title = 'Carousel';
  items = [{ img: 'https://picsum.photos/200/200?random=1' },
  { img: 'https://picsum.photos/200/200?random=2' },
  { img: 'https://picsum.photos/200/200?random=3' },
  { img: 'https://picsum.photos/200/200?random=4' },
  { img: 'https://picsum.photos/200/200?random=5' },
  { img: 'https://picsum.photos/200/200?random=6' },
  { img: 'https://picsum.photos/200/200?random=7' },
  { img: 'https://picsum.photos/200/200?random=8' }
  ];
}
