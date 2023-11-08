import * as model from "./model.js";
import { MODAL_TIMEOUT_SEC } from "./config.js";
import recipeView from "./recipeView.js";
import searchView from "./searchView.js";
import resultView from "./resultView.js";
import paginationView from "./paginationView.js";
import bookmarkViews from "./bookmarkViews.js";
import addRecipeView from "./addRecipeView.js";
import "core-js/stable";
import "regenerator-runtime";
import { async } from "regenerator-runtime";

// const recipeContainer = document.querySelector(".recipe");

// show the recipe function

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept;
}
const recipeRequest = async function () {
  try {
    const id = window.location.hash.slice(1);

    // Guard clause
    if (!id) return;

    // Update the active link selecting the current recipe
    resultView.update(model.resultsPerPage());
    // Update the bookmark for the current recipe
    bookmarkViews.update(model.state.bookmarks);

    //
    // load icons
    recipeView.renderSpinner();

    // load recipe
    await model.loadRecipe(id);

    //  render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.erroHandlerRender();
  }
};

const controlleResults = async function () {
  try {
    resultView.renderSpinner();
    // Get seach query
    const query = searchView.getQuery();

    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render the results
    // resultView.render(model.state.search.result)
    resultView.render(model.resultsPerPage());

    // Render paginationView btn
    paginationView.render(model.state.search);
    // console.log(model.state.recipe);
  } catch (err) {
    console.error(`${err}`);
  }
};

const controlPagination = function (goToPage) {
  // Render new pagination results
  resultView.render(model.resultsPerPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServing = function (newServing) {
  // update the recipe servings
  model.updateServing(newServing);
  // Render the newServing
  recipeView.update(model.state.recipe);
};

const addBookmarkControl = function () {
  // console.log(model.state.recipe.bookmarked);
  // Add a bookmark control for the current recipe
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update the recipe on bookmark control
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // Render the new bookmark control
  bookmarkViews.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkViews.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render Spinner
    addRecipeView.renderSpinner();
    // Upload the new addedRecipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render the new recipe of addedRecipe
    recipeView.render(model.state.recipe);

    // Render success message of addedRecipe
    addRecipeView.HandlerMessageRender();

    // Render bookmarks view
    bookmarkViews.render(model.state.bookmarks);

    // Change the ID in the  URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // SetTimeout for the addedRecipe
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_TIMEOUT_SEC * 1000);
  } catch (err) {
    console.error("❤️‍🔥", err);

    addRecipeView.erroHandlerRender(err.message);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(recipeRequest);
  recipeView.addHandlerUpdateIng(controlServing);
  recipeView.addHandlerAddBookmark(addBookmarkControl);
  searchView.addHandlerSearch(controlleResults);
  paginationView._addHandlerClick(controlPagination);
  addRecipeView._addHandlerUploadFile(controlAddRecipe);
};
init();
// window.addEventListener('hashchange',recipeRequest)
// window.addEventListener('load',recipeRequest)
