# IdP Service

## Database Schema

Designing a database schema for an Identity Provider (IdP) service involves creating a structure that can effectively handle user identities, authentication, authorization (user roles), and other related services.

### Tables

1. **Users**
    - `UserID`: A unique identifier for the user (Primary Key)
    - `Username`: The user's chosen username.
    - `PasswordHash`: A hashed representation of the user's password.
    - `Email`: The user's email address.
    - `PhoneNumber`: The user's phone number.
    - `FirstName`: The user's first name.
    - `LastName`: The user's last name.
    - `MiddleName`: The user's middle name (if applicable).
    - `DateOfBirth`: The user's date of birth.
    - `Gender`: The user's gender.
    - `AddressLine1`: Primary address line.
    - `AddressLine2`: Secondary address line.
    - `City`: The city part of the user's address.
    - `State`: The state part of the user's address.
    - `PostalCode`: The postal code part of the user's address.
    - `Country`: The country part of the user's address.
    - `ProfilePictureURL`: URL to the user's profile picture.
    - `AccountCreationDate`: The date and time the account was created.
    - `LastLoginDate`: The date and time of the last login.
    - `AccountStatus`: Status of the account (active, suspended, etc.).
    - `TwoFactorEnabled`: Indicates if two-factor authentication is enabled.
    - `LastPasswordChangeDate`: The date of the last password change.
    - `PasswordResetToken`: Token used for password resets.
    - `PasswordResetTokenExpiry`: Expiry date of the password reset token.
    - `EmailVerified`: Indicates whether the email address has been verified.
    - `PhoneNumberVerified`: Indicates whether the phone number has been verified.
    - `SecurityQuestions`: Serialized or referenced security questions for account recovery.
    - `SecurityAnswersHash`: Hashed answers to the security questions.
    - `UserRole`: The role(s) assigned to the user (e.g., admin, user).
    - `Permissions`: Specific permissions granted to the user.
    - `OAuthTokens`: Serialized OAuth tokens if the IdP is used in OAuth scenarios.
    - `LanguagePreference`: User's preferred language.
    - `TimeZone`: User's time zone.
    - `AuditLogReference`: Reference to an audit log with records of user's activities.
    - `CustomAttributes`: A JSON/XML blob for any additional custom attributes needed.

2. **UserRoles**
    - `UserRoleID` (Primary Key): Unique identifier for the user role.
    - `UserID` (Foreign Key): Identifier for the user to whom the role is assigned.
    - `RoleID` (Foreign Key): Identifier for the role assigned to the user.
    - `AssignedDate`: The date when the role was assigned to the user.

3. **Roles**
    - `RoleID` (Primary Key): Unique identifier for the role.
    - `RoleName`: The name of the role.
    - `Description`: A brief description of the role.

4. **UserSessions** (NoSQL)
    - `SessionID` (Primary Key): Unique identifier for the session.
    - `UserID` (Reference Key): Identifier for the user who owns the session.
    - `SessionToken`: The token associated with the session.
    - `CreatedAt`: The date and time when the session was created.
    - `ExpiresAt`: The date and time when the session expires.

5. **AuditLogs** (TBD)

6. **MFASettings**
    - `MFASettingID` (Primary Key): Unique identifier for the MFA setting entry.
    - `UserID` (Foreign Key): Identifier for the user to whom the MFA setting applies.
    - `MFAType`: The type of multi-factor authentication.
    - `IsEnabled`: Indicates whether MFA is enabled for the user.
    - `ConfiguredAt`: The date and time when the MFA setting was configured.

7. **AccessTokens** (NoSQL)
    - `TokenID` (Primary Key): Unique identifier for the access token.
    - `UserID` (Reference Key): Identifier for the user who owns the access token.
    - `Token`: The access token itself.
    - `IssuedAt`: The date and time when the token was issued.
    - `ExpiresAt`: The date and time when the token expires.

8. **Application**
    - `ApplicationID` (Primary Key): Unique identifier for the application.
    - `ApplicationName`: The name of the application.
    - `Description`: A brief description of the application.
    - `IsActive`: Indicates whether the application is active.

9. **UserApplications**
    - `UserApplicationID` (Primary Key): Unique identifier for the user-application association.
    - `UserID` (Foreign Key): Identifier for the user.
    - `ApplicationID` (Foreign Key): Identifier for the application.
    - `AssignedDate`: The date when the application was assigned to the user.

### Relationships

- **Users to UserRoles:** One-to-Many (One user can have multiple roles)
- **Roles to UserRoles:** One-to-Many (One role can be assigned to multiple users)
- **Users to UserSessions:** One-to-Many (One user can have multiple sessions)
- **Users to MFASettings:** One-to-One (One user has one MFA setting)
- **Users to AccessTokens:** One-to-Many (One user can have multiple access tokens)
- **Users to UserApplications:** One-to-Many (One user can access multiple applications)
- **Application to UserApplications:** One-to-Many (One application can be accessed by multiple users)

Using a combination of SQL and NoSQL databases allows the IdP to leverage the strengths of both types of databases. SQL databases provide strong transactional integrity and are great for managing structured, relational data. NoSQL databases offer scalability and flexibility, making them ideal for handling large volumes of unstructured or semi-structured data, as well as for scenarios requiring high read/write throughput. In-memory data stores like Redis provide ultra-fast data access, which is beneficial for frequently accessed data like sessions and access tokens.
