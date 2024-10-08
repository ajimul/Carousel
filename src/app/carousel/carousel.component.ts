import { AnimationBuilder, AnimationFactory, AnimationPlayer, animate, style } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ViewChild, ElementRef, HostListener, OnInit, Input, ViewContainerRef, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [ CommonModule ],
    
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {


  @Input() itemWidth!:number;
  @Input() itemHeight!:number;
  @Input() itemsQuantity!:number;

  @Input() showControls = true;
  @Input() showSelectors = true;
  @Input() timing = '500ms ease-in';

  currentSlide = this.itemsQuantity;
  increment = 2;
  offset= 0;
  
  private player!: AnimationPlayer;
  @ViewChild('carousel') private carousel!: ElementRef;
  @ViewChild('content') private content!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.resizeCarousel();
  }

  constructor(private builder: AnimationBuilder, 
    private viewContainer: ViewContainerRef,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    setTimeout(() => {
      this.resizeCarousel();
    })
  }

  prev() {
    this.transitionCarousel(null, this.currentSlide - this.increment);
  }
  next() {

    this.transitionCarousel(null, this.currentSlide + this.increment);
  }
  setSlide(slide: number) {
    slide=slide+this.itemsQuantity;
    this.transitionCarousel(null, slide);

  }
  private resizeCarousel() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('yes platformId');
      // if (this.carousel) {
      let totalWidth = this.carousel.nativeElement.getBoundingClientRect().width;
      this.increment = Math.floor(totalWidth / this.itemWidth);
      this.offset = (totalWidth - this.increment * this.itemWidth) / 2;
      this.transitionCarousel(null, this.itemsQuantity);
    }

  }
  private transitionCarousel(time: any, slide: number) {
    if (slide>=2*this.itemsQuantity)
    {
      this.transitionCarousel(0,this.currentSlide-this.itemsQuantity)
      slide-=this.itemsQuantity;        
    }
    const offset = this.offset - this.itemWidth * slide;
    const myAnimation: AnimationFactory = this.buildAnimation(offset, time);
    this.player = myAnimation.create(this.carousel.nativeElement);
    if (time != 0) {
      if (slide<this.itemsQuantity)
      {
        this.player.onDone(() => {
          this.currentSlide = slide+this.itemsQuantity;
          this.transitionCarousel(0, this.currentSlide)
        })
      }
      else
        this.currentSlide=slide;
    }
    this.player.play();
  }
  private buildAnimation(offset:any, time: any) {
    return this.builder.build([
      animate(time == null ? this.timing : 0, style({ transform: `translateX(${offset}px)` }))
    ]);
  }


}

