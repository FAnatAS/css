var el, selElm, selEl, selElIt, elIt;

el = document.getElementById("select");
  selElm = el.getElementsByTagName("select")[0];
  selEl = document.createElement("div");
  selEl.setAttribute("class", "selectSelected");
  selEl.innerHTML = selElm.options[selElm.selectedIndex].innerHTML;
  el.appendChild(selEl);
  selElIt = document.createElement("div");
  selElIt.setAttribute("class", "selectItems selectHide");
  for (let i = 1; i < selElm.length; i++) {
    elIt = document.createElement("div");
    elIt.innerHTML = selElm.options[i].innerHTML;
    elIt.addEventListener("click", function(e) {
        var par, parPar, parPrev;
        parPar = this.parentNode.parentNode.getElementsByTagName("select")[0];
        parPrev = this.parentNode.previousSibling;
        for (let j = 0; j < parPar.length; j++) {
          if (parPar.options[j].innerHTML == this.innerHTML) {
            parPar.selectedIndex = j;
            parPrev.innerHTML = this.innerHTML;
            par = this.parentNode.getElementsByClassName("sameSelected");
            for (let k = 0; k < par.length; k++) {
              par[k].removeAttribute("class");
            }
            this.setAttribute("class", "sameSelected");
            break;
          }
        }
        parPrev.click();
    });
    selElIt.appendChild(elIt);
  }
  el.appendChild(selElIt);
  selEl.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("selectHide");
    this.classList.toggle("selectArrowAct");
  });


function closeAllSelect(el) {
  var selIt, selSel, arrNo = [];
  selIt = document.getElementsByClassName("selectItems");
  selSel = document.getElementsByClassName("selectSelected");
  for (let i = 0; i < selSel.length; i++) {
    if (el == selSel[i]) {
      arrNo.push(i)
    } else {
      selSel[i].classList.remove("selectArrowAct");
    }
  }
  for (let i = 0; i < selIt.length; i++) {
    if (arrNo.indexOf(i)) {
      selIt[i].classList.add("selectHide");
    }
  }
}


document.addEventListener("click", closeAllSelect);