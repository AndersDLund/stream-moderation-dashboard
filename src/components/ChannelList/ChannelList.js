import React, { useEffect, useState } from 'react';
import './ChannelList.scss';
import { StreamChat } from 'stream-chat'; 
const key = 'xfyrhz6nwwxz';
const chatClient = StreamChat.getInstance(key); 
const userId = 'Ryan'; 
// const token = chatClient.createToken(userId);
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUnlhbiJ9.JaI1xNZ0b2taG04F_dNQHcU6kjpVgxf1hd5vLLKe72I';
chatClient.connectUser({ id: userId }, userToken);
const filter = { members: { $in: ['Ryan'] }, };
const sort = { last_message_at: -1 };

// const renderChannels = async () => {
//     console.log(channels)
//     return channels.map(channel => <li>{channel.id}</li>
//     )}

export const ChannelList = (props) => {
    // use effect variables
    const [channels, setChannels] = useState([])
    
    // other variables

    // functions
    useEffect(() => {
        chatClient.queryChannels(filter, sort, {}).then((res) => {
            setChannels(res)
        });
    }, [])

    // updateInputValue(newInputValue) = async () => {
    //     console.log(newInputValue)
    // };

    useEffect(() => {
        chatClient.queryChannels(filter, sort, {}).then((res) => {
            setChannels(res)
        });
    }, [input])

    return (
        <section className="container">
        <input>
        </input>
        <input onChange={e => this.updateInputValue(e.target.value)}></input>
        <ul>
        {channels.map(channel => <li>{channel.id}</li>)}
        </ul>
        {/* {props.items.map((item, index) => (
        <Item key={index} item={item} />
      ))} */}
        </section>
    )
}