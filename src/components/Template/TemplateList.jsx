import './TemplateList.css'

export default function TemplateList({templates}){
    return (
    <div className='TemplateList'>
        <ul>
            {templates.length === 0 && <li>No results found</li>}
            {templates.map(template =>
                <li key={template.id}>
                    <div className='TemplateList-template'>
                        <div className='TemplateList-icon'><i className={template.icon}></i></div>
                        <div className='TemplateList-template-name'>{template.name}</div>
                        <div className='TemplateList-template-description'>{template.desc}</div>
                    </div>
                </li>
            )}
        </ul>        
    </div>)
}