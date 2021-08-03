import React, { useState, useEffect } from 'react';

// styles
import './MessageContext.scss';

// services
import { ChannelService } from '../../services/ChannelService';
import { ModerationService } from '../../services/ModerationService';

export const MessageContext = (props) => {
    const { activeMessage } = props
    const [tab, setTab] = useState('details');
    const [messages, setMessages] = useState([]);
    const [messageSentiment, setMessageSentiment] = useState(null);

    const sentimentMap = [
        'very-negative',
        'very-negative',
        'negative',
        'negative',
        'neutral',
        'neutral',
        'neutral',
        'positive',
        'positive',
        'very-positive',
        'very-positive',
    ];

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

    const getMessageSentiment = () => {
        ModerationService.getMessageSentiment(activeMessage.message.text).then((res) => {
            setMessageSentiment(res.data);
        });
    }

    const MessageDetailsComponent = () => {
        return (
            <div className="content-area">
                {activeMessage &&
                    <pre>{JSON.stringify(activeMessage.message, null, 2)}</pre>
                }
            </div>
        );
    };

    const MessageSentimentComponent = () => {
        return (
            <div className="content-area">
                <ul className="pill-container">
                    {messageSentiment &&
                        sentimentMap.map((item, i) => (
                            <li className={
                                (item) +
                                ((messageSentiment.comparative < 0 && i <= 5 && i >= (messageSentiment.comparative + 5)) ? ' show' : '') +
                                ((messageSentiment.comparative > 0 && i >= 5 && i <= (messageSentiment.comparative + 5)) ? ' show' : '') +
                                (messageSentiment.comparative === 0 && i === 5 ? ' show' : '')
                            }>
                            </li>
                        ))
                    }
                </ul>
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
                                    (item.user.id === activeMessage.user.id ? 'sender' : 'receiver')
                                }
                            >
                                <div className={(item.id === activeMessage.message.id ? 'flagged' : '') + ' message'}>
                                    <p>{item.text}</p>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }

    const renderTab = () => {
        switch (tab) {
            case 'details':
                return <MessageDetailsComponent />
            case 'context':
                return <MessageContextComponent />
            case 'sentiment':
                return <MessageSentimentComponent />
            default:
                break;
        }
    }

    if (activeMessage) {
        return (
            <section className="container message-context-container">
                <header>
                    <div className={tab === 'details' ? 'active details-tab' : 'details-tab'} onClick={() => setTab('details')}>
                        <p>Details</p>
                    </div>
                    <div className={tab === 'context' ? 'active context-tab' : 'context-tab'} onClick={() => {
                        getActiveMessageContext(activeMessage.message.cid, activeMessage.message.id);
                        setTab('context');
                    }}>
                        <p>Context</p>
                    </div>
                    <div className={tab === 'sentiment' ? 'active sentiment-tab' : 'sentiment-tab'} onClick={() => {
                        getMessageSentiment();
                        setTab('sentiment')
                    }}>
                        <p>Sentiment</p>
                    </div>
                </header>
                {
                    renderTab()
                }
            </section>
        )
    } else {
        return (
            <section className="container message-context-container">
                <p>Please select a message</p>
            </section>
        )
    }
}