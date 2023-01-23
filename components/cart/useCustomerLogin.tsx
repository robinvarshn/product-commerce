import { ApolloError, gql, useMutation } from '@apollo/client';

const CUSTOMER_LOGIN = gql`
    mutation GenerateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

export const useCustomerLogin = (): Function | null => {
    const [loginFn, { data: loginData, loading: loginLoading, error: loginError }] =
        useMutation(CUSTOMER_LOGIN);

    if (loginLoading) {
        console.log('logging in...');
        return null;
    }

    if (loginError) {
        console.error('Error in login... ', loginError);
        return null;
    }

    //   if (loginData) {
    //     const token = loginData.generateCustomerToken
    //       ? loginData.generateCustomerToken.token
    //       : null;
    //     if (token) {
    //       sessionStorage.setItem("token", token);
    //     }
    //   }

    //   useEffect(() => {
    //     loginFn();
    //   }, []);

    return loginFn;
};

export const loginHandler = (loginFn: Function) => {
    return new Promise((resolve, reject) => {
        if (!loginFn) {
            reject();
        }
        loginFn({
            variables: {
                // email: "abc@test.com",
                email: 'tmpuser@tmp.com',
                password: 'Test@123',
            },
            onCompleted: (loginData: any) => {
                if (loginData) {
                    const token = loginData.generateCustomerToken
                        ? loginData.generateCustomerToken.token
                        : null;
                    if (token) {
                        sessionStorage.setItem('token', token);
                    }
                }
                resolve(loginData);
            },
            onError: (error: ApolloError) => {
                reject(error);
            },
        });
    });
};
