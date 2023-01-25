import './App.css';
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_USERS, GET_ONE_USERS } from './query/user'
import { CREATE_USER } from './mutations/user'

function App() {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    const {data:oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USERS, {
        variables: {
            id:155
        }
    })
    const [newUser] = useMutation(CREATE_USER)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)
    
    console.log(oneUser)
    
    useEffect(() => {
        if(!loading){
            setUsers(data.getAllUsers)
        }
    }, [data])
    
    
    
    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }
    
    const getAll = e => {
        e.preventDefault()
        refetch()
    }
    
    
    if(loading) {
        return  <h1>Loading...</h1>
    }
    
    return (
    <div className="App">
        <form action="">
            <input type="text" value={username} onChange={ e => setUsername(e.target.value)}/>
            <input type="number" value={age} onChange={ e => setAge(Number(e.target.value))}/>
            <div className={"btns"}>
                <button onClick={(e)=> addUser(e)}>Создать</button>
                <button onClick={e => getAll(e)}>Получить</button>
            </div>
        </form>
        <div>
            {users.map(user =>
                <div key={user.id}>{user.id}. {user.username}. {user.age}</div>
            )}
        </div>
    </div>
  );
}

export default App;
