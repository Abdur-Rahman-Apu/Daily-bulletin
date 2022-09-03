// event handler on categories 
document.getElementById('categories').addEventListener('click', function (event) {

    const category = () => {
        fetch("https://openapi.programming-hero.com/api/news/categories")
            .then(res => res.json())
            .then(data => getCategoryId(data.data.news_category))
    }

    const getCategoryId = (categories) => {
        const categoryName = event.target.innerText;
        const result = categories.find(item => item.category_name === categoryName)
        getNews(result?.category_id);
    }

    category();

})


//display news 

const displayNews = data => {


    const parent = document.getElementById('news-container');
    parent.innerHTML = ``;

    for (const value of data) {

        // destructuring obj 
        const { title, thumbnail_url, details, total_view, rating, author } = value;

        const { name, published_date, img } = author;

        const { number } = rating;

        const child = document.createElement('div');
        child.classList.add('card');
        child.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${details.length > 20 ? details.split(' ').slice(0, 70).join(' ') : details}</p>
                        <div>
                            <div class="d-flex">
                                <div class="d-flex align-items-center" >
                                    <img src="${img}" class="img-fluid rounded-circle" alt="author image" height="40" width="40">
                                </div>
                                <div class="ms-2">
                                    <p class="author-name m-0">${name}</p>
                                    <p class="publish-date m-0">${published_date}</p>
                                </div>
                            </div>
                            <div></div>
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        child.className += " mb-3 p-3";
        parent.appendChild(child);

    }
}