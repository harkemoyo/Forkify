import Views from "./views";
import icons from '../img/icons.svg'
class paginationView extends Views {

    _parentElement = document.querySelector(".pagination");
   
    _addHandlerClick (handler) {
      this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest(".btn--inline");

        if (!btn) return
        console.log(btn);
        const goToPage = +btn.dataset.goto
        console.log(goToPage);
        handler(goToPage)
     
      })  
    }

    _generateMarkUp() {
        const curpage = this._data.pageCount

      const numOfPages = Math.ceil(this._data.result.length / this._data.resultPerPage);
      

    //   First page and other pages
    
    if (curpage === 1 && numOfPages > 1){
        return`  <button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
        <span>Page${curpage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>  
      ` ;
    }
    //    Last page 
    if (curpage === numOfPages && numOfPages > 1){
        
        return `<button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curpage - 1}</span>
            </button>`
    }
    if (curpage < numOfPages){
      return `<button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curpage - 1}</span>
    </button>
    <button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
      <span>Page${curpage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`
    }
    // Else page 1
    return '';
    }
    
}

export default new paginationView()

