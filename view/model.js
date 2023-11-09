
import {API_URL, KEY, Res_PER_PAGE,KEY} from './config.js'
import {AJAX} from './helpers.js'
export const state = {
    recipe :{},
    bookmarks: [],
    search :{
        query:'',
        result: [],
        resultPerPage : Res_PER_PAGE,
        pageCount: 1
    },
    
}
// Create  recipe function
const createRecipeObject = function(data){
    const {recipe} = data.data
   return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key})
       }
}

export const loadRecipe = async function (id){
    try {
   const data = await AJAX(`${API_URL}${id}?key=${KEY}`)
  
      //  Calling the recipe function

      state.recipe = createRecipeObject(data)

    //   Find all bookmarked recipes
      if(state.bookmarks.some(bookmark => bookmark.id === id))
        state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    }catch(err) {
        console.error(`${err} is not a valid 👹  👹`);
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try{
        state.search.query = query;
   const data = await AJAX(`${API_URL }?search=${query}&key=${KEY}`)
 
   state.search.result = data.data.recipes.map(rec => {
    return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key})
    }
    
})
// Load the page back to default state
state.search.pageCount = 1
   
    }catch(err){
        console.error(`${err} is not a valid 👹  👹`);
        throw err;
    }
}

export const resultsPerPage = function(page = state.search.pageCount){
        state.search.pageCount = page;
    const start = (page -1) * state.search.resultPerPage
    const end = page * state.search.resultPerPage
   
    return state.search.result.slice(start, end)
}

export const updateServing = function(newServing){
    state.recipe.ingredients.forEach(ing => ing.quantity = (ing.quantity * newServing) / state.recipe.servings)


    state.recipe.servings = newServing
}

// LocalStorage functions for Bookmark

const setBookmark = function (){
    localStorage.setItem('bookmark',JSON.stringify(state.bookmarks))

}
export const addBookmark = function(recipe){
    // Add a bookmark
    state.bookmarks.push(recipe)

    // Mark the current Recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true
    setBookmark()
} 

export const deleteBookmark = function(id){
    // Delete the bookmark
    const index = state.bookmarks.findIndex(marked => marked.id === id);
    // console.log("index",index);
    state.bookmarks.splice(index, 1);
     // UnMark the current Recipe in the bookmark
     if (id === state.recipe.id) state.recipe.bookmarked = false
     setBookmark()
}
const init = function(){
    const storage = localStorage.getItem('bookmark')
    if (storage) state.bookmarks = JSON.parse(storage)
}
//  init()
const clearLocalStorage = function(){
    localStorage.clear('bookmark')
}
clearLocalStorage()


export const uploadRecipe = async function (newRecipe){
    // create a new recipe object
    try{
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
   .map(ing => {
    //  Loop through the ingredients of addedRecipe
    // const ingArr = ing[1].replaceAll(' ','').split(',')
    const ingArr = ing[1].split(',').map(el => el.trim())
   
    // Create ingredients object
    const [quantity,unit,description] = ingArr
   if (ingArr.length !== 3) throw new Error('Wrong ingredients format.Please try another format!')
    
    return { quantity: quantity ? +quantity : null, unit, description}
   })

   const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
  };
   
//    Store the recipe as data in asynchronous way
  const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
  state.recipe = createRecipeObject(data)
  addBookmark(state.recipe)
}catch (err) {
    throw err
}
}