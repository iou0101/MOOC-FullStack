const Notification = ({ message, isError = false }) => {
  // default is that it's an error notification
  let cssClasses = "prompt";

  message === ""
    ? (cssClasses += " prompt-hide")
    : (cssClasses += " prompt-show ");

  isError !== false ? (cssClasses += " error-prompt") : (cssClasses += "");

  return <div className={cssClasses}>{message}</div>;
};

export default Notification;
