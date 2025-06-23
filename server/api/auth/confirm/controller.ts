import { authUsecase } from '@/domain/auth/usecase/authUsecase';
import { ConfirmSignUpRequestSchema } from '@/domain/schemas/AuthSchema';
import { returnPostError, returnSuccess } from '@/service/returnStatus';
import { definePostValidators } from '@/validators';
import { defineController } from './$relay';

export default defineController(() => ({
  post: {
    validators: definePostValidators(ConfirmSignUpRequestSchema),
    handler: ({ body }) =>
      authUsecase.confirmSignUp(body).then(returnSuccess).catch(returnPostError),
  },
}));
