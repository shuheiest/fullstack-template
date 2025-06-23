import { authUsecase } from '@/domain/auth/usecase/authUsecase';
import { SignUpRequestSchema } from '@/domain/schemas/AuthSchema';
import { returnPostError, returnSuccess } from '@/service/returnStatus';
import { definePostValidators } from '@/validators';
import { defineController } from './$relay';

export default defineController(() => ({
  post: {
    validators: definePostValidators(SignUpRequestSchema),
    handler: ({ body }) => authUsecase.signUp(body).then(returnSuccess).catch(returnPostError),
  },
}));
