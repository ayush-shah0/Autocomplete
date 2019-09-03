function autocomplete(inp, arr, selArr) {
  let currentFocus;
  inp.addEventListener("input", function({target}) {
    let a;
    let b;
    let i;
    const val = this.value;
    const acListDiv = document.getElementById(`${this.id}autocomplete-list`);
    if(acListDiv) {
      acListDiv.parentNode.removeChild(acListDiv);
    }
    closeAllLists(target);
    if (!val) { return false;}
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", `${this.id}autocomplete-list`);
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    arr.map((value, index) => {
      if (value.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.setAttribute("class", "items")
        const check = document.createElement("input");
        check.type = "checkbox";
        check.value = value;
        

        b.appendChild(check);
        b.innerHTML += `<strong>${value.substr(0, val.length)}</strong>`;
        b.innerHTML += value.substr(val.length);
        b.innerHTML += `<input type='hidden' value='${value}'>`;
        b.addEventListener("click", function(e) {
            
            //console.log(this);
            const check = this.querySelector("input[type='checkbox']");

            if(check.checked)
            {
              check.checked = false;
            }
            else
            {
              check.checked = true;
            }


            if(check.checked)
            {
              selArr.push(check.value);
            }
            else
            {
              selArr.forEach((item, i) => {
                if(item === check.value)
                {
                  selArr.splice(i, 1);
                }
              })
            }
            updateInput();
            e.stopImmediatePropagation();


            // inp.value = this.getElementsByTagName("input")[0].value;
            // // closeAllLists();
        });
        a.appendChild(b);
        
      }
    })
  });

    inp.addEventListener("focus", function({target}) {
      console.log("input focused");
      let a;
      let b;
      let i;
      const acListDiv = document.getElementById(`${this.id}autocomplete-list`);
      if(acListDiv) {
        acListDiv.parentNode.removeChild(acListDiv);
      }
      closeAllLists(target);
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", `${this.id}autocomplete-list`);
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      arr.forEach((value, index) => {
        // if (value.substr(0, val.length).toUpperCase() == val.toUpperCase()) 
        {
          b = document.createElement("DIV");
          b.setAttribute("class", "items")
          const check = document.createElement("input");
          check.type = "checkbox";
          check.value = value;
          

          b.appendChild(check);
          // b.innerHTML += "<strong>" + value.substr(0, val.length) + "</strong>";
          b.innerHTML += value;
          b.innerHTML += `<input type='hidden' value='${value}'>`;
          b.addEventListener("click", function(e) {
              
              //console.log(this);
              const check = this.querySelector("input[type='checkbox']");

              if(check.checked)
              {
                check.checked = false;
              }
              else
              {
                check.checked = true;
              }


              if(check.checked)
              {
                selArr.push(check.value);
              }
              else
              {
                selArr.forEach((item, i) => {
                  if(item === check.value)
                  {
                    selArr.splice(i, 1);
                  }
                })
              }
              updateInput();
              e.stopImmediatePropagation();


              // inp.value = this.getElementsByTagName("input")[0].value;
              // // closeAllLists();
          });
          a.appendChild(b);
          
        }
      })
    });

  inp.addEventListener("keydown", function(e) {
      let x = document.getElementById(`${this.id}autocomplete-list`);
      if (x) 
      {
        x = x.getElementsByTagName("div");
      }
      if (e.keyCode == 40) 
      {
        currentFocus++;
        console.log("Down");
        addActive(x);
      }
      else if (e.keyCode == 38) 
      {
        currentFocus--;
        console.log("Up");
        addActive(x);
      } 
      else if (e.keyCode == 13) 
      {
        e.preventDefault();
        if (currentFocus > -1) 
        {
          if (x) x[currentFocus].click();
        }
      }
      /*var y = document.getElementById(this.id + "autocomplete");
      if (y) y = y.getElementsByTagName("div");
      if(e.keycode == 8){
        console.log("Backspace");
        addActive(y);
      }*/

      const input = document.getElementById("myInput");

      input.onkeydown = () => {
        const key = e.keyCode;

        if(key === 8)
        {
          console.log("Backspace Detected");
          selectedCountries.splice(0, selectedCountries.length);
          input.value = '';
        }
        
      };
  });

  function updateInput()
  {
    const input = document.getElementById("myInput");
    input.value = '';
    console.log("selected countries", selectedCountries);
    selectedCountries.forEach( (item, i) => {
        if(i === (selectedCountries.length - 1) )
        {
          input.value += item;
        }
        else
        {
          input.value += `${item}, `;
        }
    });
    console.log("value", input.value);
   
  }


  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", ({target}) => {
      closeAllLists(target);
  });
}

const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var selectedCountries = [];
autocomplete(document.getElementById("myInput"), countries, selectedCountries);