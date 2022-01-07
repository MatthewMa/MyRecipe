import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
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
    this.ingredientChanged.emit(this.ingredients.slice());
  }
  deleteIngredient(name: string, amount: number) {
    const index = this.ingredients.findIndex(i => i.name === name);
    if (index != -1) {
      this.ingredients[index].amount -= amount;
      if (this.ingredients[index].amount <= 0) {
        this.ingredients.splice(index, 1);
      }
      this.ingredientChanged.emit(this.ingredients.slice());
    } else {
      return;
    }
  }
  clearIngredient() {
    this.ingredients = [];
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
