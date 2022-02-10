import React, { useState } from 'react';
import Slider from "react-slick";

// styles
import './MessageActions.scss';

// components
import { Loader } from '../../shared/components/Loader/Loader';

// services
import { ModerationService } from '../../services/ModerationService';

export const MessageActions = (props) => {
    const { selectedMessages, selectedUsers, flagged, setFlagged, toast, setToast } = props;
    const [tab, setTab] = useState('users');

    const handleToast = (apiResponse) => {

        const toastClone = { ...toast };
        toastClone.show = true;
        toastClone.text = apiResponse.data.payload;
        toastClone.success = apiResponse.status === 200 ? true : false;
        setToast(toastClone);

        setTimeout(() => {
            const toastCloneTimeout = { ...toast }
            toastCloneTimeout.show = false;
            toastCloneTimeout.text = '';
            toastCloneTimeout.success = null;
            setToast(toastCloneTimeout);
        }, 5000);
    }

    const userActions = [
        {
            title: 'ban', executable: async (props) => {
                try {
                    const response = await ModerationService.banUser(props.selectedUsers);
                    handleToast(response);
                } catch (error) {
                    handleToast(error.response);
                    console.error(error.response,);
                }
            }
        },
        {
            title: 'ban for 24 hours', executable: async (props) => {
                try {
                    const response = await ModerationService.banUser24(props.selectedUsers);
                    handleToast(response);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        {
            title: 'delete', executable: async (props) => {
                try {
                   const response = await ModerationService.deleteUser(props.selectedUsers);
                   handleToast(response);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        {
            title: 'delete user(s) & messages', executable: async (props) => {
                try {
                    const response = await ModerationService.deleteUserAndMessages(props.selectedUsers);
                    handleToast(response);
                } catch (error) {
                    console.error(error);
                }
            }
        },
    ];
    const messageActions = [
        {
            title: 'delete', executable: async (props) => {
                try {
                    const response = await ModerationService.deleteMessage(props.selectedMessages);
                    const flaggedClone = [...flagged];
                    const removed = flaggedClone.filter(item => !props.selectedMessages.includes(item));
                    setFlagged(removed);
                    handleToast(response);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        {
            title: 'unflag', executable: async (props) => {
                try {
                    await ModerationService.unflagMessage(props.selectedMessages);
                } catch (error) {
                    console.error(error);
                }
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
            <section className="container message-actions-placeholder">
                <Loader message={'Select a message'} />
            </section>
        );
    }

}