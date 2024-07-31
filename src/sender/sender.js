

// *************************************** send request response from server *******************************************

// other Response messages
export const sendResponse = (res, success, message, content) => {
  return res.status(200).json({
    success: success,
    title: success ? "Success" : "Error",
    message: message,
    content,
  });
};
// server error response
export const sendError = (res, error) => {
  return res.status(500).json({
    success: false,
    title: "Error",
    message: error.message,
  });
};




















