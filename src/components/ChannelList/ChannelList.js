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
let filterValue = '';
// const renderChannels = async () => {
//     console.log(channels)
//     return channels.map(channel => <li>{channel.id}</li>
//     )}

export const ChannelList = (props) => {
    // use effect variables
    const [channels, setChannels] = useState([])
    const [cid, setCID] = useState('')
    // other variables

    // functions
    useEffect(() => {
        chatClient.queryChannels(filter, sort, {}).then((res) => {
            setChannels(res)
        });
    }, [])

    // changeFilter(() => {
    //     filter = ''
    //     chatClient.queryChannels(filter, sort, {}).then((res) => {
    //         setChannels(res)
    //     });
    // }, [])

    //  updateChannelList(() => {
    //     const newFilter = { members: { $in: [filterValue] }, };
    //     // console.log(newFilter)
    //     chatClient.queryChannels(filter, sort, {}).then((res) => {
    //         setChannels(res)
    //     }, [])
    // },

    //  updateInputValue(x) {
    //     console.log(x);
    //    filterValue = x;
    //    };

    return (
        <section className="container">
            <button onClick={e => updateChannelList()}></button>
        <input onChange={e => updateInputValue(e.target.value)}></input>
        <ul>
        {channels.map(channel => <li>{channel.id}</li>)}
        </ul>
        {/* {props.items.map((item, index) => (
        <Item key={index} item={item} />
      ))} */}
        </section>
    )
}