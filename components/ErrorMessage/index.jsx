function ErrorMessage({ mess }) {
    return (
        <>
            <p className="text-error italic text-sm mt-1">{`*${mess}`}</p>
        </>
    );
}

export default ErrorMessage;
