const generateBlogTemplate = blog =>
    new Promise((resolve, reject) => {
        if (blog) {
            const html = `
						<div (onclick)="hi()" class="eusi_blog">
						<div class="blog_background_thumb" style="background-image: url('${
                blog.content[0].media[0].thumbnails["200x200"]
                }');">
						</div>
						<h1>${blog.title}</h1>
						<p>${blog.content[1].value}</p>
						<div class="readmore__date">
						<button class="readmorebtn" data-id="${blog.id}">Read more</button>
						<span>${new Date(blog.published_at).toLocaleDateString("en-US")}</span>
						</div>
						</div>
            `;
            resolve(html);
        } else {
            reject(new Error("No blog passed"));
        }
    });

const generateAboutTemplate = about =>
    new Promise((resolve, reject) => {
        if (about) {
            const html = `
				<h1>${about.title}</h1>
				<p>${about.content[0].value}</p>`;

            resolve(html);
        } else {
            reject(new Error("No about passed"));
        }
    });

export {generateBlogTemplate, generateAboutTemplate};
