import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import './Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from '../services/api';
import loadUsers from '../services/loadUsers';

export default function Main( { match }) {

    const { id : loggedUserId } = match.params;
    const [users, setUsers] = useState([]);


    // Função que rodará ao ter o usuário logado
    async function runLoadUsers() {
        setUsers(await loadUsers(loggedUserId));
    }

    useEffect(runLoadUsers, [loggedUserId]);

    async function handleLike(id, type = true) {
        console.log('like', id)

        const stringgedType = type ? '' : 'dis';
        const url = `/devs/${id}/${stringgedType}likes`;
        console.log(url);
        // return;

        await api.post(url, null, {
            headers: {
                fromDevId: loggedUserId
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

                            <button type="button" onClick={() => handleLike(user._id, false)}>
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