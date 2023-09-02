console.log("js/index.js");

const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const categories = data.data;
        displayCategories(categories);
    }
    catch(error){
        console.log(error);
    }
};
const displayCategories = (categories) =>{
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
        console.log(category);
        const {category_id, category:categoryName} = category;
        console.log(category_id, categoryName);
        const newBtn = document.createElement("button");
        newBtn.classList.add("px-5", "py-2", "rounded", "text-lg", "primary-bg");
        newBtn.innerText = categoryName;
        categoriesContainer.appendChild(newBtn);
    })
}
loadCategories();