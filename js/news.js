// event handler on categories 
document.getElementById('categories').addEventListener('click', function (event) {

    // const defaultField = document.getElementById('default');
    // defaultField.setAttribute('selected', 'selected');
    // const viewsField = document.getElementById('views');
    // viewsField.removeAttribute('selected');
    const category = () => {

        fetch("https://openapi.programming-hero.com/api/news/categories")
            .then(res => res.json())
            .then(data => getCategoryId(data.data.news_category))
            .catch(error => console.log(error))
    }



    const getCategoryId = (categories) => {


        const classList = event.target.classList;

        const categoryName = event.target.innerText;
        const result = categories.find(item => item.category_name === categoryName)

        getNews(result?.category_id, categories);
    }

    category();

})


//display news 

const displayNews = (data, category_id, categories) => {



    if (data.length > 0) {
        document.getElementById('option-select').removeAttribute('disabled');
        document.getElementById('option-select').addEventListener('click', function (event) {


            if (event.target.value === "1") {



                data.sort(function (a, b) {
                    a = a.total_view;
                    b = b.total_view;
                    return b - a;
                });

                displayNews(data, category_id, categories);
            }
        });
    } else {
        document.getElementById('option-select').setAttribute('disabled', 'true');
    }









    const parent = document.getElementById('news-container');

    const numOfNews = data.length;

    const category_name = getCategoryName(category_id, categories);


    // const newsNumberShowField=document.getElementById('news-number');

    parent.innerHTML = ``;



    if (numOfNews > 0) {
        for (const value of data) {


            setNumberOfNews('news-num', numOfNews, category_name);



            // destructuring obj 
            const { title, thumbnail_url, details, total_view, rating, author, _id } = value;

            const { name, published_date, img } = author;

            const { number } = rating;

            const child = document.createElement('div');
            child.classList.add('card');
            child.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${thumbnail_url ? thumbnail_url : 'No image'}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title ? title : 'No title'}</h5>
                            <p class="card-text">${details.length > 20 ? details.split(' ').slice(0, 70).join(' ') + '...' : details}</p>
                            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center" >
                                        <img src="${img ? img : "No image"}" class="img-fluid rounded-circle" alt="author image" height="40" width="40">
                                    </div>
                                    <div class="ms-2">
                                        <p class="author-name m-0">${name ? name : 'No author'}</p>
                                        <p class="publish-date m-0">${published_date ? published_date : 'No date'}</p>
                                    </div>
                                </div>
                                <div class="d-flex d-none d-md-block d-md-flex">
                                    <div class="me-2"><i class="fa-regular fa-eye"></i></div>
                                    <p class="view-amount m-0">${total_view ? total_view : 'No view'}</p>
                                </div>
    
                                <div class="d-none d-md-block">
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                </div>
                                <button onclick="modalOpen('${_id}');" id="details-show" class="details-btn mt-4 mt-md-0" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details</button >
                            </div >
                        </div >
                    </div >
                </div >
    `;
            child.className += " mb-3 p-3";

            // child.setAttribute("data-bs-toggle", "modal")
            // child.setAttribute("data-bs-target", "#btnModal")
            // child.setAttribute("id", "modalBtn")
            parent.appendChild(child);

        }
    } else {
        document.getElementById('news-num').innerText = `No items found in category ${category_name} `;
    }

    // stop spinner 

    toggleSpinnerNews(false);


}


// modal

// function modalOpen(thumbnailUrl, authorName, publishedDate, totalView, title, details) {

//     console.log("Clicked");
// }
function modalOpen(newsId) {
    console.log('clicked');
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayInModal(data.data))


    const displayInModal = data => {
        // console.log(data)
        const { title, author, thumbnail_url, rating, total_view, details } = data[0];

        const { name, img, published_date } = author;
        const { number } = rating;

        // author img 

        const imgField = document.getElementById('img-set');
        imgField.innerHTML = ``;
        const authorImg = document.createElement('img');
        authorImg.setAttribute('src', img);
        authorImg.setAttribute('height', '50');
        authorImg.setAttribute('width', '50');
        authorImg.classList.add('rounded-circle');


        imgField.appendChild(authorImg);

        // author info 
        const authorField = document.getElementById('author-info');
        authorField.innerHTML = ``;
        const authorName = document.createElement('p');
        authorName.innerText = `${name ? name : 'No name'}`;
        authorName.className += " m-0 fw-bold";

        const publishDate = document.createElement('p');
        publishDate.innerText = `${published_date ? published_date : 'No published date'}`;
        publishDate.className += " m-0 text-secondary";

        authorField.appendChild(authorName);
        authorField.appendChild(publishDate);

        // header right 

        const modalHeaderRight = document.getElementById('header-right');
        // modalHeaderRight.innerHTML = ``;
        modalHeaderRight.innerHTML = `
        <div class="d-flex">
            <div class="me-2"><i class="fa-regular fa-eye"></i></div>
            <p class="view-amount m-0">${total_view ? total_view : 'No view'}</p>
        </div>

        <div>
            <i class="fa-sharp fa-solid fa-star"></i>
            <i class="fa-sharp fa-solid fa-star"></i>
            <i class="fa-sharp fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-sharp fa-solid fa-star"></i>
        </div>
        `;

        // title 

        const titleField = document.getElementById('exampleModalLabel');
        titleField.innerText = ``;
        titleField.innerText = `${title}`;


        // thumbnail 

        const thumbnailField = document.getElementById('modal-thumbnail');
        thumbnailField.innerHTML = ``;
        const thumbnail = document.createElement('img');
        thumbnail.setAttribute('src', `${thumbnail_url}`);

        thumbnailField.appendChild(thumbnail);

        // detail news 
        const detailField = document.getElementById('modal-details');
        detailField.innerHTML = ``;

        const detailTitle = document.createElement('h4');
        detailTitle.innerText = `Details:`;
        detailField.appendChild(detailTitle);


        const detailNews = document.createElement('p');
        detailNews.className += " m-0";


        detailNews.innerText = `${details}`;
        detailField.appendChild(detailNews);



    }
}




