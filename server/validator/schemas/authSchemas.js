export const signUpSchema = {
  name: 'required|string|min:2|max:48',
  email: 'required|email|min:5|max:98',
  password: 'required|alpha_dash|min:8|max:20',
  confirmPassword: 'required|alpha_dash|min:8|max:20|same:password',
  address1: 'string|min:5|max:98',
  city: 'string|min:2|max:98',
  region: 'string|min:2|max:98',
  postalCode: 'numeric',
  country: 'string|min:5|max:98',
  mobPhone: 'numeric',
  shippingRegionId: 'numeric|min:1',
};

export const loginSchema = {
  email: 'required|email|min:5|max:98',
  password: 'required|alpha_dash|min:8|max:20',
};
