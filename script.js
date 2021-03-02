
const searchButton = document.getElementById('search-meal');
searchButton.addEventListener('click',()=>{
    const userInput = document.getElementById('input').value;
    getMealList (userInput);
   
} );


const getMealList = meal =>{
fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
.then(response => response.json())
// .then(data => console.log(data));
.then(data => renderMeal(data))
.catch(error => console.log(error))
};

       const renderMeal = meals => {
        const foodsRow = document.getElementById('meal-details');
        const mealList = meals.meals;
         for (let i = 0; i < mealList.length; i++) {
         const mealName = mealList[i];
         const mealDetailDiv = document.createElement('div');
           mealDetailDiv.className = 'mealItem'; 
    
           const mealInfo =  `
                    <img src="${mealName.strMealThumb}" >
                          <h3> ${mealName.strMeal}</h3>
                          <button id="details" onclick="getListName('${mealName.strMeal}')" >Ingredients</button>  
                       `;
                
           mealDetailDiv.innerHTML = mealInfo;
           foodsRow .appendChild(mealDetailDiv); 
           document.getElementById('input').value = " ";
        }
    }


const getListName = mealList =>{
      fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealList}`)
      .then(res => res.json())
     .then(data => foodIngredients(data.meals[0]));
    
    }

    const foodIngredients = items =>{
        const ingredientDiv = document.getElementById('meal-ingredient-list');
        ingredientDiv.innerHTML = `
        <img src="${items.strMealThumb}" >
        <h3> ${items.strMeal}</h3>
        <div id="ingredient"></div>
       
        `;

        const ingredientList = Object.values(items);

        for (let i = 9; i < 20; i++) {
            const ingredientPer = ingredientList[i];
            if(ingredientPer  == " " || null){
                break;
            }
            else{
            const mealIngredient = document.getElementById('ingredient');
            const item = document.createElement('p');
            item.innerText = "☑ " + ingredientPer ;
            mealIngredient.appendChild(item);
            }   
            
        }
        document.getElementById('meal-details').value = "";
        };


    

