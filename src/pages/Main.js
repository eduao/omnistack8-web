import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from '../services/api';

export default function Main( { match }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.post('/devs/index', [] ,{
                headers : { 
                    fromdevid: match.params.id
                }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    async function handleLike(id) {
        console.log('like', id)

        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                fromDevId: match.params.id
            }
        })
        setUsers(users.filter( user => user._id !== id))
    }
    async function handleDislike(id) {
        console.log('dislike', id)

        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                fromDevId: match.params.id
            }
        })
        setUsers(users.filter( user => user._id !== id))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>

            {users.length === 0 ? (
                <div className="empty" >Você analisou todos! </div>
            ) : (
                <ul>
                { users.map( user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt="Foto do dev" />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">

                            <button type="button" onClick={() => handleDislike(user._id)}>
                                <img src={dislike} alt="like"/>
                            </button>

                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={like} alt="dislike"/>
                            </button>
                        </div>
                </li>
                )) }
            </ul>)}
        </div>
    );
}