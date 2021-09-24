import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

// styles
import './MessageActions.scss';

// components
import { Loader } from '../../shared/components/Loader/Loader';

export const MessageActions = (props) => {
    const { selectedMessages, selectedUsers } = props;
    const [tab, setTab] = useState('users');
    const settings = {
        autoplay: true,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const SliderComponent = () => {
        const mappableArray = tab === 'users' ? selectedUsers : selectedMessages
        return (
            <Slider {...settings}>
                {mappableArray.length &&
                    mappableArray.map((item, i) => (
                        <p key={i}>{tab === 'users' ? item : item.message.text}</p>
                    ))
                }
            </Slider>
        );
    }

    if (selectedMessages.length) {
        return (
            <section className="container message-actions-container">
                <nav className="button-container">
                    <ul>
                        <li className={(tab === 'users' ? ' active' : '')} onClick={() => setTab('users')}>
                            <p>Users</p>
                        </li>
                        <li className={(tab === 'messages' ? ' active' : '')} onClick={() => setTab('messages')}>
                            <p>Messages</p>
                        </li>
                    </ul>
                </nav>
                <div className="message-actions-content">
                    {/* where actions (buttons) go */}
                </div>
                <div className="slider-container">
                    <SliderComponent />
                </div>
            </section>
        );
    } else {
        return (
            <section className="container">
                <Loader message={'Select a message'} />
            </section>
        );
    }

}