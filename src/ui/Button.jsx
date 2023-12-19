import { Link } from "react-router-dom";

export default function Button({ children, to, type, onClick }) {
  const base =
    "inline-block rounded-full bg-yellow-400  text-sm font-semibold text-stone-800 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2";
  const style = {
    small: base + " px-2 py-2",
    primary: base + " px-3 py-4 sm:text-medium",
    round :  base + " px-2.5 py-1 sm:text-medium",
    secondary:
      "px-3 py-4 inline-block rounded-full bg-stone-200  text-sm font-semibold text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2",
  };
  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick) return <button onClick={onClick} className={style[type]}>{children}</button>;
  return <button className={style[type]}>{children}</button>;
}
