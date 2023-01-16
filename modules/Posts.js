
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
                        
                        <span>
                            <button id="like" class="btn btn-outline-primary">
                            👍: <span id="increase">${postimet.posts[i].reactions}</span>
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
    
    const newData = postimet.posts.sort((a, b) => {
        return a.reactions - b.reactions
    }).reverse().slice(0, 4)
    
    for(let i = 0; i < newData.length; i++){
            result += `
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-3">
                    <div class="card h-100">
                        <div class="card-body rounded">
                            <h5 class="card-title"><a href="post.html?id=${newData[i].id}" class="text-decoration-none text-dark">${newData[i].title}</a></h5>
                            <h6 class="card-subtitle mb-2 pb-1 border-bottom border-dark text-muted">User: ${newData[i].userId}</h6>
                            <div mt-2">
                                <span class="badge bg-danger">TAGS: ${newData[i].tags}</span>
                            </div>
                                <br>
                            <p class="card-text description text-secondary p-2 mt-3 ">
                                ${newData[i].body.substring(0, 200)} 
                                <a href="#" class="text-decoration-none text-dark">...</a>
                            </p>
                            <span>
                                <button id="like" class="btn btn-outline-primary">
                                    👍:<span id="increase">${newData[i].reactions}</span> 
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            `
        
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
                                <span class="badge p-2 fs-md-6 bg-danger text-wrap">TAGS: ${postimet.tags}</span>
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
function composeComments(comment){
    let result = '';

    for(let i = 0; i<comment.comments.length; i++){
        result += `
            <div class="commentBox border border-secondary rounded m-2 pt-3 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <p class="commentUserId rounded fw-bold" >${comment.comments[i].user.username}:</p>
                <p class="commentBodyId fst-italic">${comment.comments[i].body}</p>
            </div>
        `
    }

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
function sortSystem(sorted, div){
    document.querySelector('select').addEventListener('change', (e) => {
        if(e.target.value === 'asc'){
            sorted.posts.sort((a, b) => {
                return a.id - b.id
            })
            div.innerHTML = composePostsHTML(sorted);
        } else if (e.target.value === 'desc'){
            sorted.posts.sort((a, b) => {
                return a.id - b.id
            }).reverse()
            div.innerHTML = composePostsHTML(sorted);
        } else if (e.target.value === 'liked'){
            sorted.posts.sort((a, b) => {
                return a.reactions - b.reactions
            }).reverse()
            div.innerHTML = composePostsHTML(sorted);
        } else {
            sorted.posts.sort((a, b) => {
                return a.reactions - b.reactions
            })
            div.innerHTML = composePostsHTML(sorted);
        }
    })
    return sorted.posts
}




function addLike(){
    const increase = document.querySelectorAll('#increase')
    

    let isLiked = false;
    increase.forEach(increase => increase.addEventListener('click', e => {
        
        let numberOfLikes = Number.parseInt(increase.innerText, 10);
            if(!isLiked){
                numberOfLikes++
                increase.innerText = numberOfLikes
                isLiked = !isLiked
            }else{
                numberOfLikes--
                increase.innerText = numberOfLikes
                isLiked = !isLiked
            }
            
    }))
    
    //Me gjet menyre me ndreq!!!!!
    //const getLike = document.querySelectorAll('#like')        
    // getLike.forEach(like => like.addEventListener('click', () => {

    // }))
        
}


//Exported Functions
export function getPosts(div, options) {
    fetch(composeApiUrl(options))
            .then(res =>res.json())
            .then(data => {{
                
                div.innerHTML = composePostsHTML(data);
                sortSystem(data, div)
                addLike()
    }})
}

export function getTopPosts(div, options){
    fetch(composeApiUrl(options))
            .then(res =>res.json())
            .then(data => {{
                div.innerHTML = composePostMainHTML(data);
                addLike()
    }})
}

export function getQuote(div){
    fetch('https://dummyjson.com/quotes/random')
        .then(res => res.json())
        .then(quote => {{
            div.innerHTML = composeQuote(quote)
    }})
}

export function getSinglePost(div, id){
    fetch(`https://dummyjson.com/posts/${id}`)
    .then(res => res.json())
    .then(singlePost => {
        div.innerHTML = composePostHTML(singlePost)
    })
}

export function getComments(div, id){
    fetch(`https://dummyjson.com/posts/${id}/comments`)
    .then(res => res.json())
    .then(comments => {
        div.innerHTML = composeComments(comments);
    })

}
export function searchPost(div, value){
    fetch(`https://dummyjson.com/posts/search?q=${value}`)
    .then(res => res.json())
    .then(searchData => {
        div.innerHTML = composePostsHTML(searchData);
    })
}
