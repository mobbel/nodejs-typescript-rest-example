const test = () => {
  const testData = () => {
    return (JSON.stringify({ test: 'data' }));
  };

  return {
    testData,
  };
};

export default test;
