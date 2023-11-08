import Views from "./views";
import previewView from "./previewView.js";
// import icons from '../img/icons.svg'
class bookmarkView extends Views {

    _parentElement = document.querySelector(".bookmarks__list");
    _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
    _message = ''


    addHandlerRender(handler){
        window.addEventListener("load", handler);
    }
    _generateMarkUp() {
        // console.log(this._data);
        // Render as a String // by default in the render
        // We can't use the preview view itself because we need to render the data property that we parse in
        return this._data.map(bookmark => previewView.render(bookmark, false)).join("")
        ;
    }

   
}

export default new bookmarkView()