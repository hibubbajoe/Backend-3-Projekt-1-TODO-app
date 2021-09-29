// import { response } from 'express';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Todo() {

    const [data, setData] = useState([]);


    useEffect(() => {
        axios('http://localhost:5000/api/items')
            .then(res => setData(res.data))
    }, [])

    const onSubmit = e => {
        e.preventDefault();
    }

    const onChange = e => {
        console.log(e.target.value)
    }


    return (
        <div>
            <h1 className="App">
                JAG ÄR TODO
            </h1>

            <form onSubmit={onSubmit}>
                <input type="text" name="title" placeholder="New Todo" onChange={onChange} />
                <input type="submit" value="Add new todo" />
            </form>
            <ul>
                {data.map((item, i) => <li key={i}>{item.title}</li>)}
            </ul>
        </div>
    )

}
