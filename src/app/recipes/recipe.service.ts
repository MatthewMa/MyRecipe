import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(1,'Bbq Steak', 'Brazilian style steak',  'https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/02/how-to-cook-steak-1061w.jpg', [new Ingredient('beef', 4), new Ingredient('Tomato', 5), new Ingredient('Potato', 2)]),
    new Recipe(2,'Pasta', 'Italian Royal Pasta',  'https://www.simplyrecipes.com/thmb/BLEz9MXnW4ESzvGpr0hQ6J-Juvw=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__02__pasta-puttanesca-fork-vertical-1600-935649b4e572476cb9d4afb873193654.jpg', [new Ingredient('pork', 4), new Ingredient('Tomato', 5), new Ingredient('Potato', 2)]),
    new Recipe(3, 'Chicken Noodle Soup', 'American Home Made',  'https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Chicken-Noodle-Soup-Recipe-1200.jpg', [new Ingredient('chicken', 4), new Ingredient('Noodle', 2), new Ingredient('Lemon', 2)])
  ];

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.find(r => r.id == id);
  }
}
