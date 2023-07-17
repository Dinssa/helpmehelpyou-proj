import './TemplateList.css'

export default function TemplateList({templates}){
    return (
    <div>
        <h1>TemplateList</h1>
        <ul className='TemplateList'>
            {templates.map(template =>
                <li key={template.id}>
                    <div className='TemplateList-template'>
                        <div className='TemplateList-template-name'>{template.name}</div>
                        <div className='TemplateList-template-description'>{template.desc}</div>
                    </div>
                </li>
            )}
        </ul>        
    </div>)
}