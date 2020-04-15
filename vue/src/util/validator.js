const validateTel = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else {
    const telephoneValidator = (value) => /^1[3|4|5|7|8]\d{9}$/.test(value)
    if (!telephoneValidator(value) || value.length !== 11) {
      callback(new Error('手机号格式错误'));
    } else {
      callback();
    }
  }
};



export default {
  validateTel
}