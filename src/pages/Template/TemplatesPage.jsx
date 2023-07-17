import './TemplatesPage.css'
import { useState, useEffect } from 'react';

// API
import { searchTemplates } from '../../utilities/templates-service';

// Components
import TemplateList from '../../components/Template/TemplateList';
import SearchBar from '../../components/global/SearchBar/SearchBar';
import NewTemplateBar from '../../components/Template/NewTemplateBar';

export default function TemplatesPage(){

    const [searchQuery, setSearchQuery] = useState('')
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        async function fetchTemplates() {
            const fetchedTemplates = await searchTemplates(searchQuery);
            setTemplates(fetchedTemplates);
        }
        fetchTemplates();
    }, [searchQuery])

    return (
        <main className="TemplatesPage">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder='Search your templates' />
            <NewTemplateBar />
            <TemplateList templates={templates} />
        </main>
    )
}