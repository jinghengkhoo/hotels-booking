const LoadingIcon = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="loading loading-spinner loading-lg"
        role="status">
      </div>
      <span className="visually-hidden p-4">Loading...</span>
    </div>
  );
};

export default LoadingIcon;
