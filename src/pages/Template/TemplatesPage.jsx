import './TemplatesPage.css'
import { useState, useEffect } from 'react';

// Components
import TemplateList from '../../components/Template/TemplateList';
import SearchBar from '../../components/global/SearchBar/SearchBar';

export default function TemplatesPage(){

    const [searchQuery, setSearchQuery] = useState('')



    return (
        <main className="TemplatesPage">
            <h1>TemplatesPage</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <TemplateList searchQuery={searchQuery} />
        </main>
    )
}