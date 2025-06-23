import { authUsecase } from '@/domain/auth/usecase/authUsecase';
import { SignInRequestSchema } from '@/domain/schemas/AuthSchema';
import { returnPostError, returnSuccess } from '@/service/returnStatus';
import { definePostValidators } from '@/validators';
import { defineController } from './$relay';

export default defineController(() => ({
  post: {
    validators: definePostValidators(SignInRequestSchema),
    handler: ({ body }) => authUsecase.signIn(body).then(returnSuccess).catch(returnPostError),
  },
}));
