export const messages = {
  auth: {
    loginSuccess: 'ログインに成功しました',
    loginFailed: 'ログインに失敗しました。',
    emailNotVerified: 'メール認証が完了していません。確認コードを入力してください。',
    signupSuccess: 'サインアップ成功',
    signupFailed: 'サインアップに失敗しました',
    confirmFailed: 'アカウント確認に失敗しました',
    resendFailed: '確認コード再送信に失敗しました',
    accountConfirmed: 'アカウントが確認されました',
    resendCode: '確認コードを再送信',
  },
  validation: {
    requiredEmail: 'メールアドレスを入力してください',
    requiredPassword: 'パスワードを入力してください',
    requiredConfirmationCode: '確認コードを入力してください',
    invalidEmail: 'メールアドレスの形式が正しくありません',
    passwordTooShort: 'パスワードは8文字以上で入力してください',
    passwordsDoNotMatch: 'パスワードが一致しません',
  },
  common: {
    loading: '読み込み中...',
    retry: '再試行',
    cancel: 'キャンセル',
    confirm: '確認',
    back: '戻る',
    next: '次へ',
    submit: '送信',
  }
} as const;