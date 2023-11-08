import Views from "./views";
import icons from '../img/icons.svg'

// This class is responsible for controlling both the bookmarkView and the resultView .
// The only difference between this to is the  parent elements  and the error messages
class previewView extends Views {

    _parentElement ='';
  

    _generateMarkUp(){
        const id = window.location.hash.slice(1)
        //Data being generated this._data for  bookmarkViews
        // And also the child class
        return ` <li class="preview">
            <a class="preview__link  ${this._data.id === id ? 'preview__link--active' : ''}" href="#${this._data.id}">
            <figure class="preview__fig">
                <img src="${this._data.imageUrl}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated ${this._data.key ? '' : 'hidden'} ">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li>`
        
        }
}

export default new previewView()