import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  shoppingListSubscription: Subscription | undefined;
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.shoppingListSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredient();
    this.shoppingListSubscription = this.shoppingListService.ingredientChanged.subscribe((ingredients:Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onEditItem(id: number) {
    this.shoppingListService.ingredientSelected.next(id);
  }
}
