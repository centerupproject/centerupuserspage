import './headline.css';

export const HeadLine = ({title,description}) => {
  return (
    <div className='headline__layout'>
<h1><span className="headline__text">{title}</span></h1>
<p dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};
