import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

test('toggleAddRecipeForm() modifies isAddRecipeFormDisplayed state value to toggle visibility of a form on the page',()=>{
	const wrapper = shallow(<App />);
	wrapper.instance().toggleAddRecipeForm();

	wrapper.update();

	expect(wrapper.state().isAddRecipeFormDisplayed).toBeTruthy();
	expect(wrapper.exists("#recipe-form")).toEqual(true);

	wrapper.instance().toggleAddRecipeForm();
	expect(wrapper.exists("#recipe-form")).toEqual(false);
	expect(wrapper.state().isAddRecipeFormDisplayed).toBeFalsy();
})

test('the add recipe button onclick calls the toggleaddrecipeform method', ()=>{
	const wrapper = shallow(<App />);
	wrapper.instance().toggleAddRecipeForm = jest.fn();
	wrapper.instance().forceUpdate();

	const button = wrapper.find('#add-recipe');

	button.props().onClick();
	wrapper.instance().forceUpdate();

	expect(wrapper.instance().toggleAddRecipeForm).toHaveBeenCalled();
})

test('submitting the form calls the submitRecipe method', ()=>{
	const wrapper = shallow(<App />);
	wrapper.setState({isAddRecipeFormDisplayed: true});
	wrapper.instance().submitRecipe = jest.fn();
	wrapper.instance().forceUpdate();

	wrapper.find('#recipe-form').props().onSubmit();
	expect(wrapper.instance().submitRecipe).toHaveBeenCalled();
})

test('submitRecipe() modifies the recipes value in state', ()=>{
	const wrapper = shallow(<App />);
	const recipeName = "Mac & Pleese";
	const recipeInstructions = "follow directions on the box";

	wrapper.setState(	{
							isAddRecipeFormDisplayed: true,
							newRecipeName: recipeName,
							newRecipeInstructions: recipeInstructions
						});

	const submittedRecipe = { name: recipeName, instructions: recipeInstructions };

	const mockPreventDefault = jest.fn();

	wrapper.find('#recipe-form').props().onSubmit(	{ 
														preventDefault: mockPreventDefault 
													});

	expect(mockPreventDefault).toHaveBeenCalled()
	expect(wrapper.state().recipes).toEqual([submittedRecipe])
});

test('typing into the recipe name input updates state', ()=>{
	const wrapper = shallow(<App />);
	const recipeName = "Mac & Pleese";

	wrapper.setState(	{
							isAddRecipeFormDisplayed: true,
						});

	wrapper.find('input[name="newRecipeName"]').props().onChange(	{ 
																		target: { name: 'newRecipeName', value: recipeName }
																	});

	expect(wrapper.state().newRecipeName).toEqual(recipeName);
})

test('typing into the recipe instructions input updates state', ()=>{
	const wrapper = shallow(<App />);
	const recipeInstructions = "follow directions on the box";

	wrapper.setState(	{
							isAddRecipeFormDisplayed: true,
						});

	wrapper.find('textarea[name="newRecipeInstructions"]').props().onChange({ 
																				target: { name: 'newRecipeInstructions', value: recipeInstructions }
																			});

	expect(wrapper.state().newRecipeInstructions).toEqual(recipeInstructions);
})

test('recipe name from recipe in state appears in unordered list', ()=>{
	const wrapper = shallow(<App />);
	const recipeName = "Gateau au fromage";
	const recipeInstructions = "Make some cheese cake";
	const submittedRecipe = { name: recipeName, instructions: recipeInstructions };

	wrapper.setState({recipes: [submittedRecipe]});

	expect(wrapper.find('li')).toHaveLength(1);
	expect(wrapper.find('li').text()).toEqual("Gateau au fromage");
  })