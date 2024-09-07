import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html'
})
export class PaginationComponent implements OnChanges {
  @Input() paginationInfo: any;
  @Output() pageChanged = new EventEmitter<number>();
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.paginationInfo) {
      this.generatePages();
    }
  }

  generatePages(): void {
    this.pages = [];
    for (let i = 1; i <= this.paginationInfo.last_page; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.paginationInfo.last_page) {
      this.pageChanged.emit(page);
    }
  }
}
