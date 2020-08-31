import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function PostList() {
    const [posts, setPosts] = useState({});

    async function fetchPosts(url) {
        const response = await axios.get(url); /* The response is a JSON object*/
        setPosts(response.data);
    }

    useEffect(() => { fetchPosts("http://localhost:4000/posts"); }, []);
    console.log(posts);
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {
                Object.values(posts).map(post => {
                    return (
                        <div className="card" key={post.id} style={{ width: "45%", marginBottom: "20px" }}>
                            <div class="card-body">
                                <h5 class="card-title">{post.title}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
