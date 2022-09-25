import { Component, Input, OnInit } from '@angular/core';


interface crouselImages {
  imageSrc: string;
  imageAlt: string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() images: crouselImages[] = [];
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() autoSlide: boolean = true;
  @Input() slideInterval: number = 3000;///default to 3 seconds

  selectedIndex = 0;
  constructor() { }

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }
  // Changes slide in every 3 seconds
  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval
    );
  }

  //sets index of image on dot/indicator click
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevCLick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;

    }
    else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;

    }
    else {
      this.selectedIndex++;
    }
  }
}

