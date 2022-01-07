import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name', {static: true}) nameInput!: ElementRef;
  @ViewChild('amount', {static: true}) amountInput!: ElementRef;
  @Output() ingredientAdd = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdd() {
    if (!this.nameInput.nativeElement.value && !this.amountInput.nativeElement.value)
      return;
    this.ingredientAdd.emit(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }

}
