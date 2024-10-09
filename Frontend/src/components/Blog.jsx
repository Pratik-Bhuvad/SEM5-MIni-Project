import React from 'react'

const Blog = ({blog}) => {
    return (
        <article className="relative flex flex-col items-start justify-end shadow-lg rounded-lg p-6" style={{ background: `linear-gradient(transparent, black), url(${blog.imageUrl})`, backgroundSize: 'cover' }} >
            <h3 className="text-xl font-semibold text-yellow-100"> {blog.title} </h3>
            <p className="mt-3 text-sm text-yellow-100"> {blog.description} </p>
            <a href={blog.href} className="inline-block mt-5 text-sm font-medium text-blue-600 hover:underline" > Read More </a>
        </article>
    )
}

export default Blog
