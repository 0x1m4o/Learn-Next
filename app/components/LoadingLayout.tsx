const LoadingLayout = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-overlay"></div>
      <div className="spinner">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingLayout;
