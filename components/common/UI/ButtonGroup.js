const ButtonGroup = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          display: flex;
        }

        div > :global(*) {
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default ButtonGroup;
