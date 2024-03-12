import { FC, useState } from "react";
import { Group } from "./lib/types";

interface CardProps { 
    group: Group
}

const Card: FC<CardProps> = ({group}) => {
    const [friendsButton, setFriendsButton] = useState(false)
    const [friends, setFriends] = useState([])

    return (
        <div className="card">
            <span className="dot" style={{
                backgroundColor: group.avatar_color ? group.avatar_color : ''
            }}></span>
            <h3>{group.name}</h3><br />
            <p>{group.closed ? "Закрытая" : "Открытая"}</p><br />
            <p>{group.members_count} подписчиков</p>
            <div>
                {group.friends ? <button className='dk' onClick={() => setFriendsButton(!friendsButton)}>{"Друзей подписаны: " + group.friends.length}</button> : <></>}
                {group.friends && friendsButton ? <div className="friendBox">{group.friends.map((el) => <p>{el.first_name} {el.last_name}</p>)}</div>: <></>}
            </div>
        </div>
    );
}

export default Card;