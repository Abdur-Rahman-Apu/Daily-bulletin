const getNews = (category_id, categories) => {

    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data, category_id, categories))
}



// initialy show news 
fetch("https://openapi.programming-hero.com/api/news/categories").then(res => res.json()).then(data => getNews('08', data.data.news_category));




const getCategoryName = (id, categories) => {
    const result = categories.find(item => item.category_id === id);

    const category_name = result.category_name;

    return category_name;
}





const setNumberOfNews = (inputId, numOfNews = 0, category_name) => {


    if (numOfNews > 0) {
        document.getElementById(inputId).innerText = `${numOfNews} items found in category ${category_name}`;
    }

}