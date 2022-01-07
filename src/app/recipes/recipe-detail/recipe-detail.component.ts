import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../recipe.model';
import { NotificationService } from 'src/app/shared/notification-service.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {
  @Input() currentRecipe: Recipe | undefined;
  constructor(private shoppingListService: ShoppingListService, private notifyService : NotificationService) { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

  }

  onIngredientAdded() {
    if (this.currentRecipe?.ingredients && this.currentRecipe.ingredients.length !== 0) {
      this.currentRecipe?.ingredients.forEach(element => {
        this.shoppingListService.addIngredient(element);
      });
      this.notifyService.showSuccess("Ingredient added to shopping list successfully.", "Ingredients Add Successfully");
    }
  }
}
