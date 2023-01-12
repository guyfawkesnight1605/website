const config = require('./config')

export default {

    //60 letters
    SetTitle(title = config.title){
        if (document.title !== title ) document.title = title
        document.head.querySelector('meta[property="og:title"]').content = title
        if (title.length > 60) console.warn("title length is invalid", title)
    },

    //150 letters
    SetDescription(description = config.description){
        if (document.head.querySelector('meta[name="description"]').content === description) return
        document.head.querySelector('meta[name="description"]').content = description
        document.head.querySelector('meta[property="og:description"]').content = description
        if (description.length > 150) console.warn("description length is invalid", description)
    },

    //max 10 keywords
    SetKeywords(keywords = config.keywords ){
        if (document.head.querySelector('meta[name="keywords"]').content === keywords) return
        document.head.querySelector('meta[name="keywords"]').content = keywords
        if (keywords.split(',').length > 10) console.warn("keywords length is invalid", keywords)
    },
    SetImage(image = config.img){
        image = image.replace(/^\/|\/$/g, '')
        if (document.head.querySelector('meta[property="og:image"]').content === config.url + '/'+ image ) return
        document.head.querySelector('meta[property="og:image"]').content = config.url + image
    },
    SetUrl(url){
        url = url.replace(/^\/|\/$/g, '')
        if (document.head.querySelector('link[rel="canonical"]').href === config.url+url) return
        document.head.querySelector('link[rel="canonical"]').href = config.url+url
        document.head.querySelector('meta[property="og:url"]').content = config.url+url
    }
}