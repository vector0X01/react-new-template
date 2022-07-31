const env = 'local';

const hostURL = {
  local: 'http://localhost:8083', // local server url
  development: process.env.REACT_APP_DEVELOPMENT_URL,
  production: process.env.REACT_APP_PRODUCTION_URL,
};

const CognitoCredentials = {
  local: {
    Region: process.env.REACT_APP_AWS_REGION,
    ClientId: process.env.REACT_APP_AWS_CLIENT_ID_LOCAL,
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID_LOCAL,
    TokenScopesArray: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
    RedirectUriSignIn: 'http://localhost:3000',
    RedirectUriSignOut: 'http://localhost:3000',
  },
  development: {
    Region: process.env.REACT_APP_AWS_REGION,
    ClientId: process.env.REACT_APP_AWS_CLIENT_ID_DEV,
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID_DEV,
    TokenScopesArray: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
    RedirectUriSignIn: process.env.REACT_APP_REDIRECT_URI_SIGN_DEV,
    RedirectUriSignOut: process.env.REACT_APP_REDIRECT_URI_SIGN_DEV,
  },
  production: {
    Region: process.env.REACT_APP_AWS_REGION,
    ClientId: process.env.REACT_APP_AWS_CLIENT_ID_PRD,
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID_PRD,
    TokenScopesArray: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'], // e.g.['phone', 'email', 'profile','openid', 'aws.cognito.signin.user.admin'],
    RedirectUriSignIn: process.env.REACT_APP_REDIRECT_URI_SIGN_PRD,
    RedirectUriSignOut: process.env.REACT_APP_REDIRECT_URI_SIGN_PRD,
  },
};

const Privilege = ['Admin', 'Engineer', 'Technician', 'Client'];

const ProductOwner = process.env.REACT_APP_OWNER_NAME;

const ClientType = ['End User', 'OEM', 'ODM'];

export const config = {
  HostURL: hostURL[env],
  CognitoCredentials: CognitoCredentials[env],
  Privilege: Privilege,
  ProductOwner: ProductOwner,
  ClientType: ClientType,
  env,
};
