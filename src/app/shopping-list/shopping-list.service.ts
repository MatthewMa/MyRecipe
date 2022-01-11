import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 5),
    new Ingredient('Potato', 2),
    new Ingredient('Apple', 4)
  ];
  getIngredient() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    let targetIngredient = this.ingredients.find(i => i.name === ingredient.name);
    if(targetIngredient !== undefined) {
      targetIngredient.amount += ingredient.amount;
    }
    else {
      this.ingredients.push(ingredient);
    }
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(name: string, amount: number) {
    const index = this.ingredients.findIndex(i => i.name === name);
    if (index != -1) {
      this.ingredients[index].amount -= amount;
      if (this.ingredients[index].amount <= 0) {
        this.ingredients.splice(index, 1);
      }
      this.ingredientChanged.next(this.ingredients.slice());
    } else {
      return;
    }
  }
  clearIngredient() {
    this.ingredients = [];
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
