import './TemplateList.css'

import { Link } from 'react-router-dom'

export default function TemplateList({templates}){
    return (
    <div className='TemplateList'>
        <ul>
            {templates.length === 0 && <li>No results found</li>}
            {templates.map(template =>
                <Link key={template.id} to={`/template?q=${template.id}`} className='link'>
                    <li key={template.id}>
                        <div className='TemplateList-template'>
                            <div className='TemplateList-icon'><i className={template.icon}></i></div>
                            <div className='TemplateList-template-name'>{template.name}</div>
                            <div className='TemplateList-template-description'>{template.desc}</div>
                        </div>
                    </li>
                </Link>
            )}
        </ul>        
    </div>)
}