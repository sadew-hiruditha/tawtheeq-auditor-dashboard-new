import Joi from 'joi';

export const validate = (schema, data) => {
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}; 