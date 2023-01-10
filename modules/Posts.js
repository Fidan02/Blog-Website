
//Composing to HTML format
function composePostsHTML(postimet){
    let result = ''

    for(let i = 0; i < postimet.posts.length; i++){
        result += `
            <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 mb-3">
                <div class="card h-100">
                    <div class="card-body rounded">
                        <h5 class="card-title"><a href="post.html?id=${postimet.posts[i].id}" class="text-decoration-none text-dark">${postimet.posts[i].title}</a></h5>
                        <h6 class="card-subtitle mb-2 pb-1 border-bottom border-dark text-muted">User: ${postimet.posts[i].userId}</h6>
                        <div mt-2">
                            <span class="badge bg-danger">TAGS: ${postimet.posts[i].tags}</span>
                        </div>
                            <br>
                        <p class="card-text description text-secondary p-2 mt-3 ">
                            ${postimet.posts[i].body.substring(0, 200)} 
                            <a href="#" class="text-decoration-none text-dark">...</a>
                        </p>
                        <span class="badge">
                                <button class="btn btn-outline-primary" id="like_btn" >
                                    👍: ${postimet.posts[i].reactions}
                                </button>
                        </span>
                    </div>
                </div>
            </div>
        `
    }
    
    return result;

}
function composePostMainHTML(postimet){
    let result = ''
    
    for(let i = 0; i < postimet.posts.length; i++){
        if(postimet.posts[i].reactions > 7){
            result += `
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card h-100">
                    <div class="card-body rounded">
                        <h5 class="card-title"><a href="post.html?id=${postimet.posts[i].id}" class="text-decoration-none text-dark">${postimet.posts[i].title}</a></h5>
                        <h6 class="card-subtitle mb-2 pb-1 border-bottom border-dark text-muted">User: ${postimet.posts[i].userId}</h6>
                        <div mt-2">
                            <span class="badge bg-danger">TAGS: ${postimet.posts[i].tags}</span>
                        </div>
                            <br>
                        <p class="card-text description text-secondary p-2 mt-3 ">
                            ${postimet.posts[i].body.substring(0, 200)} 
                            <a href="#" class="text-decoration-none text-dark">...</a>
                        </p>
                        <span class="badge">
                                <button class="btn btn-outline-primary">
                                    👍: <span id="like_btn">${postimet.posts[i].reactions}</span>
                                </button>
                            </span>
                    </div>
                </div>
            </div>
        `
        }
    }
        return result;
    
}
function composePostHTML(postimet){
    let result = ''

        result += `
            <div class="pb-2 border-dark border-bottom d-flex justify-content-between">
            <h3>Post: <span class="text-secondary">${postimet.title}:</span></h3>
            <p class="text-secondary fw-bold">User: <span class="text-danger">${postimet.userId}</span></p>
            </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12">
                        <div class="card border-0">
                            <div class="card-body">
                            <p class="card-text fs-4 p-2">
                                ${postimet.body} 
                            </p>
                            <div class="mt-2 d-flex justify-content-between ">
                                <span class="badge p-2 fs-6 bg-danger text-wrap">TAGS: ${postimet.tags}</span>
                                <button class="btn btn-outline-primary text-wrap p-2" id="like_btn" >
                                    👍: ${postimet.reactions}
                                </button>
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
        `
    
    return result;
}


function composeQuote(quote){
    let result = ''

        result += `
            <h6 class="card-title text-center text-dark fst-italic" >"${quote.quote}"</h6>
                <p class="card-text text-center text-danger fw-bolder">
                    ${quote.author} 
                </p>
        `
    
    return result;
}

//Composing the API url
function composeApiUrl(options){
    let url = `https://dummyjson.com/posts`
    const limit = (options.limit !== null) ? options.limit : null

    if(limit !== null){
        return `${url}?limit=${limit}`
    } else {
        return url;
    }
}


//Sorting system
function sort(sorted, div){
    document.querySelector('select').addEventListener('change', (e) => {
        if(e.target.value === 'asc'){
            sorted.posts.reverse()
            div.innerHTML = composePostsHTML(sorted);
        } else if (e.target.value === 'desc'){
            sorted.posts.reverse()
            div.innerHTML = composePostsHTML(sorted);
        } else if (e.target.value === 'liked'){
            div.innerHTML = composePostMainHTML(sorted);
        }
    })
    return sorted.posts
}







//Exported Functions
export function getPosts(div, options) {
    fetch(composeApiUrl(options))
            .then(res =>res.json())
            .then(data => {{
                
                div.innerHTML = composePostsHTML(data);
                sort(data, div)
    }})
}

export function getTopPosts(div, options){
    fetch(composeApiUrl(options))
            .then(res =>res.json())
            .then(test => {{
                div.innerHTML = composePostMainHTML(test);
    }})
}

export function getQuote(div){
    fetch('https://dummyjson.com/quotes/random')
        .then(res => res.json())
        .then(quote => {{
            div.innerHTML = composeQuote(quote)
    }})
}

export default function getSinglePost(div, id){
    fetch(`https://dummyjson.com/posts/${id}`)
    .then(res => res.json())
    .then(singlePost => {
        div.innerHTML = composePostHTML(singlePost)
    })
}
