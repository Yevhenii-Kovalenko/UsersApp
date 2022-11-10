import React from 'react';
import './index.css'
import { Success } from './components/Success';
import { Users } from './components/Users/Users';



function App() {

  const [users, setUsers] = React.useState([]) // стан де зберігаються користувачі(users)
  const [isLoading, setLoading] = React.useState(true) // стан де зберігається загрузка Скелетона ,якщо список користувачів не загрузився
  const [searchValue, setSearchValue] = React.useState('') // стан інпуту
  const [invites, setInvites] = React.useState([]) // стан запрошених користувачів
  const [success, setSuccess] = React.useState(false) // стан 

  React.useEffect(() => {
    fetch('https://reqres.in/api/users') //запит на сервер
    .then(res => res.json()) // відповідь форматується у Json форматі
    .then(json => {
      setUsers(json.data) // виймаємо відповідь з json 
    }).catch(err => {
      console.warn(err);
      alert('Помилка') // відловлюю помилку
    }).finally(() => setLoading(false)) // незалежно від відповіді змінюю стан загрузки 
  },[])


  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)){
      setInvites(prev => prev.filter(_id => _id !== id)) // отримуєм попереднє значення , робим фільтрацію та достаєм кожне ід
    } else{
      setInvites((prev) => [... prev , id])
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {
        success ? (<Success count={invites.length} />) : 
        (<Users
          onClickSendInvites={onClickSendInvites}
          onClickInvite={onClickInvite}
          invites={invites}
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading} />)
      }
    </div>
  );
}

export default App;
