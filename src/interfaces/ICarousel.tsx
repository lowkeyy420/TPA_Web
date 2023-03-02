export interface ImageSlider {
  slides: {
    URL: string;
    Alt: string;
  }[];
}

export enum sliderAction {
  ADD = "ADD",
  SUBTRACT = "SUBSTRACT",
}
