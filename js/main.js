/// <reference types="../@types/jquery"/>

const bodyLoader = document.querySelector('.newloader-container');
const inneLoader = document.querySelector('.loader-container');

  $('.nav-header-icon') .on('click',function(){
   let width=$('.nav-tab').innerWidth()
   let style=$('.side-nav-menu').attr('style')
   let styleLi=$('.links ul li').attr('style')
   console.log(styleLi)
   if(style=='left: -257.469px;' ){
      $('.nav-header-icon i').removeClass('fa-align-justify')
      $('.nav-header-icon i').addClass('fa-x')


      $('.side-nav-menu').animate({left:'0px'},400,function(){
         if(styleLi=='top: 300px;')
        {
         $('.links ul li.search').animate({top:'0px'},200,function(){
            $('.links ul li.catogry').animate({top:'0px'},200,function(){
               $('.links ul li.area').animate({top:'0px'},200,function(){
                  $('.links ul li.ingread').animate({top:'0px'},200,function(){
                     $('.links ul li.contact').animate({top:'0px'},200) 
                  })
               })
            })
         })
        }
      })
    
   }else{
      $('.nav-header-icon i').removeClass('fa-x')
      $('.nav-header-icon i').addClass('fa-align-justify')
      $('.links ul li').animate({top:'300px'},200)
      $('.side-nav-menu').animate({left:-width},400)
   }
  
  })
   
  async function getData(){
    bodyLoader.classList.remove('d-none');
   let data=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
   let fdata= await data.json();
   console.log(fdata.meals)
  displayImgRcipes(fdata.meals)
  bodyLoader.classList.add('d-none');
}
getData();

function displayImgRcipes(response){
    let box=''
    for (let i = 0; i < response.length; i++) {
      box += `
      <div class="col-md-3" data-bs-target="${response[i].idMeal}">
      <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img class="w-100" src="${response[i].strMealThumb}" alt="" >
      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${response[i].strMeal}</h3>
      </div>
  </div>
  </div>`
 
    }
    $('#rowData').html(box);
    let meals = Array.from($(".meal").parent());
  getidCard(meals)
}

function getidCard(meals) {
   meals.forEach((item) => {
     item.addEventListener("click", () => {
       displayDet($(item).attr("data-bs-target"));
     });
   });
 }

 async function displayDet(id){
   let api = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
   let respons = await api.json();
   getMealDetails(respons.meals);
}

function getMealDetails(data){
 $('.col-md-3').addClass('d-none')
 let dataArr = data[0];
 let tagsArr= [dataArr.strTags]
// console.log(tagsArr)
let tags='' ;
for (let i=0; i<tagsArr.length;i++){
   tags+=`<li class="alert alert-danger m-2 p-1">${tagsArr[i]}</li>`
  // console.log(tags)
}

let Recipes = ``;
   for (let i = 1; i <= 20; i++) {
     
     if (dataArr[`strIngredient${i}`] != "" && dataArr[`strIngredient${i}`] != null) {
      Recipes += `
      <li class="alert alert-info m-2 p-1">${dataArr[`strMeasure${i}`]} ${
         dataArr[`strIngredient${i}`]}</li>
       `;
     }
   }
 let boxMeal=`
 <div class="col-md-4">
                <img class="w-100 rounded-3" src="${dataArr.strMealThumb}" alt="">
                    <h2>${dataArr.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${dataArr.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${dataArr.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${dataArr.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${Recipes} 
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        ${tags=='<li class="alert alert-danger m-2 p-1">null</li>'? ' ' :tags}
                </ul>

                <a target="_blank" href="${dataArr.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${dataArr.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
             $('#rowData').html(boxMeal)
             $('#searchRowData').html(boxMeal)
             $('#catogryRowData').html(boxMeal)
             $('#areaRowData').html(boxMeal)
             $('#ingredRowData').html(boxMeal)
}

// *********** search ***********
function showSearchInputs(){
   window.location.href='search.html';
}
 async function searchByName(searchname){
  inneLoader.classList.remove('d-none')
   let dataSearch=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchname)
   let fdataSearch= await dataSearch.json();
  displaySearchName(fdataSearch.meals)
  inneLoader.classList.add('d-none')
 
}
function displaySearchName(data){
   let box=''
   for (let i = 0; i < data.length; i++) {
     box += `
     <div class="col-md-3" data-bs-target="${data[i].idMeal}">
     <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
     <img class="w-100" src="${data[i].strMealThumb}" alt="" >
     <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
         <h3>${data[i].strMeal}</h3>
     </div>
 </div>
 </div>`

   }
   $('#searchRowData').html(box)
   let meals = Array.from($(".meal").parent());
   getidCard(meals)
}

async function searchByFLetter(searchletter){
  inneLoader.classList.remove('d-none')
  let dataSearchLetter=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f='+searchletter)
  let  fdataSearchLetter= await dataSearchLetter.json();
  displaySearchLetter(fdataSearchLetter.meals)
  inneLoader.classList.add('d-none')
}

function displaySearchLetter(data){
   let box=''
   for (let i = 0; i < data.length; i++) {
     box += `
     <div class="col-md-3" data-bs-target="${data[i].idMeal}">
     <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
     <img class="w-100" src="${data[i].strMealThumb}" alt="" >
     <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
         <h3>${data[i].strMeal}</h3>
     </div>
 </div>
 </div>`

   }
   $('#searchRowData').html(box)
   let meals = Array.from($(".meal").parent());
   getidCard(meals)
}

// *********** catogry ***********
function getCategories(){
   window.location.href='catogry.html'
}
async function getCatogry(){
  bodyLoader.classList.remove('d-none')
   let dataCatogry=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
   let fdataCatogry= await dataCatogry.json();
   console.log(fdataCatogry.categories) 
   displayCatogry(fdataCatogry.categories)
   bodyLoader.classList.remove('d-none')
}
getCatogry()


function displayCatogry(data){
    let box=''
    for (let i = 0; i < data.length; i++) {
      box += `
      <div class="col-md-3" data-bs-target="${data[i].strCategory}">
                <div  class="catogry position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(' ').splice(0,20).join(' ')}</p>
                        </div>
                </div>
        </div>`
 
    }
    $('#catogryRowData').html(box)
    let mealsname = Array.from($(".catogry").parent());
    getNameCard(mealsname)
}

function getNameCard(mealsname) {
    mealsname.forEach((item) => {
      item.addEventListener("click", () => {
        displayCatogryDet($(item).attr("data-bs-target"));
      });
    });
  }
 
  async function displayCatogryDet(name){
    bodyLoader.classList.remove('d-none')
    let api = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    let respons = await api.json();
    bodyLoader.classList.add('d-none')
    getCatogryDetails(respons.meals.splice(0,20));
 }
 function getCatogryDetails(data){
    let box=''
    
        for (let i = 0; i < data.length; i++) {
            box += `
            <div class="col-md-3" data-bs-target="${data[i].idMeal}">
            <div  class="card position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${data[i].strMealThumb}" alt="" >
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${data[i].strMeal}</h3>
            </div>
        </div>
        </div>`
       
          }
    
    $('#catogryRowData').html(box)
    let meals = Array.from($(".card").parent());
  getidCard(meals)
}
// ********area********
function getArea(){
   window.location.href='area.html'
}
async function getAreaData(){
  bodyLoader.classList.remove('d-none')
   let dataArea=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
   let fdataArea= await dataArea.json();
   console.log(fdataArea.meals)
  displayArea(fdataArea.meals)
  bodyLoader.classList.add('d-none')
}

getAreaData()

function displayArea(data){
    let box=''
    for (let i = 0; i < data.length; i++) {
      box += `
      <div class="col-md-3" data-bs-target="${data[i].strArea}">
      <div class="area rounded-2 text-center cursor-pointer">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${data[i].strArea}</h3>
      </div>
</div>`
 
    }
    $('#areaRowData').html(box)
    let areaname = Array.from($(".area").parent());
    getNameArea(areaname)
}

function getNameArea(mealsname) {
    mealsname.forEach((item) => {
      item.addEventListener("click", () => {
        displayAreaDet($(item).attr("data-bs-target"));
      });
    });
  }

  async function displayAreaDet(nameOfArea){
    bodyLoader.classList.remove('d-none')
    let api = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nameOfArea}`)
    let respons = await api.json();
    console.log(respons.meals);
    getAreaDetails(respons.meals.splice(0,20));
    bodyLoader.classList.add('d-none')
 }


function getAreaDetails(data){
    let box=''
    
        for (let i = 0; i < data.length; i++) {
            box += `
            <div class="col-md-3" data-bs-target="${data[i].idMeal}">
            <div  class="card-area position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${data[i].strMealThumb}" alt="" >
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${data[i].strMeal}</h3>
            </div>
        </div>
        </div>`
       
          }
    
    $('#areaRowData').html(box)
    let areameals = Array.from($(".card-area").parent());
    getidCard(areameals)
}

//**********ingredient */
function getIngredients(){
   window.location.href='ingred.html'
}


async function getIngredData(){
  bodyLoader.classList.remove('d-none')
   let dataIngred=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
   let fdataIngred= await dataIngred.json();
   let data=fdataIngred.meals.splice(0,20)
   
  displayIngred(data)
  bodyLoader.classList.add('d-none')
  
}

getIngredData()

function displayIngred(data){
    let box=''
    for (let i = 0; i < data.length; i++) {
      box += `
      <div class="col-md-3" data-bs-target="${data[i].strIngredient}">
      <div class="ingredient rounded-2 text-center cursor-pointer">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${data[i].strIngredient}</h3>
              <p>${data[i].strDescription.split(' ').splice(0,20).join(' ')}</p>
              </div>
</div>`
 
    }
    $('#ingredRowData').html(box)
    let ingredname = Array.from($(".ingredient").parent());
    getNameIngred(ingredname)
}


function getNameIngred(ingredname) {
    ingredname.forEach((item) => {
      item.addEventListener("click", () => {
        displayIngredDet($(item).attr("data-bs-target"));
      });
    });
  }

  async function displayIngredDet(nameOfIngred){
    bodyLoader.classList.remove('d-none')
    let api = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameOfIngred}`)
    let respons = await api.json();
    console.log(respons.meals);
    getIngerdDetails(respons.meals);
    bodyLoader.classList.add('d-none')
 }

function getIngerdDetails(response){
    let box=''
    
        for (let i = 0; i < response.length; i++) {
            box += `
            <div class="col-md-3" data-bs-target="${response[i].idMeal}">
            <div  class="card-ingred position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${response[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${response[i].strMeal}</h3>
                </div>
            </div>
    </div>`
       
          }
    
    $('#ingredRowData').html(box)
    let ingredmeals = Array.from($(".card-ingred").parent());
    getidCard(ingredmeals)
}

// *********contact**********

function showContacts(){
      window.location.href='contact.html'
}
const nameInput = document.querySelector('#nameInput');
const nameAlert = document.querySelector('#nameAlert');
const emailInput = document.querySelector('#emailInput');
const emailAlert = document.querySelector('#emailAlert');
const phoneInput = document.querySelector('#phoneInput');
const phoneAlert = document.querySelector('#phoneAlert');
const ageInput = document.querySelector('#ageInput');
const ageAlert = document.querySelector('#ageAlert');
const passwordInput = document.querySelector('#passwordInput');
const passwordAlert = document.querySelector('#passwordAlert');
const repasswordInput = document.querySelector('#repasswordInput');
const repasswordAlert = document.querySelector('#repasswordAlert');
const submitBtn = document.querySelector('#submitBtn');
function checkInputsValidation(inputTag,isvalid,alertMessage){
  if(isvalid){
      inputTag.classList.add('is-valid');
      inputTag.classList.remove('is-invalid');
      alertMessage.classList.add('d-none');
  }
  else{
      inputTag.classList.remove('is-valid');
      inputTag.classList.add('is-invalid');
      alertMessage.classList.remove('d-none');
  };
  if(nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && rePasswordValidation()){
      submitBtn.removeAttribute('disabled');
  }
  else{
      submitBtn.setAttribute('disabled','disabled');
  };
};

function nameValidation(){
  let nameRegx = /^[a-z ,.'-]{3,}$/;
  return nameRegx.test(nameInput.value);
};

nameInput.addEventListener('keyup',function(){
  let isValid = nameValidation();
  checkInputsValidation(nameInput,isValid,nameAlert);
});

function emailValidation(){
  let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,7}$/;
  return emailRegex.test(emailInput.value);
};

emailInput.addEventListener('keyup',function(){
  let isValid = emailValidation();
  checkInputsValidation(emailInput,isValid,emailAlert);
});

function phoneValidation(){
  let phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,5}$/;
  return phoneRegex.test(phoneInput.value);
};
phoneInput.addEventListener('keyup',function(){
  let isValid = phoneValidation();
  checkInputsValidation(phoneInput,isValid,phoneAlert);
});

function ageValidation(){
  let ageRegex = /^[1-9]?[0-9]{1}$|^100$/;
  return ageRegex.test(ageInput.value);
};

ageInput.addEventListener('keyup',function(){
  let isValid = ageValidation();
  checkInputsValidation(ageInput,isValid,ageAlert);
});

function passwordValidation(){
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(passwordInput.value);
};

passwordInput.addEventListener('keyup',function(){
  let isValid = passwordValidation();
  checkInputsValidation(passwordInput,isValid,passwordAlert);
});

passwordInput.addEventListener('change',function(){
  let isValid = rePasswordValidation();
  checkInputsValidation(repasswordInput,isValid,repasswordAlert);
});

function rePasswordValidation(){
  return (repasswordInput.value == passwordInput.value);
};


repasswordInput.addEventListener('keyup',function(){
  let isValid = rePasswordValidation();
  checkInputsValidation(repasswordInput,isValid,repasswordAlert);
});

      

  

$(function(){
   $('#loading').fadeOut(1000,function () {
      $('body').css('overflow','auto')
   })
}) 


