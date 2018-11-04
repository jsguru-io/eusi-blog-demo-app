import { generateBlogTemplate } from './generateTemplates';
import Loader from 'brsjs-loader'

const loader = new Loader('loader', 'standard')

export const searchBlogs = (eusiAuthorized, value) => {
  loader.show();
	const blogs_preview = document.querySelector('#blogs_preview')
	blogs_preview.innerHTML = ''

	eusiAuthorized
    .get({
      title: {
        $like: `%${value}%`
    },
    })
		.then(blogs => {
			loader.hide()
			blogs.data.forEach(b => {
				generateBlogTemplate(b).then(html => {
					blogs_preview.innerHTML += html
				})
			})
		})
}