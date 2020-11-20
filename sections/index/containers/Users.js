import React, { Component } from 'react'
import { t } from '../../../polyglot-modules/polyglot.js'
import SearchUser from '../../users/containers/SearchPosts';

class Users extends Component {
    constructor(props){
        super(props)
        this.state =  {
            error: false,
            loading: true,
            users: [],
        }
    }
    getUserPosts(){
        fetch('api/traer-usuarios',{
            method: 'GET',
          })
          .then(response => response.json())
          .then(data => {
            this.setState({
                loading: false,
                users: data,
            })
          }).catch((e)=>{
            this.setState({
                error: true,
                loading: false
              })
          })
    }
    componentDidMount(){
        this.getUserPosts()
    }
    render(){
        const { loading, error, users } = this.state;
        return(
            <section>
                <h1>{t('index.users.title')}</h1>
                {!error && !loading &&
                <div className="user-list">
                        {
                        users.map(user=>{
                            return(<div key={user.id} className="user-item">
                                <h2>{user.title}</h2>
                                <p>{user.body}</p   >
                            </div>)
                        })
                        }
                    </div>
                }
                {loading &&
                    <div className="loading">Cargando usuarios...</div> 
                }
                <SearchUser/>
            </section>
        
        )
    }
}

export default Users