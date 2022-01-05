import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Bbq Steak', 'Brazilian style steak',  'https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/02/how-to-cook-steak-1061w.jpg'),
    new Recipe('Pasta', 'Italian Royal Pasta',  'https://www.simplyrecipes.com/thmb/BLEz9MXnW4ESzvGpr0hQ6J-Juvw=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__02__pasta-puttanesca-fork-vertical-1600-935649b4e572476cb9d4afb873193654.jpg'),
    new Recipe('Chicken Noodle Soup', 'American Home Made',  'https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Chicken-Noodle-Soup-Recipe-1200.jpg')
  ];
  constructor() { }
  ngOnInit(): void {
  }

}
