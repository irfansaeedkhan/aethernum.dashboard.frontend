import { AuthTokens, setAuthTokens } from '@/lib/auth';
import { customLog } from '../custom-log';

type AccessTokenValidationResponse = {
  access_token_valid: boolean;
  generate_access_token: boolean;
};
export async function validateAccessToken(
  authTokens: AuthTokens
): Promise<AccessTokenValidationResponse> {
  try {
    const [, payload] = authTokens.access_token.split('.');
    if (!payload) {
      return { access_token_valid: false, generate_access_token: false };
    }
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return { access_token_valid: false, generate_access_token: true };
    }
    if (decoded.sub) {
      return {
        access_token_valid: true,
        generate_access_token: false,
      };
    }
    return {
      access_token_valid: false,
      generate_access_token: false,
    };
  } catch (error: any) {
    console.log('Access Error ', error);
    console.log('Access ', error.status);
    return {
      access_token_valid: false,
      generate_access_token: false,
    };
  }
}

export async function validateRefreshToken(authTokens: AuthTokens): Promise<boolean> {
  try {
    const [, payload] = authTokens.refresh_token.split('.');
    if (!payload) return false;
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return false;
    await setAuthTokens(authTokens);
    return Boolean(decoded.sub);
  } catch (error: any) {
    console.log('valdating refresh token ', error);
    return false;
  }
}

// Validate Tokens from API
export async function validateTokens(authTokens: AuthTokens): Promise<boolean> {
  try {
    // Check if tokens are present
    if (!authTokens.access_token || !authTokens.refresh_token) {
      return false;
    }

    const access_token_valid = await validateAccessToken(authTokens);
    if (access_token_valid.access_token_valid) {
      return true;
    } else if (
      !access_token_valid.access_token_valid &&
      !access_token_valid.generate_access_token
    ) {
      return false;
    }
    // Validate Refresh Token
    const refresh_token_valid = await validateRefreshToken(authTokens);

    if (!refresh_token_valid) {
      await setAuthTokens({
        access_token: '',
        refresh_token: '',
      });
      return false;
    }
    return true;
  } catch (err: any) {
    console.log('Error validating token ', err);
    customLog(['development'], err);
    return false;
  }
}
