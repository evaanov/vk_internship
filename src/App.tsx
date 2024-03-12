import './App.css';
import { useEffect, useState } from 'react';
import { Group } from './lib/types';
import getGroups from './getGroups';
import Card from './groupCard';

export interface Params { 
  closed: string,
  color: string
  friends: string
}

function App() {
  const [groups, setGroups] = useState<Group[]>([])
  const [params, setParams] = useState<Params>({closed: "all", color: 'all', friends: 'all'})
  const [loading, setLoading] = useState(false)
    

  useEffect(() => {
    setLoading(true);
    Promise.resolve(getGroups(params))
      .then((fetchedGroups) => { 
        const responseData = fetchedGroups.data ? fetchedGroups.data : [];
        const avatarColors: string[] = []
        for (const el of responseData) { 
          if (el.avatar_color && !avatarColors.includes(el.avatar_color)) { 
            avatarColors.push(el.avatar_color)
          }
        }
        setGroups(responseData)
      })
      .finally(() => {
        setLoading(false);
      })
  },[params])
  

  return (
    <div className="App">
      <h1>ВК возьмите на стажировку плиз</h1>
      <select name="privacy" id="1" onChange={(e) => setParams({...params, closed: e.target.value})}>
        <option value='all'>all</option>
        <option value='closed'>closed</option>
        <option value='public'>public</option>
      </select>
      <select name="firends" id="2" onChange={(e) => setParams({...params, friends: e.target.value})}>
        <option value='all'>all</option>
        <option value='yes'>with friends</option>
        <option value='no'>without</option>
      </select>
      <select name="colors" id='3' onChange={(e) => setParams({...params, color: e.target.value})}>
        <option value='all'>all</option>
        <option value='red'>red</option>
        <option value='green'>green</option>
        <option value='yellow'>yellow</option>
        <option value='blue'>blue</option>
        <option value='purple'>purple</option>
        <option value='white'>white</option>
        <option value='orange'>orange</option>
        
      </select>
      <div>
        <h1>Группы</h1>
        {loading && <div>Загрузка...</div>}
        {!loading && 
          groups.map((el) => (<Card key={el.id} group={el}/>))
        }
      </div>
    </div>
  );
}

export default App;