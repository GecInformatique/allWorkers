import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: 'app-rating.component.html'
})
export class RatingComponent {
  @Input() rating: number = 4.0; // Valeur par défaut si aucune entrée n'est fournie
  stars: number[] = [];

  ngOnChanges() {
    this.stars = Array(5).fill(0).map((x, i) => i);
  }
}
