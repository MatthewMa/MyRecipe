import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification-service.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  currentRecipe: Recipe;
  @ViewChild('f', {static: true}) form: NgForm;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id !== undefined && this.id !== null) {
        this.currentRecipe = this.recipeService.getRecipeById(+this.id);
        this.editMode = true;
        // setTimeout(() => {
        //   this.form.setValue({
        //     name: this.currentRecipe.name,
        //     description: this.currentRecipe.description,
        //     imagePath: this.currentRecipe.imagePath
        //   });
        // }, 1000);
      }
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe.ingredients) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    // const newRecipe: Recipe = new Recipe(this.recipeForm.value['name'], this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'], this.recipeForm.value['ingredients']);
    if (this.editMode) {
      // Update recipe
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.notifyService.showSuccess("Recipe updated successfully.", "Recipe Update Successfully");
      this.router.navigate(['../..' ,this.id], {relativeTo: this.route});
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.notifyService.showSuccess("Recipe added successfully.", "Recipe Add Successfully");
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onRemoveIngredient(position: number) {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(position);
  }

  onRecipeEditCancel() {
    if (this.editMode) {
      this.router.navigate(['../..' ,this.id], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }
}
