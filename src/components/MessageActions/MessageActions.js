import React, { useState } from 'react';
import Slider from "react-slick";

// styles
import './MessageActions.scss';

// components
import { Loader } from '../../shared/components/Loader/Loader';

// services
import { ModerationService } from '../../services/ModerationService';

export const MessageActions = (props) => {
    const { selectedMessages, selectedUsers, flagged, setFlagged } = props;
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
        // Step 2 copy ban for each of the following 
        {
            title: 'ban for 24 hours', executable: async (props) => {
                try {
                    await ModerationService.banUser24(props.selectedUsers);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        {
            title: 'delete', executable: async (props) => {
                try {
                    await ModerationService.deleteUser(props.selectedUsers);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        {
            title: 'delete user(s) & messages', executable: async (props) => {
                try {
                    await ModerationService.deleteUserAndMessages(props.selectedUsers);
                } catch (error) {
                    console.error(error);
                }
            }
        },
    ];
    // for message action use props.selectedMessages
    const messageActions = [
        {
            title: 'delete', executable: async (props) => {
                try {
                    await ModerationService.deleteMessage(props.selectedMessages);
                    const flaggedClone = [...flagged];
                    const removed = flaggedClone.filter(item => !props.selectedMessages.includes(item));
                    setFlagged(removed);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        {
            title: 'unflag', executable: async (props) => {
                // try {
                //     await ModerationService.unflagMessage(props.selectedMessages);
                // } catch (error) {
                //     console.error(error);
                // } 
            }
        },
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