import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../recipe.model';
import { NotificationService } from 'src/app/shared/notification-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  @Input() currentRecipe: Recipe | undefined;
  paramsSubscription: Subscription | undefined;
  id: number | undefined;
  constructor(private shoppingListService: ShoppingListService, private notifyService : NotificationService, private route: ActivatedRoute, private recipeService: RecipeService) { }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe( (params: Params) => {
      this.id = +params['id'];
      this.currentRecipe = this.recipeService.getRecipeById(this.id);
    });
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
