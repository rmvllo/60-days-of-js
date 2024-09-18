let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// função pra dar fech data na api

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // se o campo de input estiver vazio

    if (movieName.lenth <= 0) {
        result.innerHTML`<h3 class="msg"> Por Favor, insira o nome de um filme</h3>`;
    }

    //se o input não estiver vazio
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if movie exist in database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="\assets\star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }
                    

            // se o filme não existir na database
            else {
                result.innerHTML = `<h3 class="msg"> ${data.Error}</h3>`;
            }
        })

        // se o error ocorrer
        .catch(() => {
            result.innerHTML = `<h3 class="msg"> Ocorreu um erro</h3>`;
        });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);