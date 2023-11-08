import Views from "./views.js";
class addRecipeView extends Views {

    _parentElement = document.querySelector(".upload");
    _message = 'Add Recipe was successfully Uploaded :)';


    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnClose = document.querySelector(".btn--close-modal");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    
    
    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    // Toggle function for  window
toggleWindow(){
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
}


    // Show the modal window handler
    _addHandlerShowWindow(){
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));

    }

    // Hide modal window handler
    _addHandlerHideWindow(){
     this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
     this._overlay.addEventListener("click", this.toggleWindow.bind(this));

    }

    _addHandlerUploadFile (handler){
        
        this._parentElement.addEventListener("submit", function(e){
            e.preventDefault();
        const dataArr = [...new FormData(this)]
        
        // converting array of entries to an object
        const data =Object.fromEntries(dataArr);
        console.log(data);
        handler(data);
        })
    }


   
    

}
export default new addRecipeView()
