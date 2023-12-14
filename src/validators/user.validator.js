import Joi from '@hapi/joi';

export const newUserValidator = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .error(new Error('Passwords do not match'))
  });

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const passwordValidater = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .error(new Error('Passwords do not match'))
  });

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
