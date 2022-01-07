import { ShoppingListService } from './../shopping-list.service';
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
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onIngredientAdd() {
    if (!this.nameInput.nativeElement.value && !this.amountInput.nativeElement.value)
      return;
    const ingredient = new Ingredient(this.nameInput.nativeElement.value, parseInt(this.amountInput.nativeElement.value))
    this.shoppingListService.addIngredient(ingredient);
  }

  onIngredientDelete() {
    if (!this.nameInput.nativeElement.value && !this.amountInput.nativeElement.value)
      return;
    this.shoppingListService.deleteIngredient(this.nameInput.nativeElement.value, parseInt(this.amountInput.nativeElement.value))
  }
  onIngredientClear() {
    this.shoppingListService.clearIngredient();
  }
}
