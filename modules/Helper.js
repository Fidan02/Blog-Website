export default function getPostFromUrl(url, post){
    if(!url.includes('?')) return null
    const url_sp =  new URLSearchParams(url.split('?')[1])
    return url_sp.get(post)
}
