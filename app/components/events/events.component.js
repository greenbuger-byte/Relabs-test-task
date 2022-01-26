import useWebSocket from 'react-use-websocket';
import { v1 } from "uuid";
import { useEffect, useState } from "react";
import { Timeline, Card, Tag, Empty } from "antd";
import { useHumanTime } from "../../hooks/useHumanTime";
import { WEBSOCKET_URL } from "../../utils/constants";

import styles from "./events.module.scss";

const EventsComponent = () => {
    const socketUrl = WEBSOCKET_URL;
    const [eventHistory, setEventHistory] = useState([]);
    const { lastMessage } = useWebSocket(socketUrl);
    const humanTime = useHumanTime('D.M.Y h:m');

    useEffect(() => {
        lastMessage &&  setEventHistory(prev => [{...JSON.parse(lastMessage.data), id: v1()}, ...prev ]);
    }, [lastMessage, setEventHistory]);

    const renderTimeLineItem = () => {
       if(lastMessage) {
           return eventHistory.map(
               (event, idx) =>
                   <Timeline.Item key={idx}>
                       <Tag className={styles.event__tag}>
                           {humanTime(event.ctime)}
                       </Tag>
                       {event.event}
                   </Timeline.Item>
           )
       }else{
           return <Empty description="Нет событий" />
       }
    }

    return (
        <Card>
            <Timeline className={styles.event}>
                {renderTimeLineItem()}
            </Timeline>
        </Card>
    );
};

export default EventsComponent;