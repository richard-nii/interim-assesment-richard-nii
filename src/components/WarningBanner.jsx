const WarningBanner = () => {
  return (
    <div style={{
      backgroundColor: '#ff0000',
      color: '#000000',
      padding: '12px',
      textAlign: 'center',
      fontWeight: '500',
      borderBottom: '1px solid #ffeeba'
    }}>
      This is a student project and not affiliated with Coinbase.
    </div>
  );
};

export default WarningBanner;