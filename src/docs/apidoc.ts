/**
 * @api {post} /auth/login User Login
 * @apiName UserLogin
 * @apiGroup Authentication
 *
 * @apiParam {string} [username] User's username.
 * @apiParam {string} [email] User's email.
 * @apiParam {string} password User's password.
 *
 * @apiSuccess {string} token Authentication token.
 * @apiSuccess {UserWithId} user User information.
 */

/**
 * @api {get} /users Get Users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {PartialUser[]} List of users.
 */

/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {string} username User's username.
 * @apiParam {string} email User's email.
 * @apiParam {string} password User's password.
 * @apiParam {string} [firstName] User's first name.
 * @apiParam {string} [lastName] User's last name.
 * @apiParam {string} [phone] User's phone number.
 * @apiParam {string} city User's city.
 *
 * @apiSuccess {UserWithId} Created user.
 */

/**
 * @api {get} /users/me Get Current User
 * @apiName GetCurrentUser
 * @apiGroup Users
 *
 * @apiSuccess {UserWithId} Current user's information.
 */

/**
 * @api {put} /users/me Update Current User
 * @apiName UpdateCurrentUser
 * @apiGroup Users
 *
 * @apiParam {string} [username] Updated username.
 * @apiParam {string} [email] Updated email.
 * @apiParam {string} [password] Updated password.
 * @apiParam {string} [firstName] Updated first name.
 * @apiParam {string} [lastName] Updated last name.
 * @apiParam {string} [phone] Updated phone number.
 * @apiParam {string} [city] Updated city.
 *
 * @apiSuccess {UserWithId} Updated user information.
 */

/**
 * @api {delete} /users/me Delete Current User
 * @apiName DeleteCurrentUser
 * @apiGroup Users
 *
 * @apiSuccess {number} id ID of the deleted user.
 */

/**
 * @api {get} /users/:id Get User by ID
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiParam {number} id ID of the user.
 *
 * @apiSuccess {UserWithId} User information.
 */

/**
 * @api {put} /users/:id Update User by ID
 * @apiName UpdateUserById
 * @apiGroup Users
 *
 * @apiParam {number} id ID of the user.
 * @apiParam {string} [username] Updated username.
 * @apiParam {string} [email] Updated email.
 * @apiParam {string} [password] Updated password.
 * @apiParam {string} [firstName] Updated first name.
 * @apiParam {string} [lastName] Updated last name.
 * @apiParam {string} [phone] Updated phone number.
 * @apiParam {string} [city] Updated city.
 *
 * @apiSuccess {UserWithId} Updated user information.
 */

/**
 * @api {delete} /users/:id Delete User by ID
 * @apiName DeleteUserById
 * @apiGroup Users
 *
 * @apiParam {number} id ID of the user.
 *
 * @apiSuccess {number} id ID of the deleted user.
 */

/**
 * @api {get} /listings Get Listings
 * @apiName GetListings
 * @apiGroup Listings
 *
 * @apiSuccess {ListingWithId[]} List of listings.
 */

/**
 * @api {post} /listings Create Listing
 * @apiName CreateListing
 * @apiGroup Listings
 *
 * @apiParam {PostableListing} Listing information.
 *
 * @apiSuccess {ListingWithId} Created listing.
 */

/**
 * @api {get} /listings/:id Get Listing by ID
 * @apiName GetListingById
 * @apiGroup Listings
 *
 * @apiParam {number} id ID of the listing.
 *
 * @apiSuccess {ListingWithId} Listing information.
 */

/**
 * @api {put} /listings/:id Update Listing by ID
 * @apiName UpdateListingById
 * @apiGroup Listings
 *
 * @apiParam {number} id ID of the listing.
 * @apiParam {PostableListing} Updated listing information.
 *
 * @apiSuccess {ListingWithId} Updated listing information.
 */

/**
 * @api {delete} /listings/:id Delete Listing by ID
 * @apiName DeleteListingById
 * @apiGroup Listings
 *
 * @apiParam {number} id ID of the listing.
 *
 * @apiSuccess {number} id ID of the deleted listing.
 */

/**
 * @api {get} /listings/:id/messages Get Messages for Listing
 * @apiName GetMessagesForListing
 * @apiGroup Listings
 *
 * @apiParam {number} id ID of the listing.
 *
 * @apiSuccess {MessageWithId[]} List of messages for the listing.
 */

/**
 * @api {post} /listings/:id/messages Create Message for Listing
 * @apiName CreateMessageForListing
 * @apiGroup Listings
 *
 * @apiParam {number} id ID of the listing.
 * @apiParam {string} content Message content.
 *
 * @apiSuccess {MessageWithId} Created message.
 */

/**
 * @api {delete} /messages/:id Delete Message by ID
 * @apiName DeleteMessageById
 * @apiGroup Messages
 *
 * @apiParam {number} id ID of the message.
 *
 * @apiSuccess {number} id ID of the deleted message.
 */

/**
 * @api {get} /categories Get Categories
 * @apiName GetCategories
 * @apiGroup Categories
 *
 * @apiSuccess {CategoryWithId[]} List of categories.
 */

/**
 * @api {post} /categories Create Category
 * @apiName CreateCategory
 * @apiGroup Categories
 *
 * @apiParam {Category} Category information.
 *
 * @apiSuccess {CategoryWithId} Created category.
 */

/**
 * @api {delete} /categories/:id Delete Category
 * @apiName DeleteCategory
 * @apiGroup Categories
 *
 * @apiParam {number} id ID of the category.
 *
 * @apiSuccess {number} id ID of the deleted category.
 */

/**
 * @api {get} /statistics/listings Get Listing Statistics
 * @apiName GetListingStatistics
 * @apiGroup Statistics
 *
 * @apiSuccess {number} listings Total number of listings.
 * @apiSuccess {number} buy Number of buy listings.
 * @apiSuccess {number} sell Number of sell listings.
 * @apiSuccess {number} messages Total number of messages.
 */

/**
 * @api {get} /statistics/users Get User Statistics
 * @apiName GetUserStatistics
 * @apiGroup Statistics
 *
 * @apiSuccess {number} users Total number of users.
 * @apiSuccess {number} admins Number of admin users.
 */

/**
 * @api {get} /statistics/users/:id/listings Get User Listing Statistics
 * @apiName GetUserListingStatistics
 * @apiGroup Statistics
 *
 * @apiParam {number} id ID of the user.
 *
 * @apiSuccess {number} listings Total number of listings by the user.
 * @apiSuccess {number} buy Number of buy listings by the user.
 * @apiSuccess {number} sell Number of sell listings by the user.
 * @apiSuccess {number} messages Total number of messages received by the user.
 * @apiSuccess {number} ownMessages Total number of messages sent by the user.
 */
