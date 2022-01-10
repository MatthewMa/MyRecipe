import { Ingredient } from './../shared/ingredient.model';
export class Recipe
{
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  constructor(id: number, name: string, desc: string, image: string, ingredients: Ingredient[])
  {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = image;
    this.ingredients = ingredients;
  }
}
