import React, { Component } from 'react'
import { t } from '../../../polyglot-modules/polyglot.js';
import Post from '../components/Post';

export default class Users extends Component {
    constructor(props){
        super(props)
        this.state =  {
            error: false,
            loading: false,
            posts: [],
            searchField: "",
            searched: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.getUserPosts = this.getUserPosts.bind(this);
    }
    handleChange(event){
        this.setState({searchField: event.target.value});
    }
    getUserPosts(){
        this.setState({searched: true});
        fetch(`api/buscar-post?search=${this.state.searchField}`,{
            method: 'GET',
          })
          .then(response => response.json())
          .then(data => {
            this.setState({
                loading: false,
                posts: data,
            })
          }).catch((e)=>{
              console.log(e)
            this.setState({
                error: true,
                loading: false
              })
          })
    }

    render(){
        const {posts, loading, searched} = this.state;
        return(
            <div className="post-search">
                <input type="text" value={this.state.searchField} onChange={this.handleChange}/>
                <button className="btn" onClick={this.getUserPosts}>{t("index.users.search")}</button>
                <div className="post-list">
                    {posts.map((post) => {
                        return <Post post={post}/>
                        })
                    }
                </div>
                {loading && <p>{t('index.users.loading')}</p>}
                {searched && posts.length == 0 && <p>{t('index.users.noResults')}</p>}
            </div>
        )
    }
}
