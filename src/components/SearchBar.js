import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = () => {
    
    const [searchTerm, setTerm] = useState('programming'); 
    const [data, setData] = useState([]);

    function onInputChange(e){
        setTerm(e.target.value);
    }
    const renderData = data.map((item)=>{
        return (
            <div className="item" key={item.pageid}>
                <div className="content">
                    <div className="header">
                        {item.title}
                    </div>
                </div>
                {item.snippet}
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${item.pageid}`}   
                    >Go</a>
                </div>
            </div>
        );
    });

    useEffect(()=>{
        const search = async ()=>{
            const response = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list : 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: searchTerm
                }
            }); 
            setData(response.data.query.search);
        };
        if(searchTerm){
            search();
        }
    }, [searchTerm]);

    return (
        <form className="ui form">
            <div className="field">
                <label>Search Bar</label>
                <input 
                    value ={searchTerm}
                    onChange = {onInputChange}
                    className="input"
                />
            </div>
            <div className="ui celled list">
                {renderData}
            </div>
        </form>
    )
};

export default SearchBar;