import React, { useState, useEffect } from 'react';

// styles
import './MessageContext.scss';

// services
import { ChannelService } from '../../services/ChannelService';

export const MessageContext = (props) => {
    const { activeMessage } = props
    console.log(activeMessage);
    const [tab, setTab] = useState('details');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setTab('details');
        setMessages([]);
    }, [activeMessage])

    const getActiveMessageContext = (cid, mid) => {
        ChannelService.getMessageContext(cid, mid).then((res) => {
            const messageConcat = res[0].messages.concat(res[1].messages);
            setMessages(messageConcat);
        });
    };

    const MessageDetailsComponent = () => {
        return (
            <div className="content-area">
                {activeMessage &&
                    <pre>{JSON.stringify(activeMessage.message, null, 2)}</pre>
                }
            </div>
        );
    };

    const MessageContextComponent = () => {
        return (
            <div className="content-area">
                <ul>
                    {messages &&
                        messages.map((item, i) =>
                            <li key={i}
                                className={
                                    (item.user.id === activeMessage.user.id ? 'sender' : 'receiver') +
                                    (item.id === activeMessage.message.id ? ' flagged' : '')
                                }
                            >{item.text}</li>

                        )
                    }
                </ul>
            </div>
        );
    }

    return (
        <section className="container message-context-container">
            <header>
                <div className={tab === 'details' ? 'active details-tab' : 'details-tab'} onClick={() => setTab('details')}>
                    <p>Details</p>
                </div>
                <div className={tab === 'context' ? 'active context-tab' : 'context-tab'} onClick={() => {
                    console.log(activeMessage);
                    getActiveMessageContext(activeMessage.message.cid, activeMessage.message.id);
                    setTab('context');
                }}>
                    <p>Context</p>
                </div>
            </header>
            {
                tab === 'details' ? <MessageDetailsComponent /> : <MessageContextComponent />
            }
        </section>
    )
}