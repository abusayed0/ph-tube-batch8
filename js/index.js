console.log("js/index.js");
let clickedCategoryId;
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const categories = data.data;
        displayCategories(categories);
    }
    catch (error) {
        console.log(error);
    }
};
const displayCategories = categories => {
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
        const { category_id, category: categoryName } = category;
        const newBtn = document.createElement("button");
        newBtn.setAttribute("onclick", `loadCategoryData(${category_id})`);
        newBtn.classList.add("px-5", "py-2", "rounded", "text-lg", "font-medium", "primary-bg");
        newBtn.innerText = categoryName;
        categoriesContainer.appendChild(newBtn);
    });
};


const loadCategoryData = async id => {

    clickedCategoryId = id;
    const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const categoryData = data.data;
        displayCategoryData(categoryData);
    }
    catch (error) {
        console.log(error);
    }
};
const displayCategoryData = data => {
    const categoryDataContainer = document.getElementById("category-data-container");
    categoryDataContainer.innerHTML = "";
    if (data.length) {
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("mt-14", "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-6");
        data.forEach(singleData => {
            const { thumbnail, title, authors, others } = singleData;
            const newDiv = document.createElement("div");
            newDiv.innerHTML = `
        <div class="border">
            <!-- card thumbnail -->
            <div>
                <img class="w-full h-[200px] " src="${thumbnail}" alt="">
            </div>
            <!-- card body -->
            <div class="mt-4 flex gap-3 p-2">
            <!-- author image  -->
                <div>
                    <img class="h-[40px] w-[40px] rounded-full" src="${authors[0].profile_picture}" alt="">
                </div>
                <!-- other data  -->
                <div class="flex flex-col gap-2">
                    <h2 class="text-base font-bold">${title}</h2>
                    <div class="flex items-center">
                        <h4 class="text-sm">${authors[0].profile_name}</h4>
                        ${authors[0].verified ? `<i class="ml-4 fa-regular fa-circle-check text-blue-600 text-base"></i>` : ""}
                    </div>
                    <p class="text-sm">${others.views} views</p>
                </div>
            </div>
      </div>
        `;
            cardsContainer.appendChild(newDiv);
        });
        categoryDataContainer.appendChild(cardsContainer);
    }
    else{
        const notFoundContainer = document.createElement("div");
        notFoundContainer.classList.add("mt-24","max-w-[400px]", "mx-auto", "text-center", "flex", "flex-col", "items-center", "gap-6");
        notFoundContainer.innerHTML = `
            <img  src="../resources/Icon.png" alt="">
            <h2 class="font-bold text-3xl">Oops!! Sorry, There is no content here</h2>
        `;
        categoryDataContainer.appendChild(notFoundContainer);
    }

}
loadCategories();
loadCategoryData(1000);
const shortByViewHandle = () =>{
    console.log(clickedCategoryId);
}