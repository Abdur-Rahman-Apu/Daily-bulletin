const getNews = (category_id) => {
    console.log(category_id);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

getNews("08");