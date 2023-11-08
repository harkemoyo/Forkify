import Views from "./views";
import previewView from "./previewView.js";
class ResultView extends Views {

    _parentElement = document.querySelector(".results");
    _errorMessage = `No recipe found for your query! Please try again 🥛 `;
    _message = 'Start by searching for a recipe or an ingredient. Have fun!'

    _generateMarkUp() {
        // console.log(this._data);
        // Render as a String // by default in the render
        // We can't use the preview view itself because we need to render the data property that we parse in
        return this._data.map(result => previewView.render(result, false)).join("")
        ;
    }

    // _generateMarkUp() {
    //     // console.log(this._data);
    //     return this._data.map(this._generateResultView).join("")
    //     ;
    // }

    // _generateResultView = function (result){
    //     const id = window.location.hash.slice(1)
    //     return ` <li class="preview">
    //         <a class="preview__link  ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
    //         <figure class="preview__fig">
    //             <img src="${result.imageUrl}" alt="${result.title}" />
    //         </figure>
    //         <div class="preview__data">
    //             <h4 class="preview__title">${result.title}</h4>
    //             <p class="preview__publisher">${result.publisher}</p>
    //             <div class="preview__user-generated">
    //             <svg>
    //                 <use href="img/icons.svg#icon-user"></use>
    //             </svg>
    //             </div>
    //         </div>
    //         </a>
    //     </li>`
        
    //     }
}

export default new ResultView()