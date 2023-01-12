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
        let f = (config.url + url).replace(/^\/|\/$/g, '')
        f += '/'

        if (document.head.querySelector('link[rel="canonical"]').href === f) return
        document.head.querySelector('link[rel="canonical"]').href = f
        if ( document.head.querySelector('meta[property="og:url"]') === null){
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:url');
            meta.setAttribute('content', '');
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
        document.head.querySelector('meta[property="og:url"]').content = f
    },
    SetType(type="website"){
        document.head.querySelector('meta[property="og:type"]').content = type
    }
}