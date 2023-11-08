import icons from '../img/icons.svg'

export default class Views{
    _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.erroHandlerRender()
        this._data = data;
        const markUp = this._generateMarkUp()
        if(!render) return markUp
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp)
    }

    update(data){
      this._data = data;
      const newMarkUp = this._generateMarkUp()

      const newDom = document.createRange().createContextualFragment(newMarkUp)
      const newElement = Array.from(newDom.querySelectorAll('*'))
      // console.log(newDom);
      const curElement = Array.from(this._parentElement.querySelectorAll('*'))
    //  console.log(curElement);
      // Looping through new element and equalise it to  the current , and update the changed text
      newElement.forEach((newEl,i )=> {
        const curEl = curElement[i];
        // console.log(curEl, newEl.isEqualNode(curEl) );
        if(!curEl.isEqualNode(newEl) && newEl.firstChild?.nodeValue.trim() !== '') {
          console.log("🥏",newEl.firstChild?.nodeValue.trim());
          curEl.textContent = newEl.textContent
          
        }

        // Update the attributes 

        if ( !newEl.isEqualNode(curEl) )
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
      });
      });
    }
  
    _clear() {
      this._parentElement.innerHTML = '';
    }
  

       // spinner function
 renderSpinner(){
    const markUpSpinner = ` <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> `;
 this._clear()
 this._parentElement.insertAdjacentHTML('afterbegin', markUpSpinner)
  
  }

  erroHandlerRender (message = this._errorMessage){
    const markUpSpinner =`<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `
  this._clear()
  this._parentElement.insertAdjacentHTML('afterbegin', markUpSpinner)

  }


  HandlerMessageRender (message = this._message){
    const markUpSpinner =`<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `
  this._clear()
  this._parentElement.insertAdjacentHTML('afterbegin', markUpSpinner)

  }
}