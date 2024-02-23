# IdP

## Entities

- User
- Session
- Client
- Scope

## Controllers

- RegistrationController
- AuthController
- TokenController
- UserController

## Services

- CryptoService
- UserService
- SessionService(UserService)
- TokenService(CryptoService, SessionService)
- AuthService(UserService, SessionService, TokenService)
- RegistrationService(UserService)
- ScopeService
- ClientService(ScopeService)

### Tokens

```typescript
type UserClaims = {}

type BaseToken = {
  iss: string // issuer
  sub: string // user
  aud: string // client
  exp: number
  iat: number
}

type RefreshToken = BaseToken & {
  sid: string // session id
}

type AccessToken = RefreshToken & {
  scope: string
}

type IdToken = BaseToken & Partial<UserClaims>
```
