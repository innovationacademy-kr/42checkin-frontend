import '../styles/Checkbox.css';

function Checkbox(props) {
  const { idx, text, checkStatus, setCheckStatus } = props;

  const handleChange = () => {
    const checked = checkStatus[idx];
    setCheckStatus([...checkStatus.slice(0, idx), !checked, ...checkStatus.slice(idx + 1)]);
  };

  return (
    <div className='checkbox-text'>
      <input
        id={idx}
        className='checkbox'
        type='checkbox'
        checked={checkStatus[idx]}
        onChange={handleChange}
      />
      <label htmlFor={idx}>{text}</label>
    </div>
  );
}
export default Checkbox;
