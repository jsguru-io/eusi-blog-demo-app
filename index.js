import "./index.scss";
import Loader from "brsjs-loader";
import {access, eusi} from "./src/eusi_service";
import {generateAboutTemplate, generateBlogTemplate} from "./src/generateTemplates";
import {showBlogDetails} from "./src/blogDetails";
import {searchBlogs} from "./src/search";

let eusiAuthorized;
const loader = new Loader("loader", "standard");
// when page loads, do some stuff
window.onload = () => {
    // doing some stuff
    loader.show();
    access()
        .then(response => {
            eusiAuthorized = eusi(response.token);
            loadBlogs();
            loadAbout();
        })
        .catch(error => {
            loader.hide();
            /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
            console.error("Obtaining temporary access token failed", error);
        });
};

const loadBlogs = () => {
    const blogs_preview = document.querySelector("#blogs_preview");
    blogs_preview.innerHTML = "";

    eusiAuthorized
        .get({
            model: "blog"
        })
        .then(blogs => {
            loader.hide();
            blogs.data.forEach(b => {
                generateBlogTemplate(b).then(html => {
                    blogs_preview.innerHTML += html;
                });
            });
        });
};

const loadAbout = () => {
    const about = document.querySelector("#about");
    eusiAuthorized.getByModel("about").then(response => {
        generateAboutTemplate(response.data[0]).then(value => {
            about.innerHTML = value;
        });
    });
};

document.querySelector("body").addEventListener("click", event => {
    const details = document.querySelector("#blog_details");

    switch (event.target.className) {
        case 'readmorebtn':
            loader.show();
            showBlogDetails(event.target.dataset["id"]).then(html => {
                details.classList.add("details_active");
                details.innerHTML = html;
                window.scrollTo(0, 0);
                loader.hide();
            });
            break;
        case 'close_blog_details':
            details.classList.remove("details_active");
            break;
        case 'search_btn':
            searchBlogs(eusiAuthorized, document.getElementById("search_blogs_value").value);
            break;
        default:
            return;
    }
});
