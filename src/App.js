import React from 'react';

export default class App extends React.Component{
  state={
    isAddRecipeFormDisplayed: false,
    recipes: [],
    newRecipeName: "",
    newRecipeInstructions: ""
  }

  toggleAddRecipeForm = ()=>{
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed});
  }


  submitRecipe = (e) => {
    e.preventDefault();
    this.setState({ recipes: [ ...this.state.recipes, {name:this.state.newRecipeName, instructions: this.state.newRecipeInstructions}] });
  }

  recipeOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    const addNewRecipeForm =  <form id="recipe-form" onSubmit={this.submitRecipe}>
                                <label>Recipe name:</label>
                                <input type="text" onChange={this.recipeOnChange} name="newRecipeName" />
                                <label>Instructions:</label>
                                <textarea name="newRecipeInstructions" onChange={this.recipeOnChange} placeholder="write recipe instructions here"/>
                                <input type="submit" />
                              </form>

    return  (
              <div className="App">
                <h1 className="App-header">My Recipes</h1>
                {this.state.isAddRecipeFormDisplayed? addNewRecipeForm : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>}
                {
                  this.state.recipes.length
                  ?
                    <ul>{this.state.recipes.map((recipe) => <li key={recipe.name}>{recipe.name}</li>)}</ul>
                  :
                    <p>There are no recipes to list.</p>
                }
              </div>
            );
  }
}
