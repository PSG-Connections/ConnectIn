import {validEmail} from '../constants/regex';

const Joi = require('@hapi/joi');

const authSchema: any = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.required(),
});

export default authSchema;
