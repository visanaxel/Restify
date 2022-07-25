const Button = ({ value, update, isOperator }) => {
    const style = !isOperator ? {backgroundColor: 'lightgray', color: 'black'} : {backgroundColor: 'orange', color: 'white'}
    return <button
        style={{...style, fontSize: '2em'}}
        onClick={() => update(value)}
    >
        {value}
    </button>
}

export default Button;