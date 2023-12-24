export default function Loader({
  darkOn,
  darkOff,
}: {
  darkOn: string;
  darkOff: string;
}) {
  return (
    <div className="lds-default">
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
      <div className={`dark:${darkOn} ${darkOff}`}></div>
    </div>
  );
}
