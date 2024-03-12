import { Params } from './App';
import groupsJSON from './lib/group.json';
import { GetGroupsResponse, Group } from './lib/types';


export default function getGroups(params: Params): Promise<GetGroupsResponse> {
    const { closed , color, friends } = params
    const notFiltredGroups = JSON.parse(JSON.stringify(groupsJSON));
    const groups = notFiltredGroups.filter((g : Group) => { 
        const passedPrivacyFilter = closed === 'all' ? true : (closed === 'closed' && g.closed === true) || (closed === 'public' && g.closed === false) 
        const passedColorFilter = color === 'all' ? true : color === g.avatar_color;
        const passedFriendsFilter = friends === 'all' ? true : (friends === 'yes' && g.friends !== undefined) || (friends === 'no' && g.friends === undefined)

        return (passedColorFilter && passedFriendsFilter && passedPrivacyFilter)
    })


    if (groups) { 
        return new Promise((res) => {
            setTimeout(() => res({result: 1, data: groups}), 1000)
        })
    }   
    return new Promise((res) => {
        setTimeout(() => res({result: 0}), 1000)
    })
}