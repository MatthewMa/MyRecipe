import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from './../../recipe.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe !: Recipe;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // onRecipeSelected() {
  //   this.router.navigate([this.recipe.id], {relativeTo: this.route})
  // }
}
