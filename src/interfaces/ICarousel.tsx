export interface ImageSlider {
  slides: {
    ID: number;
    URL: string;
    Alt: string;
  }[];
  reload?: any;
}

export enum sliderAction {
  ADD = "ADD",
  SUBTRACT = "SUBSTRACT",
}
