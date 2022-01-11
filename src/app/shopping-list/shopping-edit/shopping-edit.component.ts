import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editItemIndex!: number;
  editItem !: Ingredient;
  @ViewChild('f',{static: true}) form!: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientSelected.subscribe((id: number) => {
      if (id !== undefined && id != null) {
        this.editMode = true;
        this.editItemIndex = +id;
        this.editItem = this.shoppingListService.getIngredientById(this.editItemIndex);
        this.form.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    });
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.editIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onFormClear() {
    this.form.reset();
  }

  onFormDelete() {
    if (this.editItem) {
      this.shoppingListService.deleteIngredient(this.editItem.name, this.editItem.amount);
      this.editMode = false;
      this.form.reset();
    }
  }

  // onIngredientDelete() {
  //   if (!this.nameInput.nativeElement.value && !this.amountInput.nativeElement.value)
  //     return;
  //   this.shoppingListService.deleteIngredient(this.nameInput.nativeElement.value, parseInt(this.amountInput.nativeElement.value))
  // }
  // onIngredientClear() {
  //   this.shoppingListService.clearIngredient();
  // }
}
