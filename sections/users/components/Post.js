import React from 'react'
export default function Post ({post}) {
    const p = post.post;
    const user = post.user;
    return <div className="post">
        <h2>{p.title}</h2>
        <p>{p.body}</p>
        <span>{user.name}, {user.website}</span>
    </div>
}