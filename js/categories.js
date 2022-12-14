const categoriesDisplay = () => {

    // start spinner for category 
    toggleSpinnerCategory(true);

    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}


const displayCategory = categories => {
    const parent = document.getElementById('categories');



    categories.forEach(category => {
        const child = document.createElement('a');
        child.classList.add('category');
        const categoryName = category.category_name;
        child.className += " " + categoryName + " " + category.category_id;
        child.innerText = category.category_name;
        parent.appendChild(child);
    });

    // stop spinner for category 
    toggleSpinnerCategory(false);

    const entertainment = parent.getElementsByClassName('All News');
    entertainment[0].classList.add('active');


    ///active category

    const btns = parent.getElementsByClassName("category");


    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            const current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace("active", "");
            this.className += " active";
        });
    }
}


categoriesDisplay();