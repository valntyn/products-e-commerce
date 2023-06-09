import './ApprovalModal.scss';

type PropTypes = {
  handleApprove: () => void;
  handleDismiss: () => void;
  isDisabled: boolean;
  message: string;
  error: string;
};

export const ApprovalModal: React.FC<PropTypes> = ({
  handleDismiss,
  message,
  handleApprove,
  error,
  isDisabled,
}) => {
  return (
    <div className="approval__notify-wrapper">
      <p className="approval__notify-message">
        {message}
      </p>
      <div className="approval__notify-box">
        <button
          type="button"
          className="approval__button"
          onClick={handleApprove}
          disabled={isDisabled}
        >
          Of course
        </button>
        <button
          type="button"
          className="approval__button"
          onClick={handleDismiss}
        >
          {error ? 'Return' : 'Nope'}
        </button>
        {error && <p className="approval__notify">{error}</p>}
      </div>
    </div>
  );
};
