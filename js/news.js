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
    // const newsNumberShowField=document.getElementById('news-number');

    parent.innerHTML = ``;

    for (const value of data) {

        if (value > 0) {
            document.getElementById('news-num').innerText = value + " "
        }
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
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <div class="d-flex align-items-center" >
                                    <img src="${img}" class="img-fluid rounded-circle" alt="author image" height="40" width="40">
                                </div>
                                <div class="ms-2">
                                    <p class="author-name m-0">${name}</p>
                                    <p class="publish-date m-0">${published_date}</p>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="me-2"><i class="fa-regular fa-eye"></i></div>
                                <p class="view-amount m-0">${total_view}</p>
                            </div>

                            <div>
                                <i class="fa-sharp fa-solid fa-star"></i>
                                <i class="fa-sharp fa-solid fa-star"></i>
                                <i class="fa-sharp fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-sharp fa-solid fa-star"></i>
                            </div>
                            <button class="details-btn">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        child.className += " mb-3 p-3";
        parent.appendChild(child);

    }
}