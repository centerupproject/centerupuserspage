import './TextCard.css'
export const TextCard = ({ title, description}) => {
    return(
        <div className="text__card">
          {title && <p className="text__card--title">{title}</p>}
          {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
        </div>
    )
}