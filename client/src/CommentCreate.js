import React, { useState } from 'react'
import axios from 'axios';

export default function CommentCreate({ postId }) {
    const [content, setContet] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content })
        setContet("")
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={e => setContet(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
