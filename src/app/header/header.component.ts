import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelect = new EventEmitter<string>();
  selectedFeature: string = 'recipe';
  constructor() { }

  ngOnInit(): void {
  }

  select(data: string) {
    this.featureSelect.emit(data);
    this.selectedFeature = data;
  }
}
