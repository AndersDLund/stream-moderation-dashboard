import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

// styles
import './MessageActions.scss';

// components
import { Loader } from '../../shared/components/Loader/Loader';

// services
import { ModerationService } from '../../services/ModerationService';

export const MessageActions = (props) => {
    const { selectedMessages, selectedUsers } = props;
    const [tab, setTab] = useState('users');

    const userActions = [
        {
            title: 'ban', executable: async (props) => {
                try {
                    await ModerationService.banUser(props.selectedUsers);
                } catch (error) {
                    console.error(error);
                }
            }
        },
        { title: 'ban for 24 hours', executable: () => { } },
        { title: 'delete', executable: () => { } },
        { title: 'delete user(s) & messages', executable: () => { } },
    ];
    const messageActions = [
        { title: 'delete', executable: () => { } },
        { title: 'unflag', executable: () => { } },
    ];

    const [actions, setActions] = useState(userActions);
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

    const RenderActions = () => {
        return (
            <div className="actions-container">
                {actions.length &&
                    actions.map((item, i) => (
                        <button onClick={() => item.executable(props)} key={i}>{item.title}</button>
                    ))
                }
            </div>
        );
    }

    const changeTab = (tab, actions) => {
        setTab(tab);
        setActions(actions);
    }

    if (selectedMessages.length) {
        return (
            <section className="container message-actions-container">
                <nav className="button-container">
                    <ul>
                        <li className={(tab === 'users' ? ' active' : '')} onClick={() => changeTab('users', userActions)}>
                            <p>Users</p>
                        </li>
                        <li className={(tab === 'messages' ? ' active' : '')} onClick={() => changeTab('messages', messageActions)}>
                            <p>Messages</p>
                        </li>
                    </ul>
                </nav>
                <div className="message-actions-content">
                    <RenderActions />
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