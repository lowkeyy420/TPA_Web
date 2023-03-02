export interface ImageSlider {
  slides: {
    url: string;
    alt: string;
  }[];
}

export interface CarouselResponse {
  url: string;
  alt: string;
}

export enum sliderAction {
  ADD = "ADD",
  SUBTRACT = "SUBSTRACT",
}
