import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: any[] = [
    new Ingredient('Tomato', 5),
    new Ingredient('Potato', 2),
    new Ingredient('Apple', 4)
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(data: Ingredient) {
    this.ingredients.push(data);
  }

}
