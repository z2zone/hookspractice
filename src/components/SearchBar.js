import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = () => {
    
    const [searchTerm, setTerm] = useState(''); 

    function onInputChange(e){
        setTerm(e.target.value);
    }

    useEffect(()=>{
        const search = async ()=>{
            await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list : 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: searchTerm
                }
            }); 
        };
        search();
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
        </form>
    )
};

export default SearchBar;