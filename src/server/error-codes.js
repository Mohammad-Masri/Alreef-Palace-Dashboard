const SERVER_ERROR_CODES = [
  {
    code: 1,
    message: 'انتهت صلاحية الجلسة, سجل الدخول مرة اخرى',
  },
  {
    code: 3,
    message: 'اسم المستخدم او كلمة المرور خاطئة',
  },
  {
    code: 4,
    message: 'اسم المستخدم او كلمة المرور خاطئة',
  },
  {
    code: 302,
    message: 'لقد قمت بتسجيل دفعة (راتب) لهذا الموظف في هذا الشهر مسبقا',
  },
];

const default_error_message = 'خطأ غير معروف';

export const getErrorMessageByCode = (code) => {
  const error = SERVER_ERROR_CODES.find((e) => e.code == code);
  let error_message = default_error_message;
  if (error != null) {
    error_message = error.message;
  }
  return error_message;
};
