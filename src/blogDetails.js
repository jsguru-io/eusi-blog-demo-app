import {access, eusi} from './eusi_service'
import closeimg from '../assets/close.png'

let eusiAuthorized

export const showBlogDetails = id => {
    return geteusiAuthorized().then(eusiAuthorized => {
        return getDetails(eusiAuthorized, id).then(value => {
            return `
		 		<div id="blog_details_content">
				 <img src="${closeimg}" class="close_blog_details"/>
				 <img src="${value.content[0].media[0].url}"/>
				 <h1>${value.title}</h1>
				 <p>${value.content[1].value}</p>
		 	</div>
		 	`
        })
    })
}

const geteusiAuthorized = () => {
    return access()
        .then(response => {
            return (eusiAuthorized = eusi(response.token))
        })
        .catch(error =>
            /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
            console.error('Obtaining temporary access token failed', error)
        )
}

const getDetails = (eusiAuthorized, id) => {
    return eusiAuthorized.getById(id).then(value => {
        return value
    })
}
