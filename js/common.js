const getNews = (category_id, categories) => {
    // start spinner 
    toggleSpinnerNews(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data, category_id, categories))
}



// initially show news 
fetch("https://openapi.programming-hero.com/api/news/categories").then(res => res.json()).then(data => getNews('08', data.data.news_category));




const getCategoryName = (id, categories) => {
    const result = categories.find(item => item.category_id === id);

    const category_name = result.category_name;

    return category_name;
}



// set Number of news 

const setNumberOfNews = (inputId, numOfNews = 0, category_name) => {


    if (numOfNews > 0) {
        document.getElementById(inputId).innerText = `${numOfNews} items found in category ${category_name}`;
    }

}

// spinner for news

const toggleSpinnerNews = isLoading => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
};

// spinner for category 
const toggleSpinnerCategory = isLoading => {
    const spinner = document.getElementById('category');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
};
