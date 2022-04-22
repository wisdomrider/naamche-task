export const parseBackendErrors = (err, showToast) => {
  const showErrorToast = (msg) => {
    showToast({
      title: "Error",
      description: msg,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  if (err.response && err.response.data && err.response.data.errors) {
    for (const key in err.response.data.errors) {
      showErrorToast(err.response.data.errors[key].message);
    }
  } else if (err.response && err.response.data && err.response.data.error) {
    showErrorToast(err.response.data.error);
  } else if (err.response && err.response.data && err.response.data.message) {
    showErrorToast(err.response.data.message);
  } else {
    showErrorToast("Something went wrong");
  }
};
