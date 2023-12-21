export default function InputFiled({type, name, placeholder, required, className, defaultValue, disabled}){
    return(
        <input
        type={type}
        name={name}
        placeholder={placeholder}
        required = {required}
        defaultValue = {defaultValue}
        disabled={disabled}
        className={`rounded-full px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 ${className}`}
      />
    )
}